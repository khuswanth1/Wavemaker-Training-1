let addToDoButton = document.getElementById("add");
let toDoContainer = document.getElementById("todoscontainer");
let removeAll = document.getElementById("remall");
let editDialog = document.getElementById("editDialog");
let editInput = document.getElementById("editInput");
let editDueDateInput = document.getElementById("editDueDateInput");
let editPriorityInput = document.getElementById("editPriorityInput");
let cancelEditButton = document.getElementById("cancelEdit");
let addTaskDialog = document.getElementById("addTaskDialog");
let taskInput = document.getElementById("taskInput");
let dueDateInput = document.getElementById("dueDateInput");
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
let currentTaskIndex = null; // Track the index of the current task being edited

function desktopcheck() {
    return window.innerWidth > 768;
}

function addToContainer(value, dueDate, priority, subtasks = [], flag) {
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

    dueDateSpan.className = "due-date-styling";
    dueDateSpan.innerText = `${dueDate}`;

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

    // Set priority-based color using CSS variables
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
        task: value.trim(),
        dueDate: dueDate,
        priority: priority,
        check: false,
        subTasks: subtasks
    };
    taskArr.push(obj);

    tickMark.classList = "tick-styling";
    remove.classList = "remove-styling";
    edit.classList = "edit-styling";

    if (desktopcheck()) {
        tickMark.classList.toggle('tick-hover');
        remove.classList.toggle('remove-hover');
        edit.classList.toggle('edit-hover');
    }

    paragraph.style.paddingLeft = "40px";

    tickMark.addEventListener('click', function () {
        if (paragraph.style.textDecoration === "line-through") {
            paragraph.style.textDecoration = "none";
            tickMark.innerHTML = "✔";
            let index = taskArr.findIndex((e) => e.task === paragraph.innerText);
            taskArr[index].check = false;
        } else {
            paragraph.style.textDecoration = "line-through";
            tickMark.innerHTML = "&#x238C";
            let index = taskArr.findIndex((e) => e.task === paragraph.innerText);
            taskArr[index].check = true;
        }
        localStorage.setItem("tasks", JSON.stringify(taskArr));
    });

    edit.addEventListener('click', function () {
        currentEditIndex = taskArr.findIndex((e) => e.task === paragraph.innerText);
        editInput.value = paragraph.innerText;
        editDueDateInput.value = dueDate;
        editPriorityInput.value = priority;
        editDialog.showModal();
    });

    remove.addEventListener('click', function () {
        toDoContainer.removeChild(taskContainer);

        if (currentEditIndex >= 0) {
            taskArr.splice(currentEditIndex, 1);
            currentEditIndex = null;
        }
        localStorage.setItem("tasks", JSON.stringify(taskArr));
    });

    addSubtask.addEventListener('click', function () {
        currentTaskIndex = taskArr.findIndex((e) => e.task === paragraph.innerText);
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

    // Add existing subtasks
    subtasks.forEach((subtask) => {
        addSubtaskToContainer(subtasksContainer, subtask.text, subtask.checked);
    });

    if (flag) {
        tickMark.click();
    }
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
        localStorage.setItem("tasks", JSON.stringify(taskArr));
    }
}

function removeSubtask(subtaskText, taskIndex) {
    const subtaskIndex = taskArr[taskIndex].subTasks.findIndex(subtask => subtask.text === subtaskText);
    if (subtaskIndex >= 0) {
        taskArr[taskIndex].subTasks.splice(subtaskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(taskArr));
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
    let pendingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (!desktopcheck()) {
        addToDoButton.className = "addMobile";
        removeAll.className = "removeMobile";
    }
    for (let i = 0; i < pendingTasks.length; i++) {
        addToContainer(
            pendingTasks[i].task,
            pendingTasks[i].dueDate,
            pendingTasks[i].priority,
            pendingTasks[i].subTasks,
            pendingTasks[i].check
        );
    }

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
    var priorityValue = priorityInput.value;

    if (taskValue === "" || dueDateValue === "" || priorityValue === "") {
        alert("Please fill in all fields");
    } else {
        let ind = taskArr.findIndex((a) => a.task === taskValue);
        if (ind < 0) {
            addToContainer(taskValue, dueDateValue, priorityValue, [], false);
        } else {
            alert("Task Already added");
        }
        taskInput.value = "";
        dueDateInput.value = "";
        priorityInput.value = "low";
        addTaskDialog.close();
    }
});

removeAll.addEventListener('click', function () {
    if (confirm("Remove all tasks?")) {
        toDoContainer.innerHTML = "";
        taskArr = [];
        localStorage.setItem("tasks", JSON.stringify(taskArr));
    }
});

document.addEventListener('keypress', (e) => {
    if (e.key === "Enter" && document.activeElement === taskInput) {
        saveTaskButton.click();
    }
});

window.onbeforeunload = function () {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}

editDialog.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (currentEditIndex !== null) {
        let newValue = editInput.value.trim();
        let newDueDate = editDueDateInput.value.trim();
        let newPriority = editPriorityInput.value;
        if (newValue !== "" && newDueDate !== "" && newPriority !== "") {
            taskArr[currentEditIndex].task = newValue;
            taskArr[currentEditIndex].dueDate = newDueDate;
            taskArr[currentEditIndex].priority = newPriority;
            let taskContainer = toDoContainer.querySelector(`.task-container:nth-child(${currentEditIndex + 1})`);
            if (taskContainer) {
                taskContainer.querySelector('.paragraph-styling').innerText = newValue;
                taskContainer.querySelector('.due-date-styling').innerText = `Due: ${newDueDate}`;

                // Update the color based on the new priority using CSS variables
                switch (newPriority) {
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
            }
            localStorage.setItem("tasks", JSON.stringify(taskArr));
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
        let taskContainer = toDoContainer.querySelector(`.task-container:nth-child(${currentTaskIndex + 1})`);
        let subtasksContainer = taskContainer.querySelector('.subtasks');
        addSubtaskToContainer(subtasksContainer, subtaskValue, false);
        taskArr[currentTaskIndex].subTasks.push({ text: subtaskValue, checked: false });
        localStorage.setItem("tasks", JSON.stringify(taskArr));
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
    filterTasks(searchField.value.toLowerCase().trim());
});

function filterTasks(searchValue) {
    let tasks = document.querySelectorAll('.task-container');
    let filterType = filterDropdown.value;

    tasks.forEach(task => {
        let taskText = task.querySelector('.paragraph-styling').innerText.toLowerCase();
        let taskDate = task.querySelector('.due-date-styling').innerText.toLowerCase();
        let taskPriorityColor = task.style.backgroundColor;

        let matchSearch = taskText.includes(searchValue);

        let matchFilter = true;
        if (filterType === "date") {
            let today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
            matchFilter = taskDate.includes(today);
        } else if (filterType === "priority") {
            matchFilter = taskPriorityColor === 'var(--priority-high)';
        }

        if (matchSearch && matchFilter) {
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
