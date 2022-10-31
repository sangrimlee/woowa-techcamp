import query from '../db/query';

const paymentMethodModel = {
  async findById(paymentMethodId) {
    const [[paymentMethod]] = await query(
      `SELECT id, title
      FROM PaymentMethod
      WHERE ID = ?
      LIMIT 1;`,
      [paymentMethodId],
    );
    return paymentMethod ?? null;
  },

  async findAll() {
    const [paymentMethods] = await query(
      `SELECT id, title
      FROM PaymentMethod
      ORDER BY id ASC`,
    );
    return paymentMethods;
  },

  async create({ title }) {
    const [results] = await query(
      `INSERT INTO PaymentMethod ( title ) VALUES ( ? )`,
      [title],
    );
    return results;
  },

  async update(id, { title }) {
    const [results] = await query(
      `UPDATE PaymentMethod SET title = ? WHERE ID = ?`,
      [title, id],
    );
    return results;
  },

  async remove(id) {
    const [results] = await query(`DELETE FROM PaymentMethod WHERE ID = ?`, [
      id,
    ]);
    return results;
  },
};

export default paymentMethodModel;
