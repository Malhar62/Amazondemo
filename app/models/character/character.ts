import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Rick and Morty character model.
 */
export const CharacterModel = types.model("Character").props({
  id: types.optional(types.number,0),
  parent_id: types.optional(types.number,0),
  name: types.optional(types.string,''),
  icon: types.optional(types.string,''),
  type: types.optional(types.string,''),
  round: types.optional(types.number,0),
  round_time: types.optional(types.string,''),
  rest_time: types.optional(types.string,''),
  workout_setting: types.optional(types.boolean,false),
  has_child: types.optional(types.boolean,false),
  children : types.optional(types.frozen(),[]),
})

type CharacterType = Instance<typeof CharacterModel>
export interface Character extends CharacterType {}
type CharacterSnapshotType = SnapshotOut<typeof CharacterModel>
export interface CharacterSnapshot extends CharacterSnapshotType {}
export const createCharacterDefaultModel = () => types.optional(CharacterModel, {})
