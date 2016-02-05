import {Observable, Subject} from 'rxjs/Rx'
import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

import TodoListViewModel from './todo-list-view-model'

class TodoList {
  constructor({el}) {
    this.click       = Observable.fromEvent(el, 'click')
    this.doubleClick = Observable.fromEvent(el, 'dbclick')
    this.keypress    = Observable.fromEvent(el, 'keypress')
    
    const post$ = this.keypress
          .filter(e => e.which === 13 &&
                  (e.target.classList.contains('edit') ||
                   e.target.classList.contains('new-todo'))
          )
          .map(e => {
            const li = e.target.closest('li')
            return {
              title: e.target.value,
              i: (li ? li.dataset.index : null)
            }
          })
          .filter(({title}) => title.length > 0)

    const toggle$ = this.click
          .filter(e => e.target.classList.contains('toggle'))
          .map(e => e.target.closest('li').dataset.index)
    
    const editing$ = this.doubleClick
          .filter(e => e.target.classList.contains('edit'))
          .map(e => true)

    const vm = new TodoListViewModel({ post$, toggle$, editing$ }) 

    let tree = this.render({})
    let node = createElement(tree)
    el.appendChild(node)

    vm.items.asObservable()
      .subscribe(items => {
        const newTree = this.render({items})
        const patches = diff(tree, newTree)
        node = patch(node, patches)
        tree = newTree
      })
  }

  render({items = []}) {
    const reminings = items.filter(item => !item.completed.value)
    const completed = items.length > 0 && reminings.length === 0
    
    return h('div', [
      h('section.todoapp', [
        h('header.header', [
          h('h1', 'todos'),
          h('input.new-todo', { placeholder: 'What needs to be done?', autofocus: true })
        ]),

        h('sestion.main', [
          h('input#toggle-all.toggle-all', { type: 'checkbox', checked: false }),
          h('label', { for: 'toggle-all' }),
          h('ul.todo-list', items.map((item, i) => h('li', {
            attributes: { 'data-index': i }
          }, [
            item.editing.value ?
              h('input.edit', { value: item.title.value }) :
              h('div.view', [
                h('input.toggle', { type: 'checkbox', checked: item.completed.value }),
                h('label', item.title.value),
                h('button.destroy')
              ])
          ]))),

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
    ])
  }
}

export default TodoList
