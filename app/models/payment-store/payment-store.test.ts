import { PaymentStoreModel } from "./payment-store"

test("can be created", () => {
  const instance = PaymentStoreModel.create({})

  expect(instance).toBeTruthy()
})
