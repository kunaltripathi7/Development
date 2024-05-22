"use strict";
// ts knows bout dom ele's -> doc is an obj.
// document.querySelector; actual obj created at runtime.
// htmlElement is generic having id for each type
// const mystery: unknown = "sfdf";
// const numsLength = (mystery as String).length; // type assertion
// can't perform operations on unknown
const btn = document.getElementById("btn"); // returns htmlElement, !-> don't care about this one.
// btn.addEventListener("click", () =>);
const input = document.getElementById("todoinput"); // cuz ts can't read html & know its an input ele
// (<HTMLInputElement>input).value; doesn't works in jsx
const form = document.querySelector("form"); // #/. returns a generic element
const list = document.getElementById("todolist");
const toDos = getToDos();
toDos.forEach(createTodo);
function getToDos() {
    const todo = localStorage.getItem("todos");
    if (todo === null)
        return [];
    return JSON.parse(todo);
}
function saveToDos() {
    localStorage.setItem("todos", JSON.stringify(toDos));
}
function handleSubmit(e) {
    // knows in context that e is a submitEvent
    e.preventDefault();
    const newToDo = {
        text: input.value,
        completed: false,
    };
    createTodo(newToDo);
    toDos.push(newToDo);
    saveToDos();
    input.value = "";
}
function createTodo(obj) {
    const newLi = document.createElement("LI");
    newLi.append(obj.text);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = obj.completed;
    checkbox.addEventListener("change", function () {
        obj.completed = checkbox.checked;
        saveToDos();
    });
    newLi.append(checkbox);
    list.append(newLi);
}
form.addEventListener("submit", handleSubmit);
