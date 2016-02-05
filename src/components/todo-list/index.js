import {Observable, Subject} from 'rxjs/Rx'
import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

import TodoListViewModel from './todo-list-view-model'

class TodoList {
  constructor({el}) {
    let tree = this.render({})
    let node = createElement(tree)
    el.appendChild(node)
    
    this.keypressOnEdit = new Subject
    this.toggle = new Subject

    const post$ = this.keypressOnEdit
          .filter(({e}) => e.which === 13)
          .map(({e, i}) => {
            return { title: e.target.value, index: i }
          })
          .filter(({title}) => title.length > 0)

    const toggle$ = this.toggle

    const vm = new TodoListViewModel({ post$, toggle$ }) 

    vm.items.asObservable()
      .subscribe(items => {
        const newTree = this.render({items})
        const patches = diff(tree, newTree)
        node = patch(node, patches)
        tree = newTree
      })
  }

  render({items = []}) {
    const reminings = items.filter(item => !item.completed)
    const completed = items.length > 0 && reminings.length === 0
    
    return h('div', [
      h('section.todoapp', {
        'ev-keypress': e => this.keypress.next(e)
      }, [
        h('header.header', [
          h('h1', 'todos'),
          h('input.new-todo', {
            placeholder: 'What needs to be done?',
            autofocus: true,
            'ev-keypress': e => {
              console.log(e)
              this.keypressOnEdit.next({e})
            }
          })
        ]),

        h('sestion.main', [
          h('input#toggle-all.toggle-all', { type: 'checkbox', checked: false }),
          h('label', { for: 'toggle-all' }),
          h('ul.todo-list', items.map((item, i) => {
            if (item.editing.value) {
              return h('input.edit', {
                value: item.title.value,
                'ev-keypress': e => this.keypressOnEdit.next({e, i})
              })
            } else {
              return h('div.view', [
                h('input.toggle', {
                  type: 'checkbox',
                  checked: item.coompleted.value,
                  'ev-change': e => this.clickOnToggle.next(i)
                }),
                h('label', item.title.value),
                h('button.destroy', i)
              ])
            }
          })),
        ]),

        reminings.length > 0 ? h('footer.footer', [
          h('span.todo-count', `${reminings.length} ${reminings.length <= 1 ? 'Item' : 'Items'}`),
          h('ul.filters', [
            h('li', h('a.selected', { href: '#' }, 'All')),
            h('li', h('a', { href: '#' }, 'Active')),
            h('li', h('a', { href: '#'}, 'Completed')),
            (completed ? h('button.clear-completed', 'Clear completed') : null)
          ])
        ]) : null
      ]),

      h('footer.info', [
        h('p', 'Double-click to edit a todo'),
        h('p', 'Writen by')
      ])
    ])
  }
}

export default TodoList
