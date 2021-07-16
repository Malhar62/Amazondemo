import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment } from '../extensions/with-environment'

/**
 * Example store containing Rick and Morty characters
 */
const historyData = types.model({
  id: types.maybe(types.number),
  index: types.maybe(types.number),
  name: types.maybe(types.string),
  title: types.maybe(types.string),
  icon: types.maybe(types.string)
})
export const CharacterStoreModel = types
  .model("CharacterStore")
  .props({
    histories: types.optional(types.array(historyData), []),
    extra: types.optional(types.array(historyData), []),
    users: types.optional(types.frozen(), []),
    subs: types.optional(types.frozen(), []),
    isLoading: types.optional(types.boolean, false),
    path: types.optional(types.string, ''),
    result: types.optional(types.boolean, false),
    pathName: types.optional(types.string, ''),
  })
  .extend(withEnvironment)

  .actions((self) => ({
    getData: flow(function* getData(parentId: number) {
      try {
        self.isLoading = true;
        const res = yield self.environment.api.getBoxer(parentId);
        console.log(res.kind + '------' + res.status)
        if (res.kind === "ok" && res.status == 200) {
          self.isLoading = false;
          self.users = res.list.data
          self.result = true;
          return { response: true, message: "Success" };
        }
        else {
          getData(parentId)
          self.result = false;
          return { response: false, message: "Something went wrong" };
        }
      } catch (error) {
        return { response: false, message: "Something went wrong" };
      }
    }),
    getData1: flow(function* getData1(Id: number) {
      try {
        self.isLoading = true;
        const res = yield self.environment.api.getBoxer(Id);
        if (res.kind === "ok" && res.status == 200) {
          self.subs = res.list.data
          self.isLoading = false;
          self.result = true;
          console.log(self.subs)
          return { response: true, message: "Success" };
        }
        else {
          getData1(Id)
          self.result = false;
          return { response: false, message: "Something went wrong" };
        }
      } catch (error) {
        return { response: false, message: "Something went wrong" };
      }
    }),
    addHistory(data) {
      var count = 0;
      for (var i = 0; i < self.histories.length; i++) {
        if (data.name != self.histories[i].name) {
          count++;
        }
      }
      if (count == self.histories.length) {
        self.histories.push(data)
        console.log('added')
      }
    },
    deleteHistory(ind) {
      let array = self.histories
      array.splice(ind, 1)
      self.histories = array
    },
    deleteAll() {
      self.histories = [];
    },
    activePath(name) {
      self.path = name;
    },
    setPath(name) {
      self.pathName = name;
    }
  }))

type CharacterStoreType = Instance<typeof CharacterStoreModel>
export interface CharacterStore extends CharacterStoreType { }
type CharacterStoreSnapshotType = SnapshotOut<typeof CharacterStoreModel>
export interface CharacterStoreSnapshot extends CharacterStoreSnapshotType { }
export const createCharacterStoreDefaultModel = () => types.optional(CharacterStoreModel, {})
