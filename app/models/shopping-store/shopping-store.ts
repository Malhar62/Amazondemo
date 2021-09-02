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
    isLoading: types.optional(types.boolean, false),
    searches: types.optional(types.array(types.frozen()), []),
    dark: types.optional(types.boolean, false),
    searchhistory: types.optional(types.array(types.frozen()), []),
    similar: types.optional(types.array(types.frozen()), [])
  })
  .views((self) => ({}))
  .extend(withEnvironment)
  // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setSearch(data) {
      self.searches = data;
      console.log('*********************************************************8')
    }
  }))
  .actions((self) => ({
    setTheme(data) {
      self.dark = data
      console.log(self.dark)
    },
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
    },
    sortRange(min: number, max: number) {

      var arr = [...self.items]
      var res = arr.filter(function (o) {
        // check value is within the range
        // remove `=` if you don't want to include the range boundary
        return o.price <= max && o.price >= min;
      });
      self.items = [...res]
      // console.log(extra)
      //filter(user => lowerLimit <= user.timeStamp && user.timeStamp <= upperLimit);
    },
    getSearch: flow(function* getSearch(name) {
      try {
        self.isLoading = true;
        const res = yield self.environment.api.getItem(name);
        if (res.kind === "ok" && res.status == 200) {
          var mergeList = [...self.searches, ...res.list]
          self.searches = [...mergeList]
          console.log('*********************************************************')
          console.log(self.searches)
          //self.setSearch(mergeList)
          self.isLoading = false;
          return { response: true, message: "Success" };
        }
        else {
          return { response: false, message: "Something went wrong" };
        }
      } catch (error) {
        return { response: false, message: "Something went wrong" };
      }
    }),
    deleteSearch() {
      self.searches = []
      console.log(self.searches)
    },
    searchFilterFunction(text: string) {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not bl
        // Filter the masterDataSource and update FilteredDataSource
        const newData = self.searches.filter(function (item: any) {
          // Applying filter for the inserted text in search bar
          const itemData = item.title.toUpperCase();

          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        self.setSearch(newData)
      } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        self.setSearch(self.searches)
      }
    },
    addSearch(data: any) {
      var count = 0;
      for (var i = 0; i < self.searchhistory.length; i++) {
        if (data.title != self.searchhistory[i].title) {
          count++;
        }
      }
      if (count == self.searchhistory.length) {
        self.searchhistory.push(data)
      }
    },
    removeSearch(index: number) {
      self.searchhistory.splice(index, 1)
    },
    getSimilar: flow(function* getSimilar(name: string) {
      try {
        self.isLoading = true;
        const res = yield self.environment.api.getItem(name);
        if (res.kind === "ok" && res.status == 200) {
          self.similar = res.list
          self.isLoading = false;
          return { response: true, message: "Success" };
        }
        else {
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

type ShoppingStoreType = Instance<typeof ShoppingStoreModel>
export interface ShoppingStore extends ShoppingStoreType { }
type ShoppingStoreSnapshotType = SnapshotOut<typeof ShoppingStoreModel>
export interface ShoppingStoreSnapshot extends ShoppingStoreSnapshotType { }
export const createShoppingStoreDefaultModel = () => types.optional(ShoppingStoreModel, {})
