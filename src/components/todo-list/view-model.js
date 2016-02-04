import 'rxjs/Rx'
import Variable from '../../variable'
import Todo from '../../models/todo'

class TodoListViewModel {
  constructor({createCommand}) {
    this.todosVariable = new Variable([])

    createCommand
      .map(() => new Todo)
      .subscribe(todo => {
        this.todosVariable.value.push(todo)
      })
  }
}
