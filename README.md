This module will return an object containing a list of confirmed NEM transactions for a given NEM account/address. Only transactions that make use of a given message string in the transactions' 'message' field will be returned. A combined total of all payments made to the address using this message is also included (useful for payment confirmation and order fulfilment). The NEM address will automatically have have its hyphens removed.

In your argument you can optionally specify a NEM node to use for the query as the third parameter, otherwise it will query using the node [http://62.75.163.236](http://62.75.163.236) (i.e. Alice3) by default. Note: you need to include the protocol in the node address. The module returns a promise.

Example:

```javascript
const nemPayments = require("nem-payments");

(async () => {
  const payments = await nemPayments(
    "NAER66-DXCNYE-BNMTWA-PKG7CU-27CMUP-TQQDSM-2KL6",
    "Hello World!",
    "http://62.75.163.236"
  ).catch(err => console.error(err));

  console.log(payments);
})();
```
