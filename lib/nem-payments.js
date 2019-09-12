const nem = require('nem-sdk').default;
const checkPayments = require('./check-payments');
const filterTransactions = require('./filter-transactions');
const NEM_NODE = 'http://199.217.118.114';

module.exports = (address, message, options = {}) =>
  new Promise((resolve, reject) => {
    if (!address) {
      reject(
        'Please include a NEM address/account you wish to fetch transactions for.'
      );
    }

    if (typeof message !== 'string') {
      reject(
        'Please include the message you wish to include in the results. It can be an empty string to search for transactions with no message.'
      );
    }

    const node =
      typeof options === 'string' ? options : options.node || NEM_NODE;
    const searchLimit = options.searchLimit || false;
    const maxResults = options.maxResults || false;

    let count = 0;
    let id;
    let transactions = [];
    let xemPaid = 0;

    const endpoint = nem.model.objects.create('endpoint')(
      node,
      nem.model.nodes.defaultPort
    );

    const nemNode = endpoint.host;

    const fetchTransactions = async () => {
      const incoming = await nem.com.requests.account.transactions.incoming(
        endpoint,
        address.replace(/-/g, ''),
        null,
        id
      );

      const chunk = incoming.data || [];
      const filteredTxs = filterTransactions(message, chunk);
      const payments = checkPayments(filteredTxs);
      count += chunk.length;
      console.log(count);
      xemPaid += payments;
      transactions = [...transactions, ...filteredTxs];

      const haveReachedLimit = searchLimit && count >= searchLimit;
      const haveMaxResults = maxResults && transactions.length >= maxResults;

      if (chunk.length === 25 && !haveReachedLimit && !haveMaxResults) {
        id = chunk[chunk.length - 1].meta.id;
        fetchTransactions();
      } else {
        xemPaid /= 10 ** 6;

        if (maxResults && transactions.length > maxResults) {
          transactions.length = maxResults;
        }

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
