import Variable from '../../variable'

class TodoListItemViewModel {
  constructor({toggleCommand, editCommand, clearCommand, closeCommand}) {
    this.completedVariable = Variable(false)
    this.titleVariable = Variable('')
    this.editingVariable = Variable(false)

    toggleCommand
      .subscribe(() => {
        this.completedVariable.value = !this.completedVariable.value
      })

    editCommand
      .subscribe(editing =>  {
        this.editingVariable.value = editing
      })

    clearCommand
      .subscribe(() => {
        this.titleVariable.value = ''
      })

    
  }
}

export default TodoListItemViewModel
