import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
const ADD = types.model({
  latitude: types.maybe(types.number),
  longitude: types.maybe(types.number),
  selected: types.maybe(types.boolean)
})
export const AddressStoreModel = types
  .model("AddressStore")
  .props({
    adds: types.optional(types.array(ADD), [{
      latitude: 11,
      longitude: 33,
      selected: false
    }])
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addaddress(data) {
      var count = 0;
      for (var i = 0; i < self.adds.length; i++) {
        if (data.latitude != self.adds[i].latitude) {
          count++;
        }
      }
      if (count == self.adds.length) {
        self.adds.push(data)
      }
    },
    removeaddress(ind) {
      self.adds.splice(ind, 1)
    },
    editaddress(data) {
      let obj = {
        latitude: data.item.latitude,
        longitude: data.item.longitude,
        selected: true
      }
      for (var i = 0; i < self.adds.length; i++) {
        if (i == data.index) {
          self.adds.splice(data.index, 1, obj)
        } else {
          let obj1 = {
            latitude: self.adds[i].latitude,
            longitude: self.adds[i].longitude,
            selected: false
          }
          self.adds.splice(i, 1, obj1)
        }
      }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type AddressStoreType = Instance<typeof AddressStoreModel>
export interface AddressStore extends AddressStoreType { }
type AddressStoreSnapshotType = SnapshotOut<typeof AddressStoreModel>
export interface AddressStoreSnapshot extends AddressStoreSnapshotType { }
export const createAddressStoreDefaultModel = () => types.optional(AddressStoreModel, {})
