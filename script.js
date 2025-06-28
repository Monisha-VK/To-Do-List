var popupoverlay = document.querySelector(".popup-overlay");
var popupbox = document.querySelector(".popup-box");
var addpopupbutton = document.getElementById("add-popup-button");
var cancelbutton = document.getElementById("cancel-popup");
var addtask = document.getElementById("add-task");
var container = document.querySelector(".container");

var titleInput = document.getElementById("task-title-input");
var descInput = document.getElementById("task-desc-input");
var dateInput = document.getElementById("task-date-input");

// Show popup
addpopupbutton.addEventListener("click", () => {
  popupoverlay.style.display = "block";
  popupbox.style.display = "block";
});

// Cancel popup
cancelbutton.addEventListener("click", (e) => {
  e.preventDefault();
  popupoverlay.style.display = "none";
  popupbox.style.display = "none";
});

// Load tasks on page load
window.onload = function () {
  loadTasks();
  checkForTodayTasks();
};

// Save tasks to LocalStorage
function saveTasks() {
  localStorage.setItem("tasks", container.innerHTML);
}

// Load tasks from LocalStorage
function loadTasks() {
  container.innerHTML = localStorage.getItem("tasks") || "";

  // Rebind delete & complete buttons after loading
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      saveTasks();
    });
  });

  document.querySelectorAll(".complete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.parentElement.style.backgroundColor = "#c8e6c9"; // light green
      e.target.remove(); // remove complete button
      saveTasks();
    });
  });
}

// Add Task
addtask.addEventListener("click", (e) => {
  e.preventDefault();

  var title = titleInput.value.trim();
  var desc = descInput.value.trim();
  var date = dateInput.value;

  if (title && desc && date) {
    var div = document.createElement("div");
    div.setAttribute("class", "task-container");
    div.innerHTML = `
      <h2>${title}</h2>
      <p>${desc}</p>
      <p><strong>Due:</strong> ${date}</p>
      <button class="complete-btn">Complete</button>
      <button class="delete-btn">Delete</button>
    `;
    container.appendChild(div);

    // Add delete button functionality
    div.querySelector(".delete-btn").addEventListener("click", () => {
      div.remove();
      saveTasks();
    });

    // Add complete button functionality
    div.querySelector(".complete-btn").addEventListener("click", () => {
      div.style.backgroundColor = "#c8e6c9"; // completed task
      div.querySelector(".complete-btn").remove();
      saveTasks();
    });

    // Clear form and hide popup
    titleInput.value = "";
    descInput.value = "";
    dateInput.value = "";
    popupoverlay.style.display = "none";
    popupbox.style.display = "none";

    saveTasks();
  }
});

// Reminder for today’s tasks
function checkForTodayTasks() {
  const today = new Date().toISOString().split("T")[0];
  const tasks = document.querySelectorAll(".task-container");
  let alertShown = false;

  tasks.forEach((task) => {
    if (task.innerHTML.includes(today) && !task.style.backgroundColor.includes("c8e6c9")) {
      if (!alertShown) {
        alert("Reminder: You have tasks due today!");
        alertShown = true;
      }
    }
  });
}
