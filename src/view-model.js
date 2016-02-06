import Variable from './variable'

class ViewModel {
  constructor(attrs) {
    this.keys = Object.keys(attrs)
    for (let key of this.keys) {
      this[key] = new Variable(attrs[key])
    }
  }

  observer(callbacks) {
    return Object.assign({
      isUnsubscribed: false,
      next: function (value) { },
      error: function (err) { throw err; },
      complete: function () { }
    }, callbacks)
  }
}

export default ViewModel
