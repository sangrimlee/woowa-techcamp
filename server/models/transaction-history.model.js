import query from '../db/query';

const transactionHistoryModel = {
  async findById(transactionHistoryId) {
    const [[transactionHistory]] = await query(
      `SELECT *
      FROM TransactionHistory
      WHERE ID = ?
      LIMIT 1;`,
      [transactionHistoryId],
    );
    return transactionHistory ?? null;
  },

  async findByIdWithDetail(transactionHistoryId) {
    const [[transactionHistory]] = await query(
      `SELECT T.id, T.title, T.isIncome, T.amount, T.date, T.paymentMethodId, P.title as paymentMethodTitle, T.categoryId, C.title as categoryTitle, C.color as categoryColor
      FROM TransactionHistory as T
      LEFT JOIN PaymentMethod as P
      ON T.paymentMethodId = P.id
      LEFT JOIN Category as C
      ON T.categoryId = C.id
      WHERE T.id = ?
      LIMIT 1;`,
      [transactionHistoryId],
    );
    return transactionHistory ?? null;
  },

  async findAllInPeriod(startDate, endDate) {
    const [transactionHistories] = await query(
      `SELECT T.id, T.title, T.isIncome, T.amount, T.date, T.paymentMethodId, P.title as paymentMethodTitle, T.categoryId, C.title as categoryTitle, C.color as categoryColor
      FROM TransactionHistory as T
      LEFT JOIN PaymentMethod as P
      ON T.paymentMethodId = P.id
      LEFT JOIN Category as C
      ON T.categoryId = C.id
      WHERE T.date BETWEEN ? AND ?;`,
      [startDate, endDate],
    );
    return transactionHistories;
  },

  async getTotalSpentByCategoryInPeriod(currentDate, range, category) {
    const [totalSpentByCategory] = await query(
      `
      SELECT B.currentDate as date, IFNULL(A.totalSpent, 0) as totalSpent
      FROM (
        SELECT DATE_FORMAT(T.date, '%Y-%m') AS historyDate, SUM(T.amount) AS totalSpent
        FROM TransactionHistory as T
        LEFT JOIN Category as C
        ON T.categoryId = C.id
        WHERE T.isIncome = 0 AND C.title = ?
        GROUP BY historyDate
        ) as A
      RIGHT JOIN (
          WITH RECURSIVE CTE AS (
              SELECT DATE_SUB('${currentDate}', INTERVAL ? MONTH) AS DT
                UNION ALL 
            SELECT DT + INTERVAL 1 MONTH
                  FROM CTE
                  WHERE DT + INTERVAL 1 MONTH <= '${currentDate}'
            )
            SELECT DT, DATE_FORMAT(DT, '%Y-%m') AS currentDate
            FROM CTE) as B
      ON A.historyDate = B.currentDate
      ORDER BY B.currentDate ASC;
    `,
      [category, range - 1],
    );
    return totalSpentByCategory;
  },

  async create({ title, date, isIncome, amount, categoryId, paymentMethodId }) {
    const [results] = await query(
      `INSERT INTO TransactionHistory
      ( title, date, isIncome, amount, categoryId, paymentMethodId)
      VALUES ( ?, ?, ?, ?, ?, ? )`,
      [title, date, isIncome, amount, categoryId, paymentMethodId],
    );
    return results;
  },

  async update(
    id,
    { title, date, isIncome, amount, categoryId, paymentMethodId },
  ) {
    const [results] = await query(
      `UPDATE TransactionHistory
      SET title = ?, date = ?, isIncome = ?, amount = ?, categoryId = ?, paymentMethodId = ?
      WHERE ID =  ?`,
      [title, date, isIncome, amount, categoryId, paymentMethodId, +id],
    );
    return results;
  },

  async remove(id) {
    const [results] = await query(
      `DELETE FROM TransactionHistory WHERE ID = ?`,
      id,
    );
    return results;
  },
};

export default transactionHistoryModel;
