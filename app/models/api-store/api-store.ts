import { destroy, flow, Instance, SnapshotOut, types, getParent } from "mobx-state-tree"
import { BulletItem } from "../../components";
import { withEnvironment } from "../extensions/with-environment"
/**
 * Model description here for TypeScript hints.
 */
const Array = [
  { name: 'Mahadev', tag: false, uId: 1 },
  { name: 'Shiv', tag: false, uId: 2 },
  { name: 'Shankar', tag: false, uId: 3 }
]
const ApiModel = types.model({
  id: types.maybe(types.number),
  year: types.maybe(types.number),
  color: types.maybe(types.string),
  name: types.maybe(types.string),
  pantone_value: types.maybe(types.string)
  //"id":7,"name":"sand dollar","year":2006,"color":"#DECDBE","pantone_value":"13-1106
});
const Modem = types.model({
  name: types.maybe(types.string),
  tag: types.maybe(types.boolean),
  uId: types.maybe(types.number)
});
const Man = types.model({
  text: types.maybe(types.string),
  flag: types.maybe(types.boolean),
  ind: types.maybe(types.number)
});
const stop = types.model({
  title: types.maybe(types.string),
  user: types.maybe(types.string),
})
export const ApiStoreModel = types
  .model("ApiStore")
  .props({
    lists: types.optional(types.array(ApiModel), []),
    longs: types.optional(types.array(Modem), Array),
    mans: types.optional(types.array(Man), []),
    users: types.optional(types.array(stop), []),
    boom: types.optional(types.string, 'NBA')
  })
  .extend(withEnvironment)
  .actions(self => ({
    setList(data) {
      self.lists = data
    }
  }))
  .actions((self) => ({
    editUser(item) {
      let obj = { title: item.title, user: item.user }
      let king = [...self.users];
      king.splice(item.index, 1, obj);
      self.users = king
    },
    addUser(item) {
      self.users.push(item)
    },
    deleteUser(item) {
      let king = [...self.users];
      var ans = king.filter(x => x.title !== item.title)
      self.users = ans;
      //      self.nodes.delete("2");

    },
    getUserList: flow(function* getUserList(page) {
      try {
        console.log('once')
        const data = yield self.environment.api.getList(page)//kind  list:whole api page   status
        const response = data;//kind  ,list:whole api page   ,status
        if (data.kind === "ok" && data.status == 200) {
          console.log(response.list.data)
          var mergeList = [...self.lists, ...response.list.data]
          if (page == 1) mergeList = [...response.list.data]
          // self.users = mergeList
          self.setList(mergeList)
          return { response: true, data: response.list };
        }
        else {
          return { response: false, message: data };
        }
      } catch (error) {
        console.log(error)
        return { response: false, message: "Something went wrong." };
      }
    }),
    deleteUserList: flow(function* deleteUserList(obj) {
      try {
        const data = yield self.environment.api.deleteList(obj)
        const response = data;

        if (data.kind === 'ok') {
          console.log(data.status)
          console.log(response.list)
          return { response: true, data: response.list };
        } else {
          console.log(data.kind + ' and ' + data.status)
          return { response: false, message: data };
        }
      } catch (error) {
        console.log(error)
        return { response: false, message: "Something went wrong." };
      }
    }),
    postUserList: flow(function* postUserList(obj) {
      try {
        const data = yield self.environment.api.postList(obj)
        const response = data;

        if (data.kind === 'ok' && data.status === 201) {
          console.log(response.status)
          console.log(response.list)
          return { response: true, data: response.list };
        } else {
          console.log(data.kind + ' and ' + data.status)
          return { response: false, message: data };
        }
      } catch (error) {
        console.log(error)
        return { response: false, message: "Something went wrong." };
      }
    }),
    putUserList: flow(function* putUserList(obj) {
      try {
        const data = yield self.environment.api.putList(obj)
        const response = data;

        if (data.kind === 'ok') {
          console.log(response.status)
          console.log(response.list)
          return { response: true, data: response.list };
        } else {
          console.log(data.kind + ' and ' + data.status)
          return { response: false, message: data };
        }
      } catch (error) {
        console.log(error)
        return { response: false, message: "Something went wrong." };
      }
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type ApiStoreType = Instance<typeof ApiStoreModel>
export interface ApiStore extends ApiStoreType { }
type ApiStoreSnapshotType = SnapshotOut<typeof ApiStoreModel>
export interface ApiStoreSnapshot extends ApiStoreSnapshotType { }
export const createApiStoreDefaultModel = () => types.optional(ApiStoreModel, {})
