let addToDoButton = document.getElementById("add");
let removeAll = document.getElementById("remall");
let toDoContainer = document.getElementById("todoscontainer");

let addTaskDialog = document.getElementById("addTaskDialog");
let taskInput = document.getElementById("taskInput");
let dueDateInput = document.getElementById("dueDateInput");
let dueTimeInput = document.getElementById("dueTimeInput");
let priorityInput = document.getElementById("priorityInput");
let saveTaskButton = document.getElementById("saveTask");
let cancelTaskButton = document.getElementById("cancelTask");

let editDialog = document.getElementById("editDialog");
let editInput = document.getElementById("editInput");
let editDueDateInput = document.getElementById("editDueDateInput");
let editDueTimeInput = document.getElementById("editDueTimeInput");
let editPriorityInput = document.getElementById("editPriorityInput");
let cancelEditButton = document.getElementById("cancelEdit");

let addSubtaskDialog = document.getElementById("addSubtaskDialog");
let subtaskInput = document.getElementById("subtaskInput");
let saveSubtaskButton = document.getElementById("saveSubtask");
let cancelSubtaskButton = document.getElementById("cancelSubtask");

let searchField = document.getElementById("searchbox");
let filterDropdown = document.getElementById("filterDropdown");
let themeToggleButton = document.getElementById("themeToggle");

let taskArr = [];
let currentTaskIndex = null;

function generateId() {
    return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

function sortTasks(tasksArray, sortBy) {
    return tasksArray.sort((a, b) => {
        if (sortBy === 'priority') {
            const priorityOrder = { 
                'high': 1, 
                'medium': 2,
                'low': 3 
            };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        } else if (sortBy === 'dueDate') {
            const dateA = new Date(a.dueDate + ' ' + a.dueTime);
            const dateB = new Date(b.dueDate + ' ' + b.dueTime);
            return dateA - dateB;
        } else {
            return 0;
        }
    });
}

filterDropdown.addEventListener('change', (e) => {
    if (e.target.value === "date") {
        sortTasks(taskArr, 'dueDate');
    } else {
        sortTasks(taskArr, 'priority');
    }
    saveToLocalStorage();
    toDoContainer.innerHTML = "";
    taskArr.forEach(task => {
        addToContainer(task.task, task.dueDate, task.dueTime, task.priority, task.subTasks, task.check, task.id);
    });
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
});

let exportButton = document.getElementById("exportButton");
let importButton = document.getElementById("importButton");
let importFileInput = document.getElementById("importFileInput");

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}

function loadFromLocalStorage() {
    taskArr = JSON.parse(localStorage.getItem("tasks")) || [];
}

function addToContainer(value, dueDate, dueTime, priority, subtasks = [], flag, id) {
    var taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container', priority);

    var taskMain = document.createElement('div');
    taskMain.classList.add('task-main');

    var taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details');

    var taskName = document.createElement('div');
    taskName.classList.add('task-name');
    taskName.innerText = value;

    var dueDateTime = document.createElement('div');
    dueDateTime.classList.add('due-date-time');

    var dueDateDiv = document.createElement('div');
    dueDateDiv.innerText = dueDate;

    var dueTimeDiv = document.createElement('div');
    dueTimeDiv.innerText = dueTime;

    dueDateTime.appendChild(dueDateDiv);
    dueDateTime.appendChild(dueTimeDiv);

    taskDetails.appendChild(taskName);
    taskDetails.appendChild(dueDateTime);

    var actions = document.createElement('div');
    actions.classList.add('actions');

    var tickMark = document.createElement('div');
    tickMark.innerHTML = "✔";
    tickMark.classList.add('view-edit-delete');

    var edit = document.createElement('div');
    edit.innerHTML = "✎";
    edit.classList.add('view-edit-delete');

    var remove = document.createElement('div');
    remove.innerHTML = "&#128465;";
    remove.classList.add('view-edit-delete');

    actions.appendChild(tickMark);
    actions.appendChild(edit);
    actions.appendChild(remove);

    taskMain.appendChild(taskDetails);
    taskMain.appendChild(actions);

    var subtasksContainer = document.createElement('div');
    subtasksContainer.classList.add('subtasks');

    subtasks.forEach(subtask => {
        addSubtaskToContainer(subtasksContainer, subtask.text, subtask.checked, id);
    });

    var addSubtask = document.createElement('div');
    addSubtask.classList.add('add-subtask');
    addSubtask.innerHTML = "+ Subtask";
    addSubtask.addEventListener('click', function () {
        currentTaskIndex = taskArr.findIndex((e) => e.id === id);
        addSubtaskDialog.showModal();
    });

    taskContainer.appendChild(taskMain);
    taskContainer.appendChild(subtasksContainer);
    taskContainer.appendChild(addSubtask);

    toDoContainer.appendChild(taskContainer);

    tickMark.addEventListener('click', function () {
        let taskIndex = taskArr.findIndex((e) => e.id === id);
        if (taskName.style.textDecoration === "line-through") {
            taskName.style.textDecoration = "none";
            tickMark.innerHTML = "✔";
            taskArr[taskIndex].check = false;
        } else {
            taskName.style.textDecoration = "line-through";
            tickMark.innerHTML = "&#x238C";
            taskArr[taskIndex].check = true;
        }
        saveToLocalStorage();
    });

    edit.addEventListener('click', function () {
        editInput.value = value;
        editDueDateInput.value = dueDate;
        editDueTimeInput.value = dueTime;
        editPriorityInput.value = priority;
        currentEditIndex = taskArr.findIndex((e) => e.id === id);
        editDialog.showModal();
    });

    remove.addEventListener('click', function () {
        currentEditIndex = taskArr.findIndex((e) => e.id === id);
        toDoContainer.removeChild(taskContainer);
        if (currentEditIndex >= 0) {
            taskArr.splice(currentEditIndex, 1);
            currentEditIndex = null;
        }
        saveToLocalStorage();
    });
}

