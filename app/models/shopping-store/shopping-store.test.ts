import { ShoppingStoreModel } from "./shopping-store"

test("can be created", () => {
  const instance = ShoppingStoreModel.create({})

  expect(instance).toBeTruthy()
})
