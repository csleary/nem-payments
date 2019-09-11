const nem = require("nem-sdk").default;
const checkPayments = require("./check-payments");
const filterTransactions = require("./filter-transactions");
const NEM_NODE = "http://62.75.163.236";

module.exports = (address, message, node = NEM_NODE) =>
  new Promise((resolve, reject) => {
    const endpoint = nem.model.objects.create("endpoint")(
      node,
      nem.model.nodes.defaultPort
    );

    let id;
    const nemNode = endpoint.host;
    let transactions = [];
    let xemPaid = 0;

    const fetchTransactions = async () => {
      const incoming = await nem.com.requests.account.transactions.incoming(
        endpoint,
        address.replace(/-/g, ""),
        null,
        id
      );

      const chunk = incoming.data || [];
      const filteredTxs = filterTransactions(message, chunk);
      const payments = checkPayments(filteredTxs);
      xemPaid += payments;
      transactions = [...transactions, ...filteredTxs];

      if (chunk.length === 25) {
        id = chunk[chunk.length - 1].meta.id;
        fetchTransactions();
      } else {
        xemPaid /= 10 ** 6;
        resolve({
          transactions,
          xemPaid,
          nemNode
        });
      }
    };

    fetchTransactions().catch(error => {
      reject(error);
    });
  });