function addSubtaskToContainer(subtasksContainer, subtaskText, isChecked, parentTaskId) {
    const subtaskContainer = document.createElement('div');
    subtaskContainer.classList.add('subtask-container');

    const subtaskParagraph = document.createElement('div');
    const subtaskTick = document.createElement('div');
    const subtaskRemove = document.createElement('div');

    subtaskParagraph.innerText = subtaskText;
    subtaskTick.innerHTML = "✔";
    subtaskRemove.innerHTML = "&#128465;";
    subtaskTick.classList.add('view-edit-delete');
    subtaskRemove.classList.add('view-edit-delete');

    if (isChecked) {
        subtaskParagraph.style.textDecoration = "line-through";
        subtaskTick.innerHTML = "&#x238C";
    }

    subtaskTick.addEventListener('click', function () {
        let taskIndex = taskArr.findIndex((e) => e.id === parentTaskId);
        let subtaskIndex = taskArr[taskIndex].subTasks.findIndex(st => st.text === subtaskText);
        if (subtaskParagraph.style.textDecoration === "line-through") {
            subtaskParagraph.style.textDecoration = "none";
            subtaskTick.innerHTML = "✔";
            taskArr[taskIndex].subTasks[subtaskIndex].checked = false;
        } else {
            subtaskParagraph.style.textDecoration = "line-through";
            subtaskTick.innerHTML = "&#x238C";
            taskArr[taskIndex].subTasks[subtaskIndex].checked = true;
        }
        saveToLocalStorage();
    });

    subtaskRemove.addEventListener('click', function () {
        let taskIndex = taskArr.findIndex((e) => e.id === parentTaskId);
        let subtaskIndex = taskArr[taskIndex].subTasks.findIndex(st => st.text === subtaskText);
        if (subtaskIndex >= 0) {
            taskArr[taskIndex].subTasks.splice(subtaskIndex, 1);
            saveToLocalStorage();
        }
        subtasksContainer.removeChild(subtaskContainer);
    });
    subtaskContainer.classList.add('alig-center');
    subtaskContainer.appendChild(subtaskTick);
    subtaskContainer.appendChild(subtaskParagraph);
    subtaskContainer.appendChild(subtaskRemove);
    subtasksContainer.appendChild(subtaskContainer);
}

