import {Observable} from 'rxjs/Rx'
import ViewModel from '../../view-model'

class TodoListViewModel extends ViewModel {
  create() {
    return title => {
      if (title.length > 0) {
        let value = this.todos.value
        value.push({ title: title })
        this.todos.value = value
      }
    }
  }

  update() {
    return ({title, completed, i}) => {
      let todos = this.todos.value
      if (title != null) {
        todos[i].title = title
      }
      if (completed != null) {
        todos[i].completed = completed
      }
      this.todos.value = todos
    }
  }

  editing(on) {
    return i => {
      let todos = this.todos.value
      todos[i].editing = on
      this.todos.value = todos
    }
  }

  toggle() {
    return i => {
      let todos = this.todos.value
      todos[i].completed = !todos[i].completed
      this.todos.value = todos
    }
  }

  destroy() {
    return i => {
      let todos = this.todos.value
      todos.splice(i, 1)
      this.todos.value = todos
    }
  }
}

export default TodoListViewModel
