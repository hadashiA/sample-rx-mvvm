import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

import viewModel from './view-model'

class TodoListItem {
  constructor({todo}) {
    const toggleCommand = ''

    let tree = this.render({})
    let node = createElement(tree)
    el.appendChild(node)
  }

  render() {
    return h('li', [
      h('div.view', [
        h('input.toggle', { type: 'checkbox', checked: false }),
        h('label', ''),
        h('button.destroy')
      ]),
      h('input.edit')
    ])
  }
}

export default TodoListItem