window.onload = function loadAgain() {
    loadFromLocalStorage();
    taskArr = sortTasks(taskArr,"priority");
    taskArr.forEach(task => {
        addToContainer(task.task, task.dueDate, task.dueTime, task.priority, task.subTasks, task.check, task.id);
    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    new Sortable(toDoContainer, {
        animation: 150,
        onEnd: function (evt) {
            const oldIndex = evt.oldIndex;
            const newIndex = evt.newIndex;
            if (oldIndex !== newIndex) {
                const movedTask = taskArr.splice(oldIndex, 1)[0];
                taskArr.splice(newIndex, 0, movedTask);
                saveToLocalStorage();
            }
        }
    });
}

addToDoButton.addEventListener('click', function () {
    addTaskDialog.showModal();
});

saveTaskButton.addEventListener('click', function () {
    var taskValue = taskInput.value.trim();
    var dueDateValue = dueDateInput.value.trim();
    var dueTimeValue = dueTimeInput.value.trim();
    var priorityValue = priorityInput.value;

    if (taskValue === "" || dueDateValue === "" || dueTimeValue === "" || priorityValue === "") {
        alert("Please fill in all fields");
    } else {
        const newTask = {
            id: generateId(),
            task: taskValue,
            dueDate: dueDateValue,
            dueTime: dueTimeValue,
            priority: priorityValue,
            check: false,
            subTasks: []
        };
        taskArr.push(newTask);
        addToContainer(newTask.task, newTask.dueDate, newTask.dueTime, newTask.priority, newTask.subTasks, newTask.check, newTask.id);
        saveToLocalStorage();
        
        taskInput.value = "";
        dueDateInput.value = "";
        dueTimeInput.value = "";
        priorityInput.value = "low";
        addTaskDialog.close();
    }
});

removeAll.addEventListener('click', function () {
    if (confirm("Remove all tasks?")) {
        toDoContainer.innerHTML = "";
        taskArr = [];
        saveToLocalStorage();
    }
});

window.onbeforeunload = function () {
    saveToLocalStorage();
}

editDialog.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (currentEditIndex !== null) {
        let newValue = editInput.value.trim();
        let newDueDate = editDueDateInput.value.trim();
        let newDueTime = editDueTimeInput.value.trim();
        let newPriority = editPriorityInput.value;
        if (newValue !== "" && newDueDate !== "" && newDueTime !== "" && newPriority !== "") {
            taskArr[currentEditIndex].task = newValue;
            taskArr[currentEditIndex].dueDate = newDueDate;
            taskArr[currentEditIndex].dueTime = newDueTime;
            taskArr[currentEditIndex].priority = newPriority;

            saveToLocalStorage();
            toDoContainer.innerHTML = "";
            taskArr.forEach(task => {
                addToContainer(task.task, task.dueDate, task.dueTime, task.priority, task.subTasks, task.check, task.id);
            });
            if (localStorage.getItem("theme") === "dark") {
                document.body.classList.add("dark-mode");
            }
        }
    }
    editDialog.close();
});

cancelEditButton.addEventListener('click', function () {
    editDialog.close();
});

cancelTaskButton.addEventListener('click', function () {
    addTaskDialog.close();
});

saveSubtaskButton.addEventListener('click', function () {
    var subtaskValue = subtaskInput.value.trim();
    if (subtaskValue === "") {
        alert("Subtask cannot be empty");
    } else {
        taskArr[currentTaskIndex].subTasks.push({ text: subtaskValue, checked: false });
        saveToLocalStorage();
        subtaskInput.value = "";
        addSubtaskDialog.close();
        toDoContainer.innerHTML = "";
        taskArr.forEach(task => {
            addToContainer(task.task, task.dueDate, task.dueTime, task.priority, task.subTasks, task.check, task.id);
        });
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
        }
    }
});

cancelSubtaskButton.addEventListener('click', function () {
    addSubtaskDialog.close();
});

themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

exportButton.addEventListener('click', () => {
    exportToJSON();
});

searchField.addEventListener('input', function () {
    let searchValue = searchField.value.toLowerCase().trim();
    filterTasks(searchValue);
});

function filterTasks(searchValue) {
    let tasks = document.querySelectorAll('.task-container');
    tasks.forEach(task => {
        let taskText = task.querySelector('.task-name').innerText.toLowerCase();
        let matchSearch = taskText.includes(searchValue);

        if (matchSearch) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

function exportToJSON() {
    const dataStr = JSON.stringify(taskArr, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'todoData.json';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

importButton.addEventListener('click', () => {
    importFileInput.click();
});

importFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = JSON.parse(e.target.result);
                if (Array.isArray(data)) {
                    taskArr = data;
                    saveToLocalStorage();
                    toDoContainer.innerHTML = "";
                    loadAgain();
                } else {
                    alert('Invalid file format. Please upload a valid JSON file.');
                }
            } catch (error) {
                alert('Error parsing JSON file.');
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please upload a valid JSON file.');
    }
});
