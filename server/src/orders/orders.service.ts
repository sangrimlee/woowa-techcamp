import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities';
import { CreateOrderDto, OrderInfoDto } from './dtos';
import { Order, OrderToProduct } from './entites';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderToProduct)
    private readonly orderToProductRepository: Repository<OrderToProduct>,
  ) {}

  async getOrder(user: User, orderId: string) {
    const order = await this.ordersRepository.findOne({
      where: {
        id: orderId,
        store: { id: user.store.id },
      },
      relations: {
        orderToProducts: {
          product: true,
        },
      },
    });
    if (!order) {
      throw new HttpException({ message: '해당하는 주문내역이 없습니다' }, HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async getOrders(user: User, page = 1, limit = 10) {
    const skip = (Math.max(page, 1) - 1) * limit;
    const orders = await this.ordersRepository.find({
      where: {
        store: { id: user.store.id },
      },
      take: limit,
      skip,
      order: {
        orderDate: 'ASC',
        orderNumber: 'ASC',
      },
    });

    return orders;
  }

  async findByOrderDate(storeId: string, orderDate: string) {
    const orders = await this.ordersRepository.find({
      where: {
        store: {
          id: storeId,
        },
        orderDate,
      },
    });
    return orders;
  }

  async createOrder(user: User, { orderInfos, ...createOrderDto }: CreateOrderDto) {
    const storeId = user.store.id;
    const orders = await this.findByOrderDate(storeId, createOrderDto.orderDate);

    const newOrder = await this.ordersRepository.save(
      this.ordersRepository.create({
        ...createOrderDto,
        orderNumber: orders.length + 1,
        store: {
          id: user.store.id,
        },
      }),
    );

    const newOrderToProducts = await this.createOrderToProducts(newOrder.id, orderInfos);

    return {
      order: newOrder,
      orderToProducts: newOrderToProducts,
    };
  }

  async createOrderToProduct(orderId: string, { id: productId, ...orderInfo }: OrderInfoDto) {
    return await this.orderToProductRepository.save(
      this.orderToProductRepository.create({
        orderId,
        productId,
        ...orderInfo,
      }),
    );
  }

  async createOrderToProducts(orderId: string, orderInfos: OrderInfoDto[]) {
    return await Promise.all(
      orderInfos.map((orderInfo) => this.createOrderToProduct(orderId, orderInfo)),
    );
  }
}
