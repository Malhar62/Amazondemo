import { getSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { multiply } from "ramda";
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
    orders: types.optional(types.array(types.frozen()), []),
    location_latitude: types.optional(types.number, 0),
    location_longitude: types.optional(types.number, 0),
    visited: types.optional(types.array(types.frozen()), []),
    saved: types.optional(types.array(types.frozen()), []),
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
    addVisited(data) {
      var count = 0;
      for (var i = 0; i < self.visited.length; i++) {
        if (data.title != self.visited[i].title) {
          count++;
        }
      }
      if (count == self.visited.length) {
        self.visited.push(data)
        //Alert.alert('Added to Favourites !')
        console.log(self.visited)
      }
    },

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
      self.countAmount();
      this.gift()
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
      this.gift()

    },
    moveToCart(data: any) {
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
    },
    saveForLater(data: any) {
      var count = 0;
      for (var i = 0; i < self.saved.length; i++) {
        if (data.title != self.saved[i].title) {
          count++;
        }
      }
      if (count == self.saved.length) {
        let array = [...self.saved]
        array.push({ ...data })
        self.saved = [...array];
      }
      var Index = self.carts.findIndex(x => x.title === data.title);
      let furray = [...self.carts]
      furray.splice(Index, 1)
      //self.carts.splice(Index, 1)
      self.carts = [...furray]
      self.countAmount()
    },
    placeOrder() {
      self.orders = getSnapshot(self.carts)
      self.carts = []
    },
    setLocation(lat, long) {
      self.location_latitude = lat;
      self.location_longitude = long;
      console.log('location selected')
    },
    gift() {
      var count = 0
      for (var i = 0; i < self.carts.length; i++) {
        count = count + self.carts[i].quantity
      }
      var answer = multiply(count, 10)
      var final = answer + self.amount;
      self.amount = final;
      // console.log(';;;;;;;;;;;;;;;;;here: ' + self.amount)
    },
    deleteFromSaved(index: any) {
      self.saved.splice(index, 1)
    },
    moveToCartFromSaved(data: any) {
      var count = 0;
      for (var i = 0; i < self.carts.length; i++) {
        if (data.item.title != self.carts[i].title) {
          count++;
        }
      }
      if (count == self.carts.length) {
        self.carts.push(data.item)
        self.countAmount()
        self.saved.splice(data.index, 1)
        Alert.alert('Moved to Cart !')
      } else {
        self.saved.splice(data.index, 1)
      }
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
