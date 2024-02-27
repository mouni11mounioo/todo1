document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskInput.value}</span>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
        saveTask(taskInput.value);
        taskInput.value = "";
    }
}

function deleteTask(button) {
    const taskList = document.getElementById("taskList");
    const taskText = button.parentNode.firstChild.innerText;

    taskList.removeChild(button.parentNode);
    removeTask(taskText);
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    let tasks = getTasks();

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task}</span>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function getTasks() {
    const tasksString = localStorage.getItem("tasks");
    return tasksString ? JSON.parse(tasksString) : [];
}