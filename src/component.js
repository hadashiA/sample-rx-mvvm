import {Observable} from 'rxjs/Observable'
import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

class Component {
  bindTo(el) {
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
          el.appendChild(node)
        }
      })
  }

  render() {
    return Observable.just(h('div'))
  }
}

export default Component
