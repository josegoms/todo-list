import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { openProjectDialog } from "./dialogHandler.js";
import { displayProjects, changeProjects } from "./display.js";

//Keep projects
const projects = [];

//Edit project
const editCallback = (index) => {
    const projectToEdit = projects[index];
    openDialog(projectToEdit);
}

//Create project button
const createProject = document.querySelector("#create-project");
createProject.addEventListener("click", () => {
    openProjectDialog({
        onSubmit: ({name, description}) => {
            const newProject = new Project(name, description);
            projects.push(newProject);
            displayProjects(projects, editCallback);
        }
    });
});

//Create todo
const createTodo = document.querySelector(".create-task");
createTodo.addEventListener("click", (event) => {

    //Check selected project with all projects
    const clickedProject = event.currentTarget;
    const clickedName = clickedProject.parentNode.dataset.idName;
    const matchingProjectIndex = projects.findIndex((project) => project.name === clickedName);
    console.log(matchingProjectIndex);

    //Call task dialog function
    openTaskDialog(matchingProjectIndex);
});

function openTaskDialog(attachedProjectIndex) {

    //Open dialog
    const dialog = document.querySelector("#task-form");
    dialog.showModal();

    //Catch forms
    const formsData = document.queySelector("#new-task");

    //Collect submitted user data
    formsData.addEventListener("submit", (event) => {

        //Catch user input
        const formData = new FormData(event.target);
        const title = formData.get("task-name");
        const description = formData.get("task-description");
        const dueDate = formData.get("task-due-date");
        const priority = formData.get("task-priority");


        //Create new todo and append to respective project
        const newTodo = new Todo(title, description, dueDate, priority, false);
        projects[attachedProjectIndex].addTodo(newTodo);

        //Re-render, reset forms, and close
        displayProjects(projects, editCallback);
        formsData.reset();
        dialog.close();
        
    });

    //Cancel dialog
    const cancel = document.querySelector(".cancel");
    cancel.addEventListener("click", () => dialog.close());
}

displayProjects(projects, editCallback);