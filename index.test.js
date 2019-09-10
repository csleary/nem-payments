const nemPayments = require("./index");

test("fetches a 'hello world!' live nem transaction", async () => {
  expect(
    await nemPayments(
      "NAER66-DXCNYE-BNMTWA-PKG7CU-27CMUP-TQQDSM-2KL6",
      "Hello World!",
      "http://62.75.163.236"
    )
  ).toMatchObject({
    transactions: expect.any(Array),
    xemPaid: 0.1,
    nemNode: "http://62.75.163.236"
  });
});
