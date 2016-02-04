import {Observable} from 'rxjs/Rx'
import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

import ViewModel from './view-model'
import Item from '../todo-list-item'

class TodoList {
  constructor({el}) {
    let tree = this.render({})
    let node = createElement(tree)
    el.appendChild(node)
    
    const createCommand = Observable.fromEvent(el.querySelector('.new-todo'), 'click')
    const viewModel = new ViewModel({ createCommand })

    viewModel.todosVariable
      .asObservable()
      .map(todos => todos.map(todo => new Item({todo})))
      .subscribe(items => {
        const newTree = this.render({todos})
        const patches = diff(tree, newTree)
        node = patch(node, patches)
        tree = newTree
      })
  }

  render({todos = []}) {
    return h('div', [
      h('section.todoapp', [
        h('header.header', [
          h('h1', 'todos'),
          h('input.new-todo', {
            placeholder: 'What needs to be done?',
            autofocus: true
          })
        ]),

        h('sestion.main', [
          h('input#toggle-all.toggle-all', { type: 'checkbox', checked: false }),
          h('label', { for: 'toggle-all' }),
          h('ul.todo-list', []),
        ]),

        h('footer.footer', [])
      ]),

      h('footer.info', [
        h('p', 'Double-click to edit a todo'),
        h('p', 'Writen by')
      ])
    ])
  }
}

export default TodoList
