import Variable from '../../variable'

class TodoListItemViewModel {
  constructor(todo) {
    this.title      = new Variable(todo.title)
    this.draftTitle = new Variable(todo.title)
    this.completed  = new Variable(todo.completed)
    this.editing    = new Variable(false)
  }
}

export default TodoListItemViewModel
