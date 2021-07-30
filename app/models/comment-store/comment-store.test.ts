import { CommentStoreModel } from "./comment-store"

test("can be created", () => {
  const instance = CommentStoreModel.create({})

  expect(instance).toBeTruthy()
})
