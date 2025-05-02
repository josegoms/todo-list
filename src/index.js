import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";


//Create todo
const addTodo = document.querySelector(".add-todo");
addTodo.addEventListener("click", (event) => {
    
    //Catch user input
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const dueDate = formData.get("dueDate");
    const priority = formData.get("priority");

    //Catch the project it's inside
    const projectName = document.querySelector("#display-todos > h1").textContent;

    //Create todo
    if (projectName !== "Today") {
        projectName.addTodo(new Todo(title, description, dueDate, priority));
    }
});

//Create project
const createProject = document.querySelector("#create-project");
createProject.addEventListener("click", (event) => {

    //Catch user input
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const description = formData.get("description");

    //Create new project
    new Project(name, description);

});