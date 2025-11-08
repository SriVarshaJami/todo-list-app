 // Select elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) li.classList.add("completed");

    // Mark complete on click
    li.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent triggering complete toggle
      tasks.splice(index, 1);
      saveTasks();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Add new task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return alert("Enter a task!");
  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveTasks();
});

// Allow pressing Enter key
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Initial render
renderTasks();
