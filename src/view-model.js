import Variable from './variable'

class ViewModel {
  constructor(attrs) {
    this.keys = Object.keys(attrs)
    for (let key of this.keys) {
      this[key] = new Variable(attrs[key])
    }
  }
}

export default ViewModel
