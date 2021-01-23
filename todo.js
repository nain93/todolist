const toDoForm = document.querySelector(".toDoForm"),
  toDoInput = document.querySelector("#toDoInput"),
  toDoFinList = document.querySelector(".finished"),
  jsPending = document.querySelector(".pending");

const TODO_LS = "PENDING";
const FIN_LS = "FINISHED";

let toDoArray = [];
let finishArray = [];

function savePendingTask(task) {
  toDoArray.push(task);
}

function findInFinished(taskId) {
  return finishArray.find(function (task) {
    return task.id === taskId;
  });
}

function findInPending(taskId) {
  return toDoArray.find(function (task) {
    return task.id === taskId;
  });
}

function removeFromPending(taskId) {
  toDoArray = toDoArray.filter(function (task) {
    return task.id !== taskId;
  });
}

function removeFromFinished(taskId) {
  finishArray = finishArray.filter(function (task) {
    return task.id !== taskId;
  });
}

function addToFinished(task) {
  finishArray.push(task);
}
function addToPending(task) {
  toDoArray.push(task);
}
function deleteToDo(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromFinished(li.id);
  removeFromPending(li.id);
  toDoSaveName();
}
function finishToDo(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  removeFromPending(li.id);
  addToFinished(task);
  finishList(task);
  toDoSaveName();
}
function handleBackClick(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id);
  removeFromFinished(li.id);
  addToPending(task);
  toDoGreeting(task);
  toDoSaveName();
}

function toDoGreeting(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  span.textContent = task.text;
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", deleteToDo);
  li.id = task.id;
  const checkBtn = document.createElement("button");
  jsPending.appendChild(li);
  li.append(span, deleteBtn, checkBtn);

  checkBtn.textContent = "✅";
  checkBtn.addEventListener("click", finishToDo);
}
function finishList(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  span.textContent = task.text;
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", deleteToDo);
  li.id = task.id;
  const backBtn = document.createElement("button");
  toDoFinList.append(li);
  li.append(span, deleteBtn, backBtn);

  backBtn.textContent = "⏪";
  backBtn.addEventListener("click", handleBackClick);
}
function toDoObjFn(text) {
  return {
    id: String(Date.now()),
    text,
  };
}
function toDoHandleSubmit(event) {
  event.preventDefault();
  const taskObj = toDoObjFn(toDoInput.value);
  toDoInput.value = "";
  toDoGreeting(taskObj);
  savePendingTask(taskObj);
  toDoSaveName();
}
function toDoSaveName() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDoArray));
  localStorage.setItem(FIN_LS, JSON.stringify(finishArray));
}
function loadToDoList() {
  toDoArray = JSON.parse(localStorage.getItem(TODO_LS)) || [];
  finishArray = JSON.parse(localStorage.getItem(FIN_LS)) || [];

  if (toDoArray) {
    toDoArray.forEach(function (toDo) {
      toDoGreeting(toDo);
    });
  }
  if (finishArray) {
    finishArray.forEach(function (toDo) {
      finishList(toDo);
    });
  }
}

function init() {
  toDoForm.addEventListener("submit", toDoHandleSubmit);
  loadToDoList();
}
init();
