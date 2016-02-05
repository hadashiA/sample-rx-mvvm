import {BehaviorSubject} from 'rxjs/Rx'

class Variable {
  constructor(value) {
    this.subject = new BehaviorSubject(value)
  }

  get value() {
    return this.subject.value
  }

  set value(newValue) {
    this.subject.next(newValue)
  }

  get isUnsubscribed() {
    return this.subject.isUnsubscribed
  }

  get observable() {
    return this.subject
  }

  next(value) {
    this.subject.next(value)
  }

  error(error) {
    this.subject.error(error)
  }

  complete() {
    this.subject.complete()
  }
}

export default Variable
