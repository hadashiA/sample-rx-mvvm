import Variable from './variable'

class ViewModel {
  constructor(attrs={}) {
    this.keys = Object.keys(attrs)
    for (let key of this.keys) {
      this[key] = new Variable(attrs[key])
    }
  }

  dispose() {
    for (let k in this) {
      if (this.hasOwnProperty(k)) {
        if (typeof this[k].dispose === 'function') {
          this[k].dispose()
        }
      }
    }
  }
}

export default ViewModel
