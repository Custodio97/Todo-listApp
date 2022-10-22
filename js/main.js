const task_input = document.querySelector('input')
const add_btn = document.querySelector('.add_task-button')
const todo_list = document.querySelector('.todos-list')
const alert_message = document.querySelector('.alert-message')
const delete_all_btn = document.querySelector('.delete-all-btn')


let todos = JSON.parse(localStorage.getItem('todos')) || []

window.addEventListener("DOMContentLoaded", showAllTodos)


function getRandomId() {
    return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2,15)
}


function addToDo(task_input) {
    let task = {
        id: getRandomId(),
        task: task_input.value,
        completed:false
    }
    todos.push(task)
}
task_input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && task_input.value.length > 0) {
        addToDo(task_input)
        saveToLocalStorage()
        task_input.value = ''
        showAllTodos()
    }
})

add_btn.addEventListener('click', () => {
    if (task_input.value === '') {
        showAlertMessage('Enter task please!','error')
    } else {
        addToDo(task_input)
        saveToLocalStorage()
        showAllTodos()
        task_input.value = ''
        showAlertMessage('Task add !','successful')
    }
})
delete_all_btn.addEventListener('click', clearAllTodos)

function showAllTodos() {
    todo_list.innerHTML = ''
    todos.forEach((todo) => {
        todo_list.innerHTML += `
            <li class="todo-item" data-id="${todo.id}">
                <p class="task-body">
                    ${todo.task}
                </p>
                <div class="todo-actions">
                    <button class="btn btn-success" onclick="editTodo('${todo.id}')">
                        <i class="bx bx-edit-alt bx-sm"></i>    
                    </button>
                    <button class="btn btn-error" onclick="deleteTodo('${todo.id}')">
                        <i class="bx bx-trash bx-sm"></i>
                    </button>
                </div>
            </li>
        `
     });
}

function saveToLocalStorage() {
    localStorage.setItem('todos',JSON.stringify(todos))
}

function showAlertMessage(type, message) {
    let alert_box = `
     <div class="alert alert-${type} shadow-lg w-full">
       <div
         <span>${message}</span>
       </div>
     </div>
    `
    alert_message.innerHTML = alert_box
    alert_message.classList.add('show')
    alert_message.classList.remove('hide')
    setTimeout(() => {
        alert_message.classList.add('hide')
        alert_message.classList.remove('show')
    },3000)
}


function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id)
    saveToLocalStorage()
    showAlertMessage(' Todo deleted  successful')
    showAllTodos()
}
function editTodo(id) {
    let todo = todos.find(todo => todo.id === id)
    task_input.value = todo.task
    todos = todos.filter(todo => todo.id !== id)
    add_btn.innerHTML = "<i class='bx bx-check bx-sm'></i>"
    saveToLocalStorage()
    add_btn.addEventListener('click', () => {
        add_btn.innerHTML = "<i class='bx bx-plus bx-sm'></i>"
        showAlertMessage('Todo update succefully', 'success')
    })
}

function clearAllTodos() {
    if (todos.length > 0) {
        todos = []
        saveToLocalStorage()
        showAlertMessage('All todos cleared succesfuly', 'success')
        showAllTodos()
    } else {
        showAlertMessage('No todos to clear','error')
    }
}