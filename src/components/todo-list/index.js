import {Observable} from 'rxjs/Rx'
import h from 'virtual-dom/h'

import Component from '../../component'
import TodoListViewModel from './view-model'

class TodoList extends Component {
  constructor(el) {
    super(el)

    this.vm = new TodoListViewModel
    
    this.event('new-todo', 'keypress')
      .filter(e => e.which === 13)
      .map(e => e.target.value)
      .subscribe(this.vm.createCommand)
      .addTo(this.subscription)

    this.event('edit', 'keypress')
      .filter(e => e.which === 13)
      .map(e => [
        e.target.closest('li').dataset.index,
        { title: e.target.value }
      ])
      .subscribe(this.vm.updateCommand)
      .addTo(this.subscription)

    this.event('todo', 'dblclick')
      .map(e => ([
        e.target.closest('li').dataset.index,
        { editing: true }
      ]))
      .subscribe(this.vm.updateCommand)
      .addTo(this.subscription)

    this.event('edit', 'blur')
      .subscribe(this.vm.blurCommand)
      .addTo(this.subscription)

    this.event('edit', 'keydown')
      .filter(e => e.which === 27)
      .map(e => ([
        e.target.closest('li').dataset.index,
        { editing: false }
      ]))
      .subscribe(this.vm.updateCommand)
      .addTo(this.subscription)

    this.event('toggle', 'change')
      .map(e => ([
        e.target.closest('li').dataset.index,
        { completed: !e.target.checked }
      ]))
      .subscribe(this.vm.updateCommand)
      .addTo(this.subscription)

    this.event('destroy', 'click')
      .map(e => e.target.closest('li').dataset.index)
      .subscribe(this.vm.removeCommand)
      .addTo(this.subscription)
    
    this.bindDOM()
  }

  render() {
    return Observable.combineLatest(
      this.vm.todos.observable,
      this.vm.remining.observable,
      this.vm.completed.observable,
      (todos, remining, completed) => [todos, remining, completed])
      .map(([todos, remining, completed]) => {
        return h('div', [
          h('section.todoapp', [
            h('header.header', [
              h('h1', 'todos'),
              h('input.new-todo', { placeholder: 'What needs to be done?', autofocus: true })
            ]),

            h('sestion.main', [
              h('input#toggle-all.toggle-all', { type: 'checkbox', checked: false }),
              h('label', { for: 'toggle-all' }),
              h('ul.todo-list', todos.map((todo, i) => h('li', {
                className: (todo.editing ? 'editing' : ''),
                attributes: { 'data-index': i }
              }, [
                todo.editing ? h('input.edit', {value: todo.title }) :
                h('div.view', [
                  h('input.toggle', { type: 'checkbox', checked: todo.completed }),
                  h('label.todo', todo.title),
                  h('button.destroy')
                ])
              ])))
            ]),

            remining > 0 ?
              h('footer.footer', [
                h('span.todo-count', [
                  h('string', `${remining}`),
                  remining <= 1 ? ' Item' : ' Items'
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
