import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
/**
 * Model description here for TypeScript hints.
 */

const Message = types.model({
  text: types.maybe(types.string),
  time: types.maybe(types.string),
  flag: types.maybe(types.boolean),
  commentof: types.maybe(types.string),
  image: types.maybe(types.string),
  video: types.maybe(types.string),
})
const Date = types.model({
  date: types.maybe(types.string),
  msgs: types.maybe(types.array(Message))
})
const ChatData = types.model({
  title: types.maybe(types.string),
  msg: types.maybe(types.array(Date)),
  flag: types.maybe(types.boolean)
})
export const ChatStoreModel = types
  .model("ChatStore")
  .props({
    chatlists: types.optional(types.array(types.frozen()), []),
    chats: types.optional(types.array(ChatData), []),
    numbers: types.optional(types.number, 0),
    isforward: types.optional(types.boolean, false),
    isComment: types.optional(types.boolean, false),
    saved: types.optional(types.array(types.frozen()), []),
    selectedsaved: types.optional(types.number, 0),
    schedules: types.optional(types.array(types.frozen()), []),
    changes: types.optional(types.number, 0)
  })
  .views((self) => ({}))
  .extend(withEnvironment)// eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    counting(title?: string) {
      var count = 0;
      var value = 0;
      for (var x = 0; x < self.saved.length; x++) {
        if (self.saved[x].flag == true) {
          value++;
        }
      }
      self.selectedsaved = value;
      if (title) {
        var Index = self.chats.findIndex(x => x.title === title);

        for (var i = 0; i < self.chats[Index].msg.length; i++) {
          for (var j = 0; j < self.chats[Index].msg[i].msgs.length; j++) {
            if (self.chats[Index].msg[i].msgs[j].flag == true) {
              count++;
            }
          }
        }
      }
      self.numbers = count;
    },
  }))
  .actions(self => ({
    setAsItIs(title: string) {
      self.isforward = false;
      var Index = self.chats.findIndex(x => x.title === title);
      //console.log(Index)
      for (var i = 0; i < self.chats[Index].msg.length; i++) {
        for (var j = 0; j < self.chats[Index].msg[i].msgs.length; j++) {
          let array = [...self.chats[Index].msg[i].msgs];
          let obj = {
            text: array[j].text,
            time: array[j].time,
            flag: false,
            commentof: array[j].commentof,
            image: array[j].image,
            video: array[j].video
          }
          self.chats[Index].msg[i].msgs.splice(j, 1, obj)
          // self.chats[Index].msg[i].msgs[j].text = self.chats[Index].msg[i].msgs[j].text;
          // self.chats[Index].msg[i].msgs[j].time = self.chats[Index].msg[i].msgs[j].time;
          // self.chats[Index].msg[i].msgs[j].flag = false;
          // self.chats[Index].msg[i].msgs[j].commentof = self.chats[Index].msg[i].msgs[j].commentof;
          // self.chats[Index].msg[i].msgs[j].image = self.chats[Index].msg[i].msgs[j].image;
        }
      }
      self.counting(title)
    },
    setSelectedAsItIs() {
      let array = [...self.saved]
      for (var i = 0; i < self.saved.length; i++) {
        let obj = {
          title: array[i].title,
          dp: array[i].dp,
          date: array[i].date,
          time: array[i].time,
          image: array[i].image,
          text: array[i].text,
          flag: false
        }
        self.saved.splice(i, 1, obj)
      }
      self.counting()
    }
  }))
  .actions((self) => ({
    getChatList: flow(function* getChatList() {
      try {
        console.log('once')
        const data = yield self.environment.api.getChatLists()//kind  list:whole api page   status
        const response = data;//kind  ,list:whole api page   ,status
        if (data.kind === "ok" && data.status == 200) {
          console.log(response.list.data)
          self.chatlists = response.list.data
          // self.users = mergeList
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
    addChat(title: string, text: string, date: string, time: string, com: string, img: string, vid: string) {
      var count = 0;
      var inside = 0;
      for (var i = 0; i < self.chats.length; i++) {
        if (self.chats[i].title == title) {
          for (var j = 0; j < self.chats[i].msg.length; j++) {
            if (self.chats[i].msg[j].date == date) {
              //console.log(self.chats[i].msg[j].msgs.length)
              self.chats[i].msg[j].msgs.push({ text, time, flag: false, commentof: com, image: img, video: vid })
            } else {
              inside++;
            }
          }
          if (inside == self.chats[i].msg.length) {
            let obj = { date, msgs: [{ text, time, flag: false, commentof: com, image: img, video: vid }] }
            self.chats[i].msg.push(obj)
          }
          // self.chats[i].msg.push({ text, date, time })
        } else {
          count++;
        }
      }
      if (count == self.chats.length) {
        let obj = { title, flag: false, msg: [{ date, msgs: [{ text, time, flag: false, commentof: com, image: img, video: vid }] }] }
        self.chats.push(obj)
      }
      self.isComment = false;
    },
    editChat(title: string, date?: string, text?: string, time?: string, index?: number) {
      var Index = self.chats.findIndex(x => x.title === title);
      //console.log(Index)
      var IND = self.chats[Index].msg.findIndex(x => x.date == date);
      //console.log(IND)
      var INDEX = self.chats[Index].msg[IND].msgs.findIndex(x => x.text == text);
      //console.log(INDEX)
      let array = self.chats[Index].msg[IND].msgs[index]
      // let array1 = [...self.chats[Index].msg[IND].msgs]
      // array1.splice(index, 1, obj)
      // self.chats[Index].msg[IND].msgs = [...array1]
      self.chats[Index].msg[IND].msgs[index].text = text;
      self.chats[Index].msg[IND].msgs[index].time = time;
      self.chats[Index].msg[IND].msgs[index].flag = array.flag ? false : true;
      self.chats[Index].msg[IND].msgs[index].commentof = self.chats[Index].msg[IND].msgs[index].commentof
      self.chats[Index].msg[IND].msgs[index].image = self.chats[Index].msg[IND].msgs[index].image
      self.chats[Index].msg[IND].msgs[index].video = self.chats[Index].msg[IND].msgs[index].video
      self.counting(title)
    },
    deleteChat(title: string) {
      self.isComment = true;
      var Index = self.chats.findIndex(x => x.title === title);
      //console.log(Index)
      /** let queen = self.comments
      let array = queen.filter((act) => act.flag !== true);
      self.comments = array */
      for (var i = 0; i < self.chats[Index].msg.length; i++) {
        let array = [...self.chats[Index].msg[i].msgs]
        let array1 = array.filter((act) => act.flag !== true);
        self.chats[Index].msg[i].msgs = [...array1];
      }
      self.counting(title)
    },
    // beginning() {
    //   self.numbers = 0;
    //   self.isforward = false;
    // },

    setForwarding() {
      self.isforward = true;
    },
    forwardChat(old: string, title: string, date: string, time: string) {

      // title, msg: [{ date, msgs: [{ text, time, flag: false }] }]
      var Index = self.chats.findIndex(x => x.title === title);
      var oldIndex = self.chats.findIndex(x => x.title === old);
      /**
       for (var x = 0; x < self.chats.length; x++) {
         if (self.chats[x].flag == true) {
           for (var i = 0; i < self.chats[oldIndex].msg.length; i++) {
             for (var j = 0; j < self.chats[oldIndex].msg[i].msgs.length; j++) {
               if (self.chats[oldIndex].msg[i].msgs[j].flag == true) {
 
                 var count = 0;
                 for (var y = 0; y < self.chats[x].msg.length; y++) {
 
                   if (self.chats[x].msg[y].date == date) {
                     self.chats[x].msg[y].msgs.push({ text: self.chats[oldIndex].msg[i].msgs[j].text, flag: false, time, commentof: '', image: self.chats[oldIndex].msg[i].msgs[j].image })
                   } else {
                     count++;
                   }
 
                 }
                 if (count == self.chats[x].msg.length) {
                   self.chats[x].msg.push({ date, msgs: [{ text: self.chats[oldIndex].msg[i].msgs[j].text, flag: false, time, commentof: '', image: self.chats[oldIndex].msg[i].msgs[j].image }] })
                 }
               }
             }
           }
         }
       } */
      for (var i = 0; i < self.chats[oldIndex].msg.length; i++) {
        for (var j = 0; j < self.chats[oldIndex].msg[i].msgs.length; j++) {
          if (self.chats[oldIndex].msg[i].msgs[j].flag == true) {

            var count = 0;
            for (var x = 0; x < self.chats[Index].msg.length; x++) {

              if (self.chats[Index].msg[x].date == date) {
                self.chats[Index].msg[x].msgs.push({ text: self.chats[oldIndex].msg[i].msgs[j].text, flag: false, time, commentof: '', image: self.chats[oldIndex].msg[i].msgs[j].image, video: self.chats[oldIndex].msg[i].msgs[j].video })
              } else {
                count++;
              }

            }
            if (count == self.chats[Index].msg.length) {
              self.chats[Index].msg.push({ date, msgs: [{ text: self.chats[oldIndex].msg[i].msgs[j].text, flag: false, time, commentof: '', image: self.chats[oldIndex].msg[i].msgs[j].image, video: self.chats[oldIndex].msg[i].msgs[j].video }] })
            }
          }
        }
      }
      self.setAsItIs(old)
    },
    addComment(title: string) {
      var Index = self.chats.findIndex(x => x.title === title);
      for (var i = 0; i < self.chats[Index].msg.length; i++) {
        for (var j = 0; j < self.chats[Index].msg[i].msgs.length; j++) {
          if (self.chats[Index].msg[i].msgs[j].flag == true) {
            return self.chats[Index].msg[i].msgs[j].text
          }
        }
      }
    },
    addToSaved(title: string, img: string) {
      var Index = self.chats.findIndex(x => x.title === title)
      for (var i = 0; i < self.chats[Index].msg.length; i++) {
        for (var j = 0; j < self.chats[Index].msg[i].msgs.length; j++) {
          if (self.chats[Index].msg[i].msgs[j].flag == true) {

            self.saved.push({
              title: title,
              dp: img,
              date: self.chats[Index].msg[i].date,
              time: self.chats[Index].msg[i].msgs[j].time,
              image: self.chats[Index].msg[i].msgs[j].image,
              text: self.chats[Index].msg[i].msgs[j].text,
              video: self.chats[Index].msg[i].msgs[j].video,
              flag: false,
            })
          }
        }
      }
      self.setAsItIs(title)
      self.counting(title)
    },
    deleteFromSaved() {
      let array = [...self.saved]
      let array1 = array.filter((act) => act.flag !== true);
      self.saved = [...array1];
      self.counting()
    },
    selectSaved(index: number) {
      let array = [...self.saved]

      let obj = {
        title: array[index].title,
        dp: array[index].dp,
        date: array[index].date,
        time: array[index].time,
        image: array[index].image,
        text: array[index].text,
        flag: array[index].flag ? false : true,
        video: array[index].video
      }
      self.saved.splice(index, 1, obj)
      self.counting()
    },
    deleteAll() {
      self.saved = [];
    },
    addSchedule(date: any, time: any, whom: any, text: any, image: any, video: string) {
      let obj = {
        date, time, whom, text, image, video
      }
      self.schedules.push(obj)
    },
    deleteSchedule(ind: number) {
      self.schedules.splice(ind, 1)
    },
    sendFromSchedule(base_time: any, base_date?: any) {
      for (var p = 0; p < self.schedules.length; p++) {
        console.log(p.toString() + base_time)
        console.log(self.schedules[p].time == base_time)
        if (self.schedules[p].time == base_time) {
          var count = 0;
          var Index = self.chats.findIndex(x => x.title === self.schedules[p].whom)
          if (Index != -1) {
            for (var i = 0; i < self.chats[Index].msg.length; i++) {
              if (self.chats[Index].msg[i].date == self.schedules[p].date) {
                self.chats[Index].msg[i].msgs.push({ text: self.schedules[p].text, time: self.schedules[p].time, flag: false, commentof: '', image: self.schedules[p].image, video: self.schedules[p].video })
              } else {
                count++;
              }
            }
            if (count == self.chats[Index].msg.length) {
              self.chats[Index].msg.push({ date: self.schedules[p].date, msgs: [{ text: self.schedules[p].text, time: self.schedules[p].time, flag: false, commentof: '', image: self.schedules[p].image, video: self.schedules[p].video }] })
            }
          } else {
            let obj = { title: self.schedules[p].whom, flag: false, msg: [{ date: self.schedules[p].date, msgs: [{ text: self.schedules[p].text, time: self.schedules[p].time, flag: false, commentof: '', image: self.schedules[p].image, video: self.schedules[p].video }] }] }
            self.chats.push(obj)
          }
          self.schedules.splice(p, 1)
          self.changes++;
        }
      }
    }//{ date, msgs: [{ text, time, flag: false, commentof: com, image: img }]
    //forward to many
    //info delivered
    //schedule a message
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type ChatStoreType = Instance<typeof ChatStoreModel>
export interface ChatStore extends ChatStoreType { }
type ChatStoreSnapshotType = SnapshotOut<typeof ChatStoreModel>
export interface ChatStoreSnapshot extends ChatStoreSnapshotType { }
export const createChatStoreDefaultModel = () => types.optional(ChatStoreModel, {})
