import {Observable, Subject} from 'rxjs/Rx'
import h from 'virtual-dom/h'

import Component from '../../component'
import TodoListViewModel from './view-model'
import TodoListItem from '../todo-list-item'

class TodoList extends Component {
  constructor({el}) {
    this.vm = new TodoListViewModel({ todos: [] })
    
    const keypress = Observable.fromEvent(el, 'keypress')

    this.bindTo(el)
  }

  render() {
    return this.vm.todos.observable
      .map(todos => {
        const items = todos.map(todo => new TodoListItem({ model: todo }))
        // const reminings = items.filter(item => !item.completed.value)
        // const completed = items.length > 0 && reminings.length === 0
        const reminings = []
        const completed = false

        return h('div', [
          h('section.todoapp', [
            h('header.header', [
              h('h1', 'todos'),
              h('input.new-todo', { placeholder: 'What needs to be done?', autofocus: true })
            ]),

            h('sestion.main', [
              h('input#toggle-all.toggle-all', { type: 'checkbox', checked: false }),
              h('label', { for: 'toggle-all' }),
              h('ul.todo-list', items.map(item => item.vtree()))
            ]),

            reminings.length > 0 ?
              h('footer.footer', [
                h('span.todo-count', [
                  h('strong', reminings.length),
                  reminings.length <= 1 ? 'Item' : 'Items'
                ]),
                h('ul.filters', [
                  h('li', h('a.selected', { href: '#' }, 'All')),
                  h('li', h('a', { href: '#' }, 'Active')),
                  h('li', h('a', { href: '#'}, 'Completed')),
                  (completed ? h('button.clear-completed', 'Clear completed') : null)
                ])
              ]) :
            null
          ]),
        
          h('footer.info', [
            h('p', 'Double-click to edit a todo'),
            h('p', 'Writen by')
          ])
        ])
      })
  }
}

export default TodoList
