import query from '../db/query';

const categoryModel = {
  async findById(categoryId) {
    const [[category]] = await query(
      `SELECT id, title, color
      FROM Category
      WHERE id = ?
      LIMIT 1;`,
      [categoryId],
    );
    return category ?? null;
  },

  async findAll() {
    const [categories] = await query(`
      SELECT id, title, color, isIncome
      FROM Category;
    `);
    return categories;
  },
};

export default categoryModel;
