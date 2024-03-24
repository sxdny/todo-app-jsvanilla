let inputTodo = document.getElementById('inputTodo');
let createTodoButton = document.getElementById('createTodoButton');
let todos = document.getElementById('todos');
let todosCompletados = document.getElementById("todosCompletados");
let todoTypeSelector = document.getElementById('todoTypeSelector');
let filterTodos = document.getElementById('filterTodos');

let tareas = [];

filterTodos.onchange = () => {
  let valor = filterTodos.value;

  if (getFilterTodosValue(valor) === 'Importante') {

    for (let i = 0; i < todos.children.length; i++) {
      console.log(todos.children[i])
      if (todos.children[i].getAttribute('task-type') === 'Importante') {
        todos.children[i].style.display = 'flex';
      } else {
        todos.children[i].style.display = 'none';
      }
    }

    for (let i = 0; i < todosCompletados.children.length; i++) {
      console.log(todosCompletados.children[i])
      if (todosCompletados.children[i].getAttribute('task-type') === 'Importante') {
        todosCompletados.children[i].style.display = 'flex';
      } else {
        todosCompletados.children[i].style.display = 'none';
      }

    }

  }

  if (getFilterTodosValue(valor) === 'Normal') {

    for (let i = 0; i < todos.children.length; i++) {
      console.log(todos.children[i])
      if (todos.children[i].getAttribute('task-type') === 'Normal') {
        todos.children[i].style.display = 'flex';
      } else {
        todos.children[i].style.display = 'none';
      }
    }

    for (let i = 0; i < todosCompletados.children.length; i++) {
      console.log(todosCompletados.children[i])
      if (todosCompletados.children[i].getAttribute('task-type') === 'Normal') {
        todosCompletados.children[i].style.display = 'flex';
      } else {
        todosCompletados.children[i].style.display = 'none';
      }

    }

  }

  if (getFilterTodosValue(valor) === 'Baja') {

    for (let i = 0; i < todos.children.length; i++) {
      console.log(todos.children[i])
      if (todos.children[i].getAttribute('task-type') === 'Baja') {
        todos.children[i].style.display = 'flex';
      } else {
        todos.children[i].style.display = 'none';
      }
    }

    console.log("Todos completados:")
    console.log(todosCompletados)
    for (let i = 0; i < todosCompletados.children.length; i++) {
      console.log(todosCompletados.children[i])
      if (todosCompletados.children[i].getAttribute('task-type') === 'Baja') {
        todosCompletados.children[i].style.display = 'flex';
      } else {
        todosCompletados.children[i].style.display = 'none';
      }

    }
  }

    if (getFilterTodosValue(valor) === 'Todos') {

      for (let i = 0; i < todos.children.length; i++) {
        todos.children[i].style.display = 'flex';
      }

      for (let i = 0; i < todosCompletados.children.length; i++) {
        todosCompletados.children[i].style.display = 'flex';
      }

    }

  }

  function getFilterTodosValue(valor) {
    switch (valor) {
      case '0': return 'Todos';
      case '1': return 'Importante';
      case '2': return 'Normal';
      case '3': return 'Baja';
    }
  }

  function getItemsFromLocalStorage() {
    if (localStorage.getItem('tareas')) {
      tareas = JSON.parse(localStorage.getItem('tareas'));

      tareas.forEach(tarea => {
        todoCounter++;

        // Creamos el elemento li
        let todo = document.createElement('li');
        todo.classList.add("todo");
        todo.id = todoCounter;
        todo.setAttribute('task-type', tarea.tipo)

        let customCheckbox = document.createElement('span');
        customCheckbox.classList.add('custom-checkbox');
        customCheckbox.onclick = () => {
          customCheckbox.classList.toggle('checked');
          let checkbox = todo.querySelector('input[type="checkbox"]');
          checkbox.click();
        }

        if (tarea.completada) {
          customCheckbox.classList.add('checked');
        } else {
          customCheckbox.classList.remove('checked');
        }

        let checkbox = document.createElement('input');
        checkbox.style.display = 'none';
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.completada;

        checkbox.onclick = () => {

          // Comprobamos que se ha completado o no la tarea...
          if (checkbox.checked == true) {
            console.log("El valor es true!")
            // Lo movemos a la lista de tareas completadas
            todosCompletados.appendChild(todo)

            // Actualizamos el estado de la tarea en el array de tareas
            tareas.forEach(tarea => {
              if (tarea.id == todo.id) {
                tarea.completada = true;
                console.log("Se ha actualizado el estado de la tarea correctamente!")
              }
            })

            // Guardamos las tareas en el localStorage
            localStorage.setItem('tareas', JSON.stringify(tareas));
            console.table(tareas);
          }
          else {
            console.log("El valor es false!")
            todos.appendChild(todo)

            // Actualizamos el estado de la tarea en el array de tareas
            tareas.forEach(tarea => {
              if (tarea.id == todo.id) {
                tarea.completada = false;
                console.log("Se ha actualizado el estado de la tarea correctamente!")
              }
            })

            // Guardamos las tareas en el localStorage
            localStorage.setItem('tareas', JSON.stringify(tareas));
            console.table(tareas);
          }

          checkTodosList();

        }

        let todoName = document.createElement('input');
        todoName.type = 'text';
        todoName.classList.add('todo-todoName');
        todoName.value = tarea.nombre;
        todoName.oninput = () => adjustWidthInput(todoName);
        todoName.onblur = () => {
          if (todoName.value === '') {
            console.log("Se elimina el input...")
            todoName.parentElement.remove();
          }

          // Actualizamos el estado de el <ul> de los todos
          checkTodosList();
        }

        // Al hacer un cambio en la tarea, actualizamos el valor en el array de tareas
        todoName.onchange = () => {
          tareas.forEach(tarea => {
            if (tarea.id == todo.id) {
              tarea.nombre = todoName.value;
              console.log("Se ha actualizado el nombre de la tarea correctamente!")
              // TODO hacer una alerta
            }
          })

          // Guardamos las tareas en el localStorage
          localStorage.setItem('tareas', JSON.stringify(tareas));
          console.table(tareas);
        }

        let todoType = document.createElement('span');
        todoType.classList.add(`todoType-${todoTypeSelector.value}`);
        todoType.innerText = tarea.tipo;
        checkTodoTypeValue(todoType);

        todo.appendChild(customCheckbox);
        todo.appendChild(checkbox);
        todo.appendChild(todoName);
        todo.appendChild(todoType);

        if (tarea.completada) {
          todosCompletados.appendChild(todo);
        } else {
          todos.appendChild(todo);
        }

        adjustWidthInput(todoName);

        console.log("¡Elemento creado correctamente!")
        console.log(todo);
        console.log(todos)
      })
    } else {
      localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    console.table(tareas);
    checkTodosList();
  }

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
    todo.id = todoCounter;

    function getType(value) {
      switch (value) {
        case '1': return 'Importante';
        case '2': return 'Normal';
        case '3': return 'Baja';
      }
    }

    let tipo = getType(todoTypeSelector.value);
    todo.setAttribute('task-type', tipo)

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

          // Actualizamos el estado de la tarea en el array de tareas
          tareas.forEach(tarea => {
            if (tarea.id == todo.id) {
              tarea.completada = true;
              console.log("Se ha actualizado el estado de la tarea correctamente!")
            }
          })

          // Guardamos las tareas en el localStorage
          localStorage.setItem('tareas', JSON.stringify(tareas));
          console.table(tareas);
        }
        else {
          console.log("El valor es false!")
          todos.appendChild(todo)

          // Actualizamos el estado de la tarea en el array de tareas
          tareas.forEach(tarea => {
            if (tarea.id == todo.id) {
              tarea.completada = false;
              console.log("Se ha actualizado el estado de la tarea correctamente!")
            }
          })

          // Guardamos las tareas en el localStorage
          localStorage.setItem('tareas', JSON.stringify(tareas));
          console.table(tareas);
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
        console.log(todoName.parentElement)

        // Actualizamos el array de tareas
        tareas.forEach(tarea => {
          if (tarea.id == todo.id) {
            console.log("Se ha encontrado la tarea a eliminar...")
            console.log(tarea);
            tareas.splice(tareas.indexOf(tarea), 1);
            console.log("Se ha eliminado la tarea correctamente!")
          }
        })

        // Guardamos las tareas en el localStorage
        localStorage.setItem('tareas', JSON.stringify(tareas));
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

    // Guardamos la tarea en el array de tareas
    tareas.push({
      id: todoCounter,
      nombre: inputTodo.value,
      tipo: todoType.innerText,
      completada: false
    });

    // Guardamos las tareas en el localStorage
    localStorage.setItem('tareas', JSON.stringify(tareas));

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
      case '1': return 'Importante';
      case '2': return 'Normal';
      case '3': return 'Baja';
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
    todoTypeSelector.value = '0';
  }

  window.onload = () => {
    getItemsFromLocalStorage();
  }