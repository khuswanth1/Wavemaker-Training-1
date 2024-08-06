let addToDoButton = document.getElementById("add");
let toDoContainer = document.getElementById("todoscontainer");
let inputField = document.getElementById("inputbox");
let removeAll = document.getElementById("remall");
let editDialog = document.getElementById("editDialog");
let editInput = document.getElementById("editInput");
let cancelEditButton = document.getElementById("cancelEdit");
let taskArr = [];
let currentEditIndex = null;

function desktopcheck() {
    return window.innerWidth > 768;
}

function addToContainer(value, flag) {
    var taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    taskContainer.setAttribute('draggable', true);

    var tickMark = document.createElement('span');
    var paragraph = document.createElement('span');
    var remove = document.createElement('span');
    var edit = document.createElement('span');

    tickMark.innerHTML = "✔";
    remove.innerHTML = "&#128465;";
    edit.innerHTML = "✎";
    paragraph.className = "paragraph-styling";
    paragraph.innerText = value;

    taskContainer.appendChild(paragraph);
    taskContainer.appendChild(edit);
    taskContainer.appendChild(remove);
    taskContainer.appendChild(tickMark);

    toDoContainer.appendChild(taskContainer);

    let obj = {
        task: value.trim(),
        check: false
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

    if (flag) {
        tickMark.click();
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
        addToContainer(pendingTasks[i].task, pendingTasks[i].check);
    }
    inputField.focus();
}

addToDoButton.addEventListener('click', function () {
    var inputstr = inputField.value.trim();
    if (inputstr === "") {
        alert("Field Empty");
    } else {
        let ind = taskArr.findIndex((a) => a.task === inputstr);
        if (ind < 0) {
            addToContainer(inputstr, false);
        } else {
            alert("Task Already added");
        }
        inputField.value = "";
    }
})

removeAll.addEventListener('click', function () {
    if (confirm("Remove all tasks ?")) {
        toDoContainer.innerHTML = "";
        taskArr = [];
        localStorage.setItem("tasks", JSON.stringify(taskArr));
    }
})

document.addEventListener('keypress', (e) => {
    inputField.focus();
    if (e.key === "Enter") {
        addToDoButton.click();
    }
})

window.onbeforeunload = function () {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}

editDialog.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (currentEditIndex !== null) {
        let newValue = editInput.value.trim();
        if (newValue !== "") {
            taskArr[currentEditIndex].task = newValue;
            let taskContainer = toDoContainer.querySelector(`.task-container:nth-child(${currentEditIndex + 1})`);
            if (taskContainer) {
                taskContainer.querySelector('span').innerText = newValue;
            }
            localStorage.setItem("tasks", JSON.stringify(taskArr));
        }
    }
    editDialog.close();
});

cancelEditButton.addEventListener('click', function () {
    editDialog.close();
});
