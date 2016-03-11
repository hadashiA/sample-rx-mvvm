import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import Variable from './variable'

import 'rxjs/add/operator/concat'

function toVariable(initialValue) {
  return new Variable(initialValue, this)
}

function addTo(subscription) {
  subscription.add(this)
}

Observable.prototype.toVariable = toVariable
Subscription.prototype.addTo = addTo

