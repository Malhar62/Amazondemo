import { ExtraStoreModel } from "./extra-store"

test("can be created", () => {
  const instance = ExtraStoreModel.create({})

  expect(instance).toBeTruthy()
})
