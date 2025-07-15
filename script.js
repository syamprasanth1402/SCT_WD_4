const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskDatetime = document.getElementById("task-datetime");
const taskList = document.getElementById("task-list");

// Load from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  const datetime = taskDatetime.value;
  if (text !== "") {
    addTask(text, datetime);
    taskInput.value = "";
    taskDatetime.value = "";
    saveTasks();
  }
});

function addTask(text, datetime, completed = false) {
  const li = document.createElement("li");
  li.className = "task" + (completed ? " completed" : "");

  const textEl = document.createElement("div");
  textEl.className = "text";
  textEl.textContent = text;

  const dateEl = document.createElement("div");
  dateEl.className = "datetime";
  dateEl.textContent = datetime ? "🕒 " + new Date(datetime).toLocaleString() : "";

  const actions = document.createElement("div");
  actions.className = "actions";

  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = "✅";
  completeBtn.title = "Mark Complete";
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "✏️";
  editBtn.title = "Edit Task";
  editBtn.onclick = () => {
    const newText = prompt("Edit task", textEl.textContent);
    if (newText) {
      textEl.textContent = newText;
      saveTasks();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.title = "Delete Task";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(textEl);
  li.appendChild(dateEl);
  li.appendChild(actions);

  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task").forEach((task) => {
    tasks.push({
      text: task.querySelector(".text").textContent,
      datetime: task.querySelector(".datetime").textContent.replace("🕒 ", ""),
      completed: task.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((t) => addTask(t.text, t.datetime, t.completed));
}
