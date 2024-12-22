const listTask = [
    {id: 1, title: 'Task 1', done: true},
    {id: 2, title: 'Task 2', done: false},
    {id: 3, title: 'Task 3', done: false},
]
let cont = listTask.length;

function renderTask(tasks, taskContainer) {
    const container = document.getElementById(taskContainer);
    
    let contenidoHTML = "";
    if (listTask.length === 0) {
        let taskHTML = `
                <strong style="display:flex; justify-content: center; margin: 10px 0 20px 0; color: #16a34a; font-size: 20px;">No hay tareas pendientes</strong>
        `;
        contenidoHTML += taskHTML;
    }
    else {
        for ( let task of tasks ) {
            let taskHTML = `
                ${task.done ? "<li style='background-color:#f0fdf4'>" : "<li style='background-color:#fef2f2'>"}
    
                <span>
                ${task.title}
                ${task.done ? "<span style='color:green'>(Completada)</span>" : "<span style='color:red'>(Pendiente)</span>"}
                </span>
    
                <span>
                <button class="btn-success" onClick="changeStatus(${task.id})">Cambiar estado</button>
                <button class="btn-warning" onClick="deleteTask(${task.id})">Eliminar</button>
                </span>
                </li>
                `;
                
                contenidoHTML += taskHTML;
            }
    }
        container.innerHTML = contenidoHTML;
        
        actualizarTotalTask();
    }
    
function addTask() {
    const inputTask = document.getElementById('newTask');
    const nameTask = inputTask.value.trim(); 
    console.log(listTask);
    
    if (nameTask === "") {
        return;
    }
    else if (nameTask) {
        cont++;
        const newTask = {
            id: cont,
            title: nameTask,
            done: false
        }
        listTask.push(newTask)
    }
    inputTask.value = "";
    renderTask(listTask, "Task")
}

function deleteTask(id){
    const index = listTask.findIndex( task => task.id == id);
  
    if( index !== -1){
      listTask.splice(index,1);
  
      renderTask(listTask, "Task")
    }
}

// function changeStatus(id) {
//     const task = listTask.filter( task => task.id === id)
//     console.log("servicio:",task);
    
//     if(task){
//         task[0].done = !task[0].done
  
//         renderTask(listTask, "Task")
//     }
// }
function changeStatus(id){
    const task = listTask.find( task => task.id === id)
    console.log("servicio:",task);
    
    if(task){
        task.done = !task.done
  
        renderTask(listTask, "Task")
    }
}  

function actualizarTotalTask() {
    const totalTask = listTask.length;
    const doneTask = listTask.filter( task => task.done).length

    document.getElementById("totalTask").innerText = totalTask;
    document.getElementById("doneTask").innerText = doneTask;
  }
  
  window.onload = () => {
    renderTask(listTask, "Task")
  
    const btnAdd = document.getElementById("btn-add");
    btnAdd.addEventListener("click", addTask)
  
    const inputTask = document.getElementById('newTask');
  
    inputTask.addEventListener("keypress", function(event){
      if(event.key === "Enter"){
        addTask()
      }
    })
  }