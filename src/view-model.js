import Variable from './variable'
import './to-variable'

class ViewModel {
  constructor(attrs={}) {
    this.keys = Object.keys(attrs)
    for (let key of this.keys) {
      this[key] = new Variable(attrs[key])
    }
  }

  unsubscribe() {
    for (let k in this) {
      if (this.hasOwnProperty(k)) {
        if (typeof this[k].dispose === 'function') {
          this[k].unsubscribe()
        }
      }
    }
  }
}

export default ViewModel
