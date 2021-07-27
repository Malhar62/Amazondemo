import { AddressStoreModel } from "./address-store"

test("can be created", () => {
  const instance = AddressStoreModel.create({})

  expect(instance).toBeTruthy()
})
