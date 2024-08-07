let addToDoButton = document.getElementById("add");
let toDoContainer = document.getElementById("todoscontainer");
let removeAll = document.getElementById("remall");
let editDialog = document.getElementById("editDialog");
let editInput = document.getElementById("editInput");
let editDueDateInput = document.getElementById("editDueDateInput");
let editDueTimeInput = document.getElementById("editDueTimeInput");
let editPriorityInput = document.getElementById("editPriorityInput");
let cancelEditButton = document.getElementById("cancelEdit");
let addTaskDialog = document.getElementById("addTaskDialog");
let taskInput = document.getElementById("taskInput");
let dueDateInput = document.getElementById("dueDateInput");
let dueTimeInput = document.getElementById("dueTimeInput");
let priorityInput = document.getElementById("priorityInput");
let saveTaskButton = document.getElementById("saveTask");
let cancelTaskButton = document.getElementById("cancelTask");
let addSubtaskDialog = document.getElementById("addSubtaskDialog");
let subtaskInput = document.getElementById("subtaskInput");
let saveSubtaskButton = document.getElementById("saveSubtask");
let cancelSubtaskButton = document.getElementById("cancelSubtask");
let searchField = document.getElementById("searchbox");
let filterDropdown = document.getElementById("filterDropdown");
let themeToggleButton = document.getElementById("themeToggle");
let taskArr = [];
let currentEditIndex = null;
let currentTaskIndex = null;

let exportButton = document.getElementById("exportButton");
let importButton = document.getElementById("importButton");
let importFileInput = document.getElementById("importFileInput");

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}

function loadFromLocalStorage() {
    taskArr = JSON.parse(localStorage.getItem("tasks")) || [];
}

function desktopcheck() {
    return window.innerWidth > 768;
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function addToContainer(value, dueDate, dueTime, priority, subtasks = [], flag, id = generateId()) {
    var taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    taskContainer.setAttribute('draggable', true);

    var taskMain = document.createElement('div');
    taskMain.classList.add('task-main');

    var paragraph = document.createElement('span');
    var dueDateSpan = document.createElement('span');
    var remove = document.createElement('span');
    var edit = document.createElement('span');
    var tickMark = document.createElement('span');
    var addSubtask = document.createElement('span');
    var subtasksContainer = document.createElement('div');
    subtasksContainer.className = "subtasks";

    paragraph.className = "paragraph-styling";
    paragraph.innerText = value;
    paragraph.dataset.id = id;

    dueDateSpan.className = "due-date-styling";
    dueDateSpan.innerText = `${dueDate} ${dueTime}`;

    tickMark.innerHTML = "✔";
    remove.innerHTML = "&#128465;";
    edit.innerHTML = "✎";
    addSubtask.innerHTML = "+ Subtask";
    addSubtask.classList.add("add-subtask");

    taskMain.appendChild(paragraph);
    taskMain.appendChild(dueDateSpan);
    taskMain.appendChild(edit);
    taskMain.appendChild(remove);
    taskMain.appendChild(tickMark);

    taskContainer.appendChild(taskMain);
    taskContainer.appendChild(addSubtask);
    taskContainer.appendChild(subtasksContainer);

    switch (priority) {
        case 'high':
            taskContainer.style.backgroundColor = 'var(--priority-high)';
            break;
        case 'medium':
            taskContainer.style.backgroundColor = 'var(--priority-medium)';
            break;
        case 'low':
            taskContainer.style.backgroundColor = 'var(--priority-low)';
            break;
    }

    toDoContainer.appendChild(taskContainer);

    let obj = {
        id: id,
        task: value.trim(),
        dueDate: dueDate,
        dueTime: dueTime,
        priority: priority,
        check: flag,
        subTasks: subtasks
    };

    tickMark.classList = "tick-styling";
    remove.classList = "remove-styling";
    edit.classList = "edit-styling";

    if (desktopcheck()) {
        tickMark.classList.toggle('tick-hover');
        remove.classList.toggle('remove-hover');
        edit.classList.toggle('edit-hover');
    }

    paragraph.style.paddingLeft = "20px";

    tickMark.addEventListener('click', function () {
        let taskIndex = taskArr.findIndex((e) => e.id === paragraph.dataset.id);
        if (paragraph.style.textDecoration === "line-through") {
            paragraph.style.textDecoration = "none";
            tickMark.innerHTML = "✔";
            taskArr[taskIndex].check = false;
        } else {
            paragraph.style.textDecoration = "line-through";
            tickMark.innerHTML = "&#x238C";
            taskArr[taskIndex].check = true;
        }
        saveToLocalStorage();
    });

    edit.addEventListener('click', function () {
        currentEditIndex = taskArr.findIndex((e) => e.id === paragraph.dataset.id);
        editInput.value = paragraph.innerText;
        editDueDateInput.value = dueDate;
        editDueTimeInput.value = dueTime;
        editPriorityInput.value = priority;
        editDialog.showModal();
    });

    remove.addEventListener('click', function () {
        toDoContainer.removeChild(taskContainer);

        if (currentEditIndex >= 0) {
            taskArr.splice(currentEditIndex, 1);
            currentEditIndex = null;
        }
        saveToLocalStorage();
    });

    addSubtask.addEventListener('click', function () {
        currentTaskIndex = taskArr.findIndex((e) => e.id === paragraph.dataset.id);
        addSubtaskDialog.showModal();
    });

    taskContainer.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', taskArr.indexOf(obj));
        taskContainer.classList.add('dragging');
    });

    taskContainer.addEventListener('dragend', () => {
        taskContainer.classList.remove('dragging');
    });

    toDoContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(toDoContainer, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            toDoContainer.appendChild(draggable);
        } else {
            toDoContainer.insertBefore(draggable, afterElement);
        }
    });

    subtasks.forEach((subtask) => {
        addSubtaskToContainer(subtasksContainer, subtask.text, subtask.checked);
    });

    if (flag) {
        tickMark.click();
    }

    scheduleReminder(obj);
}

