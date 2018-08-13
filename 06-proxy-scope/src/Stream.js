class Stream {
  constructor (value) {
    this._value = value
    this.subscribers = []
  }

  get value () { return this._value }
  set value (value) {
    this._value = value
    this.subscribers.forEach(cb => cb(this._value))
  }

  subscribe = cb => {
    this.subscribers.push(cb)
    cb(this._value)
  }
}

export default Stream
