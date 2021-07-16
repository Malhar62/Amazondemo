import { CartStoreModel } from "./cart-store"

test("can be created", () => {
  const instance = CartStoreModel.create({})

  expect(instance).toBeTruthy()
})
