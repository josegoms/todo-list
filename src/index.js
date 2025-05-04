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
            projects.push({
                name: newProject.name,
                description: newProject.description,
                todos: [],
            });
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