const nemPayments = require('./index');

test('fetches a \'hello world!\' live nem transaction', async () => {
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

test('uses a default unspecified node', async () => {
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

test('search for transactions with empty messages', async () => {
  const payments = await nemPayments('NAER66-DXCNYE-BNMTWA-PKG7CU-27CMUP-TQQDSM-2KL6', '');

  expect(payments).toMatchObject({
    transactions: expect.any(Array),
    xemPaid: expect.any(Number),
    nemNode: expect.any(String)
  });
});
