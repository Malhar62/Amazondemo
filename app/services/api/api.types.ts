import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export interface User {
  id: number
  name: string
}
export interface GetList1 {
  id: number,
  year: number,
  color: string,
  name: string,
  pantone_value: number
}


export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetList = { kind: 'ok', list: GetList1, status: number } | GeneralApiProblem

export type GetBoxer = { kind: 'ok', list: any, status: number } | GeneralApiProblem
export type GetShoppingData = { kind: 'ok', list: any, status: number } | GeneralApiProblem