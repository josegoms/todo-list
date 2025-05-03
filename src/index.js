import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";

//Keep projects
const projects = [];

//Create todo
/*const addTodo = document.querySelector(".add-todo");
addTodo.addEventListener("click", (event) => {
    
    //Catch user input
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const dueDate = formData.get("dueDate");
    const priority = formData.get("priority");

    //Catch the project it's inside
    const projectName = document.querySelector("#display-todos > h1").textContent;

    //Create new todo and append to respective project
    const newTodo = new Todo(title, description, dueDate, priority);
    projectName.addTodo(newTodo);
});*/

//Create project
const createProject = document.querySelector("#create-project");
createProject.addEventListener("click", () => {

    //Call dialog
    const dialog = document.querySelector("#project-form");
    dialog.showModal();

    //Catch user input
    const formsData = document.querySelector("#new-project");
    formsData.addEventListener("submit", (event) => {
        
        //Catch user input
        const formData = new FormData(event.target);
        const name = formData.get("project-name");
        const description = formData.get("project-description");
        
        //Create new project and append to projects
        const newProject = new Project(name, description);
        projects.push(newProject);
    });

    //Cancel dialog
    const cancel = document.querySelector(".cancel");
    cancel.addEventListener("click", (event) => {
        dialog.close();
    });
});