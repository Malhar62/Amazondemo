import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = (raw) => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */
  async getList(page: number): Promise<Types.GetList> {
    const response: ApiResponse<any> = await this.apisauce.get(`/api/unknown?page=${page}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: "ok", list: response.data, status: response.status }//returns this
    } catch {
      return { kind: "bad-data" }
    }
  }
  async postList(obj: any): Promise<Types.GetList> {
    console.log(obj)
    const response: ApiResponse<any> = await this.apisauce.post(`/api/unknown?page=${obj.page}`, {
      name: obj.name,
      year: obj.year,
      color: obj.color,
      pantone_value: obj.pantone_value
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", list: response.data, status: response.status }//returns this
    } catch {
      return { kind: "bad-data" }
    }
  }
  async putList(obj: any): Promise<Types.GetList> {
    console.log(obj)
    const response: ApiResponse<any> = await this.apisauce.put(`/api/unknown?page=${obj.page}`, {
      id: obj.id,
      name: obj.name,
      year: obj.year,
      color: obj.color,
      pantone_value: obj.pantone_value
    }, { headers: { "content-type": "application/json; charset=utf-8" } })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", list: response.data, status: response.status }//returns this
    } catch {
      return { kind: "bad-data" }
    }
  }
  async deleteList(obj: any): Promise<Types.GetList> {
    const response: ApiResponse<any> = await this.apisauce.delete(`/api/unknown/${obj.id}?page=${obj.page}`)
    console.log(response)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", list: response.data, status: response.status }//returns this
    } catch {
      return { kind: "bad-data" }
    }
  }
  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }


  async getBoxer(id: number): Promise<Types.GetBoxer> {

    const response: ApiResponse<any> = await this.apisauce.get(`/category/${id}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: "ok", list: response.data, status: response.status }//returns this
    } catch {
      return { kind: "bad-data" }
    }

  }
  async getShopping(): Promise<Types.GetShoppingData> {
    const response: ApiResponse<any> = await this.apisauce.get(`/products/categories`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: "ok", list: response.data, status: response.status }//returns this
    } catch {
      return { kind: "bad-data" }
    }
  }
  async getItem(name: string): Promise<Types.GetShoppingData> {
    const response: ApiResponse<any> = await this.apisauce.get(`/products/category/${name}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: "ok", list: response.data, status: response.status }//returns this
    } catch {
      return { kind: "bad-data" }
    }
  }
  async getOffer(): Promise<Types.GetShoppingData> {
    const response: ApiResponse<any> = await this.apisauce.get(`/carts`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", list: response.data, status: response.status }//returns this
    } catch {
      return { kind: "bad-data" }
    }
  }
  async getOfferById(id: number): Promise<Types.GetShoppingData> {
    const response: ApiResponse<any> = await this.apisauce.get(`/carts/${id}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", list: response.data, status: response.status }//returns this
    } catch {
      return { kind: "bad-data" }
    }
  }
}
