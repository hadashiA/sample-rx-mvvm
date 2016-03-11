import {Observable} from 'rxjs/Observable'
import {Subscription} from 'rxjs/Subscription'
import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

class Component {
  constructor(el) {
    this.el = el
    this.children = []
    this.subscription = new Subscription
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
      .addTo(this.subscription)
  }

  event(selector, name) {
    return Observable.fromEvent(this.el, name)
      .filter(e => e.target.closest(selector))
  }

  render() {
    return Observable.of(h('div'))
  }

  addChild(component) {
    this.children.push(component)
    this.subscription.add(component.subscription)
  }

  dispose() {
    if (this.vm) {
      this.vm.dispose()
    }
    this.subscription && this.subscription.unsubscribe()
    this.subscription = null
  }
}

export default Component
