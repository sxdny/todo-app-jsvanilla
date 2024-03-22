let inputTodo = document.getElementById('inputTodo');
let createTodoButton = document.getElementById('createTodoButton');
let todos = document.getElementById('todos');
let todosCompletados = document.getElementById("todosCompletados");
let todoTypeSelector = document.getElementById('todoTypeSelector');

let todoCounter = 0;

let flagNoHayTareas = false;
let flagNoHayTareasCompletadas = false;

createTodoButton.addEventListener('click', () => {

  // Comprobamos que el input esté correcto
  if (!checkInput()) {
    return;
  }

  todoCounter++;

  // Creamos el elemento li
  let todo = document.createElement('li');
  todo.classList.add("todo");
  todo.id = `todo-${todoCounter}`;

  let customCheckbox = document.createElement('span');
  customCheckbox.classList.add('custom-checkbox');
  customCheckbox.onclick = () => {
    customCheckbox.classList.toggle('checked');
    let checkbox = todo.querySelector('input[type="checkbox"]');
    checkbox.click();
  }

  let checkbox = document.createElement('input');
  checkbox.style.display = 'none';
  checkbox.type = 'checkbox';
  checkbox.onclick = () => {
    // Comprobamos que se ha completado o no la tarea...
    if (checkbox.checked == true) {
      console.log("El valor es true!")
      // Lo movemos a la lista de tareas completadas
      todosCompletados.appendChild(todo)
    }
    else {
      console.log("El valor es false!")
      todos.appendChild(todo)
    }

    checkTodosList();

  }

  let todoName = document.createElement('input');
  todoName.type = 'text';
  todoName.classList.add('todo-todoName');
  todoName.value = inputTodo.value;
  todoName.oninput = () => adjustWidthInput(todoName);
  todoName.onblur = () => {
    if (todoName.value === '') {
      console.log("Se elimina el input...")
      todoName.parentElement.remove();
    }

    // Actualizamos el estado de el <ul> de los todos
    checkTodosList();
  }

  let todoType = document.createElement('span');
  todoType.classList.add(`todoType-${todoTypeSelector.value}`);
  todoType.innerText = todoTypeSelectorToText(todoTypeSelector);
  checkTodoTypeValue(todoType);

  todo.appendChild(customCheckbox);
  todo.appendChild(checkbox);
  todo.appendChild(todoName);
  todo.appendChild(todoType);
  
  todos.appendChild(todo);
  adjustWidthInput(todoName);

  console.log("¡Elemento creado correctamente!")
  console.log(todo);
  console.log(todos)

  clearInputs();
  checkTodosList();

})

inputTodo.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    createTodoButton.click();
  }
})

function adjustWidthInput(elemento) {
  elemento.style.width = ((elemento.value.length + 1) * 8) + 'px';
}

function todoTypeSelectorToText(todoTypeSelector) {
  switch (todoTypeSelector.value) {
    case '1' : return 'Importante';
    case '2' : return 'Normal';
    case '3' : return 'Baja';
  }
}

function checkInput() {

  let mensaje = document.getElementById('mensaje');
  let regularExpression = /^[a-záéíóúA-Z0-9 ]+$/;

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

  if (todoTypeSelector.value === '') {
    mensaje.innerText = 'Por favor, selecccione un tipo de tarea...';
    return false;
  }

  mensaje.innerText = '';

  return true;
}

// Quitamos el mensaje de error al cambiar el valor del input o del select
inputTodo.oninput = () => {
  document.getElementById('mensaje').innerText = '';
}

todoTypeSelector.onchange = () => {
  document.getElementById('mensaje').
  innerText = '';
}

function checkTodoTypeValue(span) {
  if (span.innerText === 'Importante') {
    span.style.backgroundColor = 'var(--red)';
    span.style.color = 'var(--light-red)';
  }

  if (span.innerText === 'Normal') {
    span.style.backgroundColor = 'var(--gold)';
    span.style.color = 'var(--light-gold)';
  }

  if (span.innerText === 'Baja') {
    span.style.backgroundColor = 'var(--blue)';
    span.style.color = 'var(--light-blue)';
  }
}

function checkTodosList() {
  // Usando la flag evitamos que se cree el mensaje de nuevo si ya está creado y
  // los mensajes de error
  if (todos.children.length === 0 && todosCompletados.children.length === 0) {
    flagNoHayTareas = true;
    todos.classList.add('centrado')
    todos.innerHTML = '<li class="message"> Aún no hay tareas creadas. Crea una nueva tarea para verlas aquí. </li>';
  } else if (flagNoHayTareas) {
    flagNoHayTareas = false;
    todos.classList.remove('centrado')
    let p = document.querySelector('#todos > li');
    p.remove();
  }
}


function clearInputs() {
  inputTodo.value = '';
  todoTypeSelector.value = '';
}

window.onload = () => {
  checkTodosList();
}