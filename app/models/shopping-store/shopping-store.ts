import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment";

/**
 * Model description here for TypeScript hints.
 */
export const ShoppingStoreModel = types
  .model("ShoppingStore")
  .props({
    categories: types.optional(types.frozen(), []),
    items: types.optional(types.array(types.frozen()), []),
    isLoading: types.optional(types.boolean, false)
  })
  .views((self) => ({}))
  .extend(withEnvironment)
  // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getShop: flow(function* getShop() {
      try {
        self.isLoading = true;
        const res = yield self.environment.api.getShopping();
        if (res.kind === "ok" && res.status == 200) {
          self.categories = res.list
          console.log(res.list)
          self.isLoading = false;
          return { response: true, message: "Success" };
        }
        else {
          getShop()
          return { response: false, message: "Something went wrong" };
        }
      } catch (error) {
        return { response: false, message: "Something went wrong" };
      }
    }),
    getCategoryItem: flow(function* getCategoryItem(name: string) {
      try {
        self.isLoading = true;
        const res = yield self.environment.api.getItem(name);
        if (res.kind === "ok" && res.status == 200) {
          self.items = res.list
          console.log(self.items)
          self.isLoading = false;
          return { response: true, message: "Success" };
        }
        else {
          getCategoryItem(name)
          return { response: false, message: "Something went wrong" };
        }
      } catch (error) {
        return { response: false, message: "Something went wrong" };
      }
    }),
    sortUp() {
      self.items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    },
    sortDown() {
      self.items.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type ShoppingStoreType = Instance<typeof ShoppingStoreModel>
export interface ShoppingStore extends ShoppingStoreType { }
type ShoppingStoreSnapshotType = SnapshotOut<typeof ShoppingStoreModel>
export interface ShoppingStoreSnapshot extends ShoppingStoreSnapshotType { }
export const createShoppingStoreDefaultModel = () => types.optional(ShoppingStoreModel, {})
