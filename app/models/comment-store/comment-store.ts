import { getSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
const comment = types.model({
  text: types.maybe(types.string),
  time: types.maybe(types.string),
  title: types.maybe(types.string),
  flag: types.maybe(types.boolean)

})
const CommentData = types.model({
  title: types.maybe(types.string),
  list: types.maybe(types.array(comment))
})
const Rate = types.model({
  title: types.maybe(types.string),
  value: types.maybe(types.number),
})
export const CommentStoreModel = types
  .model("CommentStore")
  .props({
    comments: types.optional(types.array(comment), []),
    commentarray: types.optional(types.array(CommentData), [{ title: 'Malhar', list: [{ text: 'king', time: '2PM' }] }]),
    ratings: types.optional(types.array(Rate), [])
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    postComment(data: any) {
      //self.comments.push(data)
      // var count = 0
      // for (var i = 0; i < self.commentarray.length; i++) {
      //   if (self.commentarray[i].title == name) {
      //     let om = { text: data.text, time: data.time }
      //     self.commentarray[i].list.push(om)
      //     count++;
      //     console.log('up')
      //     console.log(data)
      //   }
      // }
      // if (count == self.commentarray.length) {
      //   let obj = {
      //     title: name,
      //     list: [{ text: data.text, time: data.time }]
      //   }
      //   self.commentarray.push(obj)
      //   console.log('down')
      //   console.log(data)
      // }
      // console.log(self.commentarray)
      self.comments.push(data)
      for (var i = 0; i < self.comments.length; i++) {
        if (data.title == self.comments[i].title) {
          console.log(self.comments[i])
        }
      }
    },
    deleteComment() {
      let queen = self.comments
      let array = queen.filter((act) => act.flag !== true);
      self.comments = array
    },
    giveRating(data: any) {
      var count = 0;
      let obj = { title: data.title, value: data.value }
      for (var i = 0; i < self.ratings.length; i++) {
        if (data.title == self.ratings[i].title) {
          self.ratings.splice(i, 1, obj)
        } else {
          count++;
        }
      }
      if (count == self.ratings.length) {
        self.ratings.push(obj)
      }
      for (var i = 0; i < self.ratings.length; i++) {
        console.log(self.ratings[i])
      }
    },
    editComment(ind: number) {
      let obj = { title: self.comments[ind].title, time: self.comments[ind].time, text: self.comments[ind].text, flag: true }
      self.comments.splice(ind, 1, obj)
    },
    setAsItIs() {
      for (var i = 0; i < self.comments.length; i++) {
        let obj = { title: self.comments[i].title, time: self.comments[i].time, text: self.comments[i].text, flag: false }
        self.comments.splice(i, 1, obj)
      }
    }

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type CommentStoreType = Instance<typeof CommentStoreModel>
export interface CommentStore extends CommentStoreType { }
type CommentStoreSnapshotType = SnapshotOut<typeof CommentStoreModel>
export interface CommentStoreSnapshot extends CommentStoreSnapshotType { }
export const createCommentStoreDefaultModel = () => types.optional(CommentStoreModel, {})
