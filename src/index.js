import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { displayProjects, changeProjects } from "./display.js";

//Keep projects
const projects = [];

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
        if (name !== "" && description !== "") {
            const newProject = new Project(name, description);
            projects.push({ name: newProject.name, description: newProject.description, todos: [] });
            displayProjects(projects);
        }

        //Reset forms
        formsData.reset();
    });

    //Cancel dialog
    const cancel = document.querySelector(".cancel");
    cancel.addEventListener("click", () => {
        dialog.close();
    });
});


changeProjects();