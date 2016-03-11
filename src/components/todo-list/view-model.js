import { Observable, Subject, Subscription } from 'rxjs/Rx'
import ViewModel from '../../view-model'
import '../../rx-ext'

class TodoListViewModel extends ViewModel {
  constructor(attrs) {
    super(attrs)

    this.subscription = new Subscription

    this.createCommand = new Subject
    this.updateCommand = new Subject
    this.blurCommand   = new Subject
    this.removeCommand = new Subject

    this.createCommand
      .subscribe(title => {
        const todos = this.todos.value
        todos.push({ title })
        this.todos.value = todos
      })
      .addTo(this.subscription)

    this.updateCommand
      .subscribe(([i, attrs]) => {
        const todos = this.todos.value
        if (attrs.title != null) {
          todos[i].title = attrs.title
        }
        if (attrs.editing != null) {
          todos[i].editing = attrs.editing
        }
        if (attrs.completed != null) {
          todos[i].completed = attrs.completed
        }
        this.todos.value = todos
      })
      .addTo(this.subscription)

    this.blurCommand
      .subscribe(() => {
        const todos = this.todos.value
        for (let todo of todos) {
          todo.editing = false
        }
        this.todos.value = todos
      })
      .addTo(this.subscription)

    this.removeCommand
      .subscribe(i => {
        const todos = this.todos.value
        todos.splice(i, 1)
        this.todos.value = todos
      })
      .addTo(this.subscription)

    this.remining = this.todos.observable
      .map(todos => todos.filter(todo => !todo.completed).length)
      .toVariable()

    this.completed = Observable.combineLatest(
      this.todos.observable,
      this.remining.observable,
      (todos, remining) => (todos.length > 0 && remining === 0))
      .toVariable()
  }

  dispose() {
    this.subscription.dispose()
    super.dispose()
  }
}

export default TodoListViewModel
