const nem = require("nem-sdk").default;

module.exports = (userMessage, transactions, filtered = []) => {
  const transferTransactions = transactions.filter(tx => {
    const { type, otherTrans } = tx.transaction;

    if (type === 257) {
      return true;
    }

    if (type === 4100 && otherTrans.type === 257) {
      return true;
    }

    return false;
  });

  transferTransactions.forEach(tx => {
    const { hexMessage } = nem.utils.format;
    const { message, otherTrans } = tx.transaction;
    const encodedMessage = message || (otherTrans && otherTrans.message);
    const decoded = hexMessage(encodedMessage);
    if (decoded === userMessage) filtered.push(tx);
  });
  return filtered;
};
