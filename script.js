// Selecting elements
const inputField = document.getElementById("inputField");
const addBtn = document.getElementById("addBtn");
const unOrderList = document.getElementById("unOrderList");
const searchBar = document.getElementById("searchBar");
const darkModeToggle = document.getElementById("darkModeToggle");
const dueDate = document.getElementById("dueDate");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Function to render tasks
function renderTasks() {
    unOrderList.innerHTML = "";

    // Sort tasks by due date
    // tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    document.getElementById("sortBtn").addEventListener("click", sortTasksByName);
    function sortTasksByName() {
    tasks.sort((a, b) => a.text.localeCompare(b.text)); // Sort alphabetically
    saveTasks(); // Save new order

    
}


    // tasks.sort((a, b) => a.text.localeCompare(b.text));

    tasks.forEach((task, index) => {
        let newLi = document.createElement("li");
        newLi.classList.add("task-item");
        newLi.setAttribute("data-index", index);
        newLi.draggable = true; // Enable dragging

        if (task.completed) newLi.classList.add("completed");

        newLi.innerHTML = `
            <span class="task-text">${task.text}</span>
            <span class="due-date">${task.dueDate ? `📅 ${task.dueDate}` : ""}</span>
            <button class="edit-btn">✍🏼</button>
            <button class="complete-btn">✔</button>
            <button class="delete-btn">❌</button>
        `;

        // Edit task
        newLi.querySelector(".edit-btn").addEventListener("click", () => {
            let newText = prompt("Edit Task:", task.text);
            if (newText !== null) {
                tasks[index].text = newText;
                saveTasks();
            }
        });

        // Complete task
        newLi.querySelector(".complete-btn").addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        });

        // Delete task
        newLi.querySelector(".delete-btn").addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
        });

        // Drag and Drop Events
        newLi.addEventListener("dragstart", handleDragStart);
        newLi.addEventListener("dragover", handleDragOver);
        newLi.addEventListener("drop", handleDrop);
        newLi.addEventListener("dragend", handleDragEnd);

        unOrderList.appendChild(newLi);
    });
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Add Task Event
addBtn.addEventListener("click", () => {
    if (inputField.value.trim() !== "") {
        tasks.push({ text: inputField.value, completed: false, dueDate: dueDate.value });
        inputField.value = "";
        dueDate.value = "";
        saveTasks();
    }
});

// Search Filter
searchBar.addEventListener("input", (e) => {
    let searchText = e.target.value.toLowerCase();
    document.querySelectorAll(".task-item").forEach(task => {
        task.style.display = task.innerText.toLowerCase().includes(searchText) ? "flex" : "none";
    });
});

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀ Light Mode" : "🌙 Dark Mode";
});

// Drag & Drop Functions
let draggedItem = null;

// When user starts dragging a task
function handleDragStart(e) {
    draggedItem = this;
    setTimeout(() => (this.style.display = "none"), 0);
}

// When hovering over another task while dragging
function handleDragOver(e) {
    e.preventDefault();
    let afterElement = getDragAfterElement(unOrderList, e.clientY);
    if (afterElement == null) {
        unOrderList.appendChild(draggedItem);
    } else {
        unOrderList.insertBefore(draggedItem, afterElement);
    }
}

// When the task is dropped in a new position
function handleDrop() {
    this.style.display = "flex";
}

// When dragging ends (update tasks array order)
function handleDragEnd() {
    draggedItem.style.display = "flex";
    let updatedTasks = [];
    document.querySelectorAll(".task-item").forEach(task => {
        let index = task.getAttribute("data-index");
        updatedTasks.push(tasks[index]);
    });
    tasks = updatedTasks;
    saveTasks();
}

// Helper function to find the closest task element while dragging
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".task-item:not(.dragging)")];
    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}
