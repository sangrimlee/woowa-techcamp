export default async function init(pool) {
  const connection = await pool.getConnection();
  await connection.query(
    `CREATE TABLE IF NOT EXISTS Category(
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(512) NOT NULL UNIQUE,
      color VARCHAR(512) NOT NULL,
      isIncome BOOLEAN NOT NULL DEFAULT FALSE,
      createdAt TIMESTAMP NOT NULL
          DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL
          DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP);`,
  );
  console.log('DB: CREATE CATEGORY TABLE');
  await connection.query(
    `CREATE TABLE IF NOT EXISTS PaymentMethod(
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(512) NOT NULL UNIQUE,
      createdAt TIMESTAMP NOT NULL
          DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL
          DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP);`,
  );
  console.log('DB: CREATE PAYMENT_METHOD TABLE');
  await connection.query(
    `CREATE TABLE IF NOT EXISTS TransactionHistory(
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(512) NOT NULL,
      date DATE NOT NULL,
      isIncome BOOLEAN NOT NULL,
      amount INT UNSIGNED NOT NULL,
      categoryId INT UNSIGNED,
      paymentMethodId INT UNSIGNED,
      createdAt TIMESTAMP NOT NULL
          DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL
          DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (categoryId) REFERENCES Category(id) ON DELETE SET NULL,
      FOREIGN KEY (paymentMethodId) REFERENCES PaymentMethod(id) ON DELETE SET NULL);`,
  );
  console.log('DB: CREATE TRNASACTION_HISTORY TABLE');
  connection.release();
}
