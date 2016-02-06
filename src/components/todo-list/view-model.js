import {Observable} from 'rxjs/Rx'
import ViewModel from '../../view-model'

class TodoListViewModel extends ViewModel {
  newTodo() {
    return title => {
      if (title.length > 0) {
        let value = this.todos.value
        value.push({ title: title })
        this.todos.value = value
      }
    }
  }

  editing(on) {
    return i => {
      let todo = this.todos.value[i]
      todo.editing = on
      this.todos.value[i] = todo
    }
  }

  destroy() {
    return i => {
      this.todos.value.splice(i, 1)
    }
  }
}

export default TodoListViewModel
