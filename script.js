window.onload = function () {
  const container = document.createElement('section')
  const inputContainer = document.createElement('div')
  const title = document.createElement('h1')
  const textInput = document.createElement('input')
  const button = document.createElement('button')
  const todoContainer = document.createElement('ul')

  container.classList.add('container')
  todoContainer.classList.add('todoContainer')
  inputContainer.classList.add('inputContainer')
  title.classList.add('title')
  textInput.classList.add('textInput')
  button.classList.add('button')

  title.innerText = 'Todo App'
  button.innerText = 'Salvar'
  textInput.placeholder = 'Write todo'
  textInput.id = 'textInput'
  todoContainer.id = 'todoContainer'

  button.addEventListener('click', (e) => onSaveTodo(e))
  textInput.addEventListener('keypress', (e) => onSaveTodo(e))

  container.appendChild(title)
  inputContainer.appendChild(textInput)
  inputContainer.appendChild(button)
  container.appendChild(inputContainer)
  container.appendChild(todoContainer)
  document.body.appendChild(container)
  loadStore()
}

const onSaveTodo = (e) => {
  const text = document.querySelector('#textInput')

  if (text.value !== '') {
    if (e.type === 'click') {
      save(text)
    } else if (e.key === 'Enter') {
      save(text)
    }
  }
}

const createLi = (text) => {
  const newLi = document.createElement('li')

  newLi.classList.add('li')
  newLi.innerText = text
  newLi.addEventListener('click', () => onRemoveTodo(newLi))

  return newLi
}

const save = (text) => {
  const todoContainer = document.querySelector('#todoContainer')

  const newLi = createLi(text.value)
  todoContainer.appendChild(newLi)
  storeTodo(text.value)
  text.value = ''
}

const onRemoveTodo = (todo) => {
  const todoContainer = document.querySelector('#todoContainer')
  todoContainer.removeChild(todo)
  removeFromStore(todo.innerText)
}

const storeTodo = (todo) => {
  const todosList = []
  todosList.push(todo)
  if (localStorage.length > 0) {
    JSON.parse(localStorage.getItem('todos')).forEach(item => {
      todosList.push(item)
    })
    localStorage.setItem('todos', JSON.stringify(todosList))
  } else {
    localStorage.setItem('todos', JSON.stringify(todosList))
  }
}

const loadStore = () => {
  const todoContainer = document.querySelector('#todoContainer')
  JSON.parse(localStorage.getItem('todos')).forEach(item => {
    const newLi = createLi(item)
    todoContainer.appendChild(newLi)
  })
}

const removeFromStore = (todo) => {
  const newTodosList = JSON.parse(localStorage.getItem('todos')).filter(i => i !== todo)
  localStorage.setItem('todos', JSON.stringify(newTodosList))
}