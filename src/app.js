let inputTodo = document.getElementById('inputTodo');
let createTodoButton = document.getElementById('createTodoButton');
let todos = document.getElementById('todos');

createTodoButton.addEventListener('click', () => {

  // Comprobamos que el input esté correcto
  if (!checkInput()) {
    return;
  }

  // Creamos el elemento li
  let todo = document.createElement('li');

  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  let todoTitle = document.createElement('p');
  todoTitle.classList.add('todo-title');
  todoTitle.innerText = inputTodo.value;

  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'Eliminar';

  let editButton = document.createElement('button');
  editButton.innerText = 'Editar';

  todo.appendChild(checkbox);
  todo.appendChild(todoTitle); // Wrap todoTitle inside a TextNode
  todo.appendChild(deleteButton);
  todo.appendChild(editButton);

  todos.appendChild(todo);

  clearInputs();
  checkTodosList();

})

function checkInput() {

  let mensaje = document.getElementById('mensaje');
  let regularExpression = /^[a-zA-Z0-9]+$/;

  if (inputTodo.value === '') {
    mensaje.innerText = 'Por favor, introduce un nombre para la tarea...';
    return false;
  }

  if (!regularExpression.test(inputTodo.value)) {
    mensaje.innerText = 'Por favor, introduce un nombre válido para la tarea...';
    return false;
  }

  if (inputTodo.value.length < 3) {
    mensaje.innerText = 'Por favor, introduce un nombre con al menos 3 caracteres...';
    return false;
  }

  mensaje.innerText = '';

  return true;
}

function checkTodosList() {
  if (todos.children.length === 0) {
    todos.classList.add('centrado')
    todos.innerHTML = '<p> Aún no hay tareas creadas. Crea una nueva tarea para verlas aquí. </p>';
  } else {
    todos.classList.remove('centrado')
    let p = document.querySelector('ul p');
    p.remove();
  }
}

function clearInputs() {
  inputTodo.value = '';
}

window.onload = () => {
  checkTodosList();
}