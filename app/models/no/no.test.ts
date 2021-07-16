import { NoModel } from "./no"

test("can be created", () => {
  const instance = NoModel.create({})

  expect(instance).toBeTruthy()
})
