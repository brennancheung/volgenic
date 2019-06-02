import uuid from 'uuid'

const entities = {}

export const addEntity = data => {
  const id = uuid.v4()
  entities[id] = { id, ...data }
}

export const deleteEntity = id => delete entities[id]

export default entities
