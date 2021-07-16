import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ApiStoreModel } from "../api-store/api-store"
import { CartStoreModel } from "../cart-store/cart-store"
import { CharacterStoreModel } from "../character-store/character-store"
import { ShoppingStoreModel } from "../shopping-store/shopping-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  apiStore: types.optional(ApiStoreModel, {} as any),
  shoppingStore: types.optional(ShoppingStoreModel, {} as any),
  cartStore: types.optional(CartStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
