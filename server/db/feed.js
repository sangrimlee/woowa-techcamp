import config from '../config';

function getRandomValue(minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
}

function getRandomValueWithExclude(minValue, maxValue, excludeValue) {
  let randomValue = getRandomValue(minValue, maxValue);
  while (randomValue === excludeValue) {
    randomValue = getRandomValue(minValue, maxValue);
  }
  return randomValue;
}

function getRandomDate(minDate, maxDate) {
  return new Date(
    Math.round(Math.random() * (maxDate - minDate)) + minDate.getTime(),
  );
}

export default async function feed(pool) {
  const CATEGORIES = [
    { title: '월급', color: '#B9D58C', isIncome: true },
    { title: '용돈', color: '#E6D267', isIncome: true },
    { title: '기타수입', color: '#E2B765', isIncome: true },
    { title: '식비', color: '#4A6CC3', isIncome: false },
    { title: '생활', color: '#4CA1DE', isIncome: false },
    { title: '쇼핑/뷰티', color: '#94D3CC', isIncome: false },
    { title: '교통', color: '#4CB8B8', isIncome: false },
    { title: '의료/건강', color: '#6ED5EB', isIncome: false },
    { title: '문화/여가', color: '#D092E2', isIncome: false },
    { title: '미분류', color: '#817DCE', isIncome: false },
  ];

  const PAYMENT_METHODS = [
    { title: '배민페이' },
    { title: '우리은행' },
    { title: '토스뱅크' },
    { title: '카카오뱅크' },
  ];

  const connection = await pool.getConnection();
  await Promise.all(
    CATEGORIES.map(({ title, color, isIncome }) => {
      return connection.query(
        `
        INSERT INTO Category (title, color, isIncome)
        SELECT * FROM (SELECT ?, ?, ?) AS Temp
        WHERE NOT EXISTS (
            SELECT title FROM Category WHERE title = ?
        ) LIMIT 1;`,
        [title, color, isIncome, title],
      );
    }),
  );
  console.log('DB: FINISH INSERT CATEGORY');

  if (!config.IS_PRODUCTION) {
    await Promise.all(
      PAYMENT_METHODS.map(({ title }) => {
        return connection.query(
          `
        INSERT INTO PaymentMethod ( title )
        SELECT * FROM ( SELECT ? ) AS Temp
        WHERE NOT EXISTS (
            SELECT title FROM PaymentMethod WHERE title = ?
        ) LIMIT 1;`,
          [title, title],
        );
      }),
    );

    await Promise.all(
      new Array(100).fill(undefined).map((_, i) => {
        const title = `History${i}`;
        const minDate = new Date(2021, 10, 1);
        const maxDate = new Date(2022, 7, 28);

        const date = getRandomDate(minDate, maxDate);
        const isIncome = Math.random() < 0.25;
        const amount = getRandomValue(10000, 1000000);
        const categoryId = isIncome
          ? getRandomValue(1, 3)
          : getRandomValue(4, 10);
        const paymentMethodId = getRandomValueWithExclude(1, 4, categoryId);

        return connection.query(
          `
          INSERT INTO TransactionHistory ( title, date, isIncome, amount, categoryId, paymentMethodId)
          SELECT * FROM ( SELECT ?, ?, ?, ?, ?, ? ) AS Temp
          WHERE NOT EXISTS ( SELECT title FROM PaymentMethod WHERE title = ? ) LIMIT 1;`,
          [title, date, isIncome, amount, categoryId, paymentMethodId, title],
        );
      }),
    );
    console.log('DB: FINISH INSERT PAYMENT_METHOD AND TRANSACTION_HISTORY');
  }
  console.log('DB: FINISH INSERT DATA');
  connection.release();
}
