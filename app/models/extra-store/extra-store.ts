import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment";

/**
 * Model description here for TypeScript hints.
 */
const Product = types.model({
  productId: types.maybe(types.number),
  quantity: types.maybe(types.number),
})
export const ExtraStoreModel = types
  .model("ExtraStore")
  .props({
    offers: types.optional(types.array(types.frozen()), []),
    offerdetails: types.optional(types.array(Product), []),
    isLoading: types.optional(types.boolean, false)
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .extend(withEnvironment)
  .actions((self) => ({
    getOfferList: flow(function* getOfferList() {
      try {
        const res = yield self.environment.api.getOffer();

        if (res.kind === "ok" && res.status == 200) {
          self.offers = res.list
          console.log(res.list)
          return { response: true, message: "Success" };
        }
        else {
          getOfferList()
          return { response: false, message: "Something went wrong" };
        }
      } catch (error) {
        return { response: false, message: "Something went wrong" };
      }
    }),
    getOfferListById: flow(function* getOfferListById(id: number) {
      try {
        self.isLoading = true;
        const res = yield self.environment.api.getOfferById(id);
        console.log(res.list.products)
        if (res.kind === "ok" && res.status == 200) {
          self.offerdetails = res.list.products
          self.isLoading = false;
          console.log('******************************************8')
          return { response: true, message: "Success" };
        }
        else {
          getOfferListById(id)
          return { response: false, message: "Something went wrong" };
        }
      } catch (error) {
        return { response: false, message: "Something went wrong" };
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type ExtraStoreType = Instance<typeof ExtraStoreModel>
export interface ExtraStore extends ExtraStoreType { }
type ExtraStoreSnapshotType = SnapshotOut<typeof ExtraStoreModel>
export interface ExtraStoreSnapshot extends ExtraStoreSnapshotType { }
export const createExtraStoreDefaultModel = () => types.optional(ExtraStoreModel, {})
