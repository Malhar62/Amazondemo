import { ApiStoreModel } from "./api-store"

test("can be created", () => {
  const instance = ApiStoreModel.create({
    tasks:[{uId:1,name:'Malhar',tag:false},{uId:2,name:'Pandya',tag:false}],
    lists:[{id:1,year:2005,name:'sofia',pantone_value:'obama',color:'red'}]
  })

  expect(instance).toBeTruthy()
})
