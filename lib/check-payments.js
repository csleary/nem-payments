module.exports = (transactions, paid = []) => {
  transactions.forEach(tx => {
    const { amount, otherTrans } = tx.transaction;

    if (amount === 0) {
      return;
    }

    const payment = amount || otherTrans.amount;
    paid.push(payment);
  });

  let sum = paid.reduce((acc, cur) => acc + cur, 0);
  return sum;
};
