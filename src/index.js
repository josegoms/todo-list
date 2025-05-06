import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { displayProjects, changeProjects } from "./display.js";

//Keep projects
const projects = [];

//Create project
const createProject = document.querySelector("#create-project");
createProject.addEventListener("click", () => openDialog());

//Handle dialog
function openDialog(projectToEdit = null) {
    //Call dialog
    const dialog = document.querySelector("#project-form");
    dialog.showModal();

    //Select input areas
    const projectName = document.querySelector("#project-name");
    const projectDescription = document.querySelector("#project-description");

    //Pre-fill form if editing
    if (projectToEdit) {
        projectName.value = projectToEdit.name;
        projectDescription.value = projectToEdit.description;
    } else {
        projectName.value = "";
        projectDescription.value = "";
    }

    //Catch user input
    const formsData = document.querySelector("#new-project");

    //Clear previous listener
    const newForm = formsData.cloneNode(true);
    formsData.replaceWith(newForm);

    newForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        //Catch user input
        const formData = new FormData(event.target);
        const name = formData.get("project-name");
        const description = formData.get("project-description");
        
        //Create new project and append to projects or edit existent one
        if (projectToEdit) {
            projectToEdit.name = name;
            projectToEdit.description = description;
        } else {
            const newProject = new Project(name, description);
            projects.push(newProject);
        }

        //Re-render, reset forms, and close
        displayProjects(projects, editCallback);
        changeProjects(name, projects);
        newForm.reset();
        dialog.close();
    });

    //Cancel dialog
    const cancel = document.querySelector(".cancel");
    cancel.addEventListener("click", () => dialog.close());
}


//Edit project
const editCallback = (index) => {
    const projectToEdit = projects[index];
    openDialog(projectToEdit);
}

displayProjects(projects, editCallback);

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
