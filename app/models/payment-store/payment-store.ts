import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PaymentStoreModel = types
  .model("PaymentStore")
  .props({
    payments: types.optional(types.array(types.frozen()),
      [{ name: 'UPI/Netbanking', flag: false },
      { name: 'Add Debit/Credit/ATM Card', flag: false },
      { name: 'Pay on Delivery', flag: false }])
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    selection(index: number) {
      for (var i = 0; i < self.payments.length; i++) {
        if (i == index) {
          self.payments.splice(i, 1, { name: self.payments[i].name, flag: true })
        } else {
          self.payments.splice(i, 1, { name: self.payments[i].name, flag: false })
        }
      }
    },
    credit() {
      for (var i = 0; i < self.payments.length; i++) {
        self.payments.splice(i, 1, { name: self.payments[i].name, flag: false })
      }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type PaymentStoreType = Instance<typeof PaymentStoreModel>
export interface PaymentStore extends PaymentStoreType { }
type PaymentStoreSnapshotType = SnapshotOut<typeof PaymentStoreModel>
export interface PaymentStoreSnapshot extends PaymentStoreSnapshotType { }
export const createPaymentStoreDefaultModel = () => types.optional(PaymentStoreModel, {})
