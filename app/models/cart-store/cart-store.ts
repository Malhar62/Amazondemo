import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native";

/**
 * Model description here for TypeScript hints.
 */
const CartData = types.model({
  id: types.maybe(types.number),
  price: types.maybe(types.number),
  title: types.maybe(types.string),
  description: types.maybe(types.string),
  category: types.maybe(types.string),
  image: types.maybe(types.string),
  quantity: types.maybe(types.number),
  isfav: types.maybe(types.boolean)
})
export const CartStoreModel = types
  .model("CartStore")
  .props({
    carts: types.optional(types.array(CartData), []),
    amount: types.optional(types.number, 0),
    favs: types.optional(types.array(types.frozen()), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    countAmount() {
      var sum = 0
      for (var i = 0; i < self.carts.length; i++) {
        sum = sum + self.carts[i].price * self.carts[i].quantity;
      }
      var x = Math.floor(sum * 100) / 100;
      x.toFixed(2)
      self.amount = x
    }
  }))
  .actions((self) => ({
    addToFav(data) {
      var count = 0;
      for (var i = 0; i < self.favs.length; i++) {
        if (data.title != self.favs[i].title) {
          count++;
        }
      }
      if (count == self.favs.length) {
        self.favs.push(data)
        Alert.alert('Added to Favourites !')
        console.log(self.favs)
      }
    },
    removeFav(index) {
      self.favs.splice(index, 1)
    },
    addToCart(data) {
      var count = 0;
      for (var i = 0; i < self.carts.length; i++) {
        if (data.title != self.carts[i].title) {
          count++;
        }
      }
      if (count == self.carts.length) {
        self.carts.push(data)
        self.countAmount()
        var Index = self.favs.findIndex(x => x.title === data.title);
        self.favs.splice(Index, 1)
        Alert.alert('item added successfully')
      }
    },
    removeFromCart(index) {
      self.carts.splice(index, 1)
      self.countAmount()
    },
    addQuantity(data) {
      let obj = {
        id: data.item.id,
        title: data.item.title,
        description: data.item.description,
        category: data.item.category,
        image: data.item.image,
        quantity: (data.item.quantity + 1),
        isfav: data.item.isfav,
        price: data.item.price
      }
      self.carts.splice(data.index, 1, obj);
      self.countAmount()
    },
    removeQuantity(data) {
      let obj = {
        id: data.item.id,
        title: data.item.title,
        description: data.item.description,
        category: data.item.category,
        image: data.item.image,
        quantity: (data.item.quantity - 1),
        isfav: data.item.isfav,
        price: data.item.price
      }
      self.carts.splice(data.index, 1, obj);
      self.countAmount()
    },
    moveToCart(data) {
      var count = 0;
      for (var i = 0; i < self.carts.length; i++) {
        if (data.item.title != self.carts[i].title) {
          count++;
        }
      }
      if (count == self.carts.length) {
        self.carts.push(data.item)
        self.countAmount()
        self.favs.splice(data.index, 1)
        Alert.alert('Moved to Cart !')
      } else {
        self.favs.splice(data.index, 1)
      }
    },
    emptyCart() {
      self.favs = []
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type CartStoreType = Instance<typeof CartStoreModel>
export interface CartStore extends CartStoreType { }
type CartStoreSnapshotType = SnapshotOut<typeof CartStoreModel>
export interface CartStoreSnapshot extends CartStoreSnapshotType { }
export const createCartStoreDefaultModel = () => types.optional(CartStoreModel, {})
