import Variable from '../../variable'
import TodoListItemViewModel from './todo-list-item-view-model'

class TodoListViewModel {
  constructor({ post$, toggle$ }) {
    this.items = new Variable([])

    post$
      .subscribe(({title, i}) => {
        if (i) {
          const item = this.items.value[i]
          item.title.value = title
        } else {
          this.items.value.push(new TodoListItemViewModel({ title: title }))
        }
        this.items.next(this.items.value)
      })

    toggle$
      .subscribe(i => {
        
      })

    // editing$
    //   .subscribe((editing, i) => {
    //     const item = this.items[i]
    //     item.editing.value = editing
    //   })
  }
}

export default TodoListViewModel