function addSubtaskToContainer(subtasksContainer, subtaskText, isChecked) {
    const subtaskContainer = document.createElement('div');
    subtaskContainer.classList.add('subtask-container');

    const subtaskParagraph = document.createElement('span');
    const subtaskTick = document.createElement('span');
    const subtaskRemove = document.createElement('span');

    subtaskParagraph.innerText = subtaskText;
    subtaskTick.innerHTML = "✔";
    subtaskRemove.innerHTML = "&#128465;";

    if (isChecked) {
        subtaskParagraph.style.textDecoration = "line-through";
        subtaskTick.innerHTML = "&#x238C";
    }

    subtaskTick.addEventListener('click', function () {
        if (subtaskParagraph.style.textDecoration === "line-through") {
            subtaskParagraph.style.textDecoration = "none";
            subtaskTick.innerHTML = "✔";
        } else {
            subtaskParagraph.style.textDecoration = "line-through";
            subtaskTick.innerHTML = "&#x238C";
        }
        updateSubtaskStatus(subtaskParagraph.innerText, currentTaskIndex);
    });

    subtaskRemove.addEventListener('click', function () {
        subtasksContainer.removeChild(subtaskContainer);
        removeSubtask(subtaskParagraph.innerText, currentTaskIndex);
    });

    subtaskContainer.appendChild(subtaskTick);
    subtaskContainer.appendChild(subtaskParagraph);
    subtaskContainer.appendChild(subtaskRemove);
    subtasksContainer.appendChild(subtaskContainer);
}

function updateSubtaskStatus(subtaskText, taskIndex) {
    const subtaskIndex = taskArr[taskIndex].subTasks.findIndex(subtask => subtask.text === subtaskText);
    if (subtaskIndex >= 0) {
        taskArr[taskIndex].subTasks[subtaskIndex].checked = !taskArr[taskIndex].subTasks[subtaskIndex].checked;
        saveToLocalStorage();
    }
}

function removeSubtask(subtaskText, taskIndex) {
    const subtaskIndex = taskArr[taskIndex].subTasks.findIndex(subtask => subtask.text === subtaskText);
    if (subtaskIndex >= 0) {
        taskArr[taskIndex].subTasks.splice(subtaskIndex, 1);
        saveToLocalStorage();
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task-container:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

window.onload = function loadAgain() {
    loadFromLocalStorage();
    if (!desktopcheck()) {
        addToDoButton.className = "addMobile";
        removeAll.className = "removeMobile";
    }
    taskArr.forEach(task => {
        addToContainer(task.task, task.dueDate, task.dueTime, task.priority, task.subTasks, task.check, task.id);
    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
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
        saveToLocalStorage();
        sortAndDisplayTasks();
        scheduleReminder(newTask);
        
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

document.addEventListener('keypress', (e) => {
    if (e.key === "Enter" && document.activeElement === taskInput) {
        saveTaskButton.click();
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
            sortAndDisplayTasks();
            scheduleReminder(taskArr[currentEditIndex]);
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
        sortAndDisplayTasks();
        subtaskInput.value = "";
        addSubtaskDialog.close();
    }
});

cancelSubtaskButton.addEventListener('click', function () {
    addSubtaskDialog.close();
});

searchField.addEventListener('input', function () {
    let searchValue = searchField.value.toLowerCase().trim();
    filterTasks(searchValue);
});

filterDropdown.addEventListener('change', function () {
    sortAndDisplayTasks();
});

function sortAndDisplayTasks() {
    const filterType = filterDropdown.value;
    let priorityQueue = [...taskArr];

    if (filterType === 'date') {
        priorityQueue.sort((a, b) => new Date(`${a.dueDate}T${a.dueTime}`) - new Date(`${b.dueDate}T${b.dueTime}`));
    } else if (filterType === 'priority') {
        const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
        priorityQueue.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    toDoContainer.innerHTML = "";
    priorityQueue.forEach(task => {
        addToContainer(task.task, task.dueDate, task.dueTime, task.priority, task.subTasks, task.check, task.id);
    });
}

function filterTasks(searchValue) {
    let tasks = document.querySelectorAll('.task-container');

    tasks.forEach(task => {
        let taskText = task.querySelector('.paragraph-styling').innerText.toLowerCase();
        let matchSearch = taskText.includes(searchValue);

        if (matchSearch) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

exportButton.addEventListener('click', () => {
    exportToJSON();
});

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
                    sortAndDisplayTasks();
                    data.forEach(task => scheduleReminder(task));
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

function scheduleReminder(task) {
    const taskDateTime = new Date(`${task.dueDate}T${task.dueTime}`);
    const now = new Date();
    const timeToReminder = taskDateTime - now - 15 * 60 * 1000; 

    if (timeToReminder > 0) {
        setTimeout(() => {
            showNotification(`Reminder: ${task.task} is due in 15 min`);
        }, timeToReminder);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;

    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.innerText = '×';
    closeButton.onclick = () => notification.remove();

    notification.appendChild(closeButton);
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 15000); 
}
