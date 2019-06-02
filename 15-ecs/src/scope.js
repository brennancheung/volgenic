import entities from './entities/entities'

let scope = {
  entities,
  tick () {
    console.log(this.entities)
  }
}

export default scope
