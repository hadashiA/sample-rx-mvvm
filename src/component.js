import { Observable } from 'rxjs/Observable'
import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/share'

class Component {
  constructor(el) {
    this.el = el
    this.events = {}
  }

  bindDOM() {
    let tree = null
    let node = null

    this.render()
      .subscribe(newTree => {
        if (tree) {
          const patches = diff(tree, newTree)
          node = patch(node, patches)
          tree = newTree
        } else {
          tree = newTree
          node = createElement(tree)
          this.el.appendChild(node)
        }
      })
  }

  on(eventName, selector) {
    if (!this.events[eventName]) {
      this.events[eventName] = Observable.fromEvent(this.el, eventName).share()
    }

    if (selector) {
      return this.events[eventName].filter(e => e.target.closest(selector))
    } else {
      return this.events[eventName]
    }
  }

  render() {
    return Observable.just(h('div'))
  }
}

export default Component
