import {Observable} from 'rxjs/Rx'
import h from 'virtual-dom/h'
import createElement from 'virtual-dom/create-element'

import TodoListItemViewModel from './view-model'

class TodoListItem {
  constructor({model}) {
    this.vm = new TodoListItemViewModel(model)
  }

  vtree() {
    return h('li', [
      this.vm.editing.value ?
        h('input.edit', {value: this.vm.title.value }) :
      h('div.view', [
        h('input.toggle', { type: 'checkbox', checked: this.vm.completed.value }),
        h('label', this.vm.title.value),
        h('button.destroy')
      ])
    ])  
  }
}

export default TodoListItem
