import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, UseAuthGuard } from 'src/auth/decorators';
import { User } from 'src/users/entities';
import { CreateOrderDto } from './dtos';
import { OrdersService } from './orders.service';

@ApiTags('주문 관련 API')
@UseAuthGuard()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ description: '주문 조회' })
  async getOrders(
    @AuthUser() user: User,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const orders = await this.ordersService.getOrders(user, page, limit);
    return {
      statusCode: HttpStatus.OK,
      data: orders,
    };
  }

  @ApiOperation({ description: '새로운 주문 생성' })
  @Post()
  async createOrder(@AuthUser() user: User, @Body() createOrderDto: CreateOrderDto) {
    const newOrder = await this.ordersService.createOrder(user, createOrderDto);
    return {
      statusCode: HttpStatus.CREATED,
      data: newOrder,
    };
  }

  @Get('/:id')
  @ApiOperation({ description: '주문 조회' })
  async getOrder(@AuthUser() user: User, @Param('id') orderId: string) {
    const orders = await this.ordersService.getOrder(user, orderId);
    return {
      statusCode: HttpStatus.OK,
      data: orders,
    };
  }
}
