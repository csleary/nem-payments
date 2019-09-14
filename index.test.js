const nemPayments = require('./index');
jest.setTimeout(60000);

test('fetches a \'hello world!\' live NEM transaction', async () => {
  expect(
    await nemPayments(
      'NAER66-DXCNYE-BNMTWA-PKG7CU-27CMUP-TQQDSM-2KL6',
      'Hello World!',
      'http://173.212.238.176'
    )
  ).toMatchObject({
    transactions: expect.any(Array),
    xemPaid: 0.1,
    nemNode: 'http://173.212.238.176'
  });
});

test('uses a default, unspecified NIS node', async () => {
  expect(
    await nemPayments(
      'NAER66-DXCNYE-BNMTWA-PKG7CU-27CMUP-TQQDSM-2KL6',
      'Hello World!'
    )
  ).toMatchObject({
    transactions: expect.any(Array),
    xemPaid: 0.1,
    nemNode: expect.any(String)
  });
});

test('returns error message due to no input address', async () => {
  expect(nemPayments()).rejects.toEqual(
    'Please include a NEM address/account you wish to fetch transactions for.'
  );
});

test('searches for transactions with empty messages, using custom node, limit results', async () => {
  const options = {
    node: 'http://199.217.118.114',
    searchLimit: 250,
    maxResults: 10
  };

  const payments = await nemPayments(
    'NC64UF-OWRO6A-VMWFV2-BFX2NT-6W2GUR-K2EOX6-FFMZ',
    '',
    options
  );

  expect(payments).toMatchObject({
    transactions: expect.any(Array),
    xemPaid: expect.any(Number),
    nemNode: expect.any(String)
  });
});

test('return an unfiltered list of transactions', async () => {
  const options = {
    searchLimit: 200
  };

  const payments = await nemPayments(
    'NC64UF-OWRO6A-VMWFV2-BFX2NT-6W2GUR-K2EOX6-FFMZ',
    null,
    options
  );

  expect(payments).toMatchObject({
    transactions: expect.any(Array),
    xemPaid: expect.any(Number),
    nemNode: expect.any(String)
  });
});
