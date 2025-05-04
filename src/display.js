import { Project } from "./project.js";

export function displayProjects(projects) {
    const container = document.querySelector("#projects-container");
    container.innerHTML = "";

    projects.forEach((project) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.dataset.idName = project.name;

        const contentDivisor = document.createElement("div");
        contentDivisor.classList.add("content-divisor");
        projectDiv.appendChild(contentDivisor);
        
        const projectName = document.createElement("h2");
        projectName.textContent = project.name;
        contentDivisor.appendChild(projectName);

        const projectDescription = document.createElement("p");
        projectDescription.textContent = project.description;
        contentDivisor.appendChild(projectDescription);

        const projectTodos = document.createElement("p");
        projectTodos.textContent = `${project.todos.length} todos`;
        contentDivisor.appendChild(projectTodos);

        const iconDivisor = document.createElement("div");
        iconDivisor.classList.add("icon-divisor");
        projectDiv.appendChild(iconDivisor);

        const projectRemove = document.createElement("button");
        projectRemove.classList.add("remove-project");
        projectRemove.title = "Remove";
        projectRemove.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>`;
        iconDivisor.appendChild(projectRemove);

        const projectEdit = document.createElement("button");
        projectEdit.classList.add("edit-project");
        projectEdit.title = "Edit";
        projectEdit.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
              <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>`;
        iconDivisor.appendChild(projectEdit);

        projectDiv.addEventListener("click", (event) => {

            const clickedProject = event.currentTarget;
            const clickedName = clickedProject.dataset.idName;

            const matchingProject = projects.find((project) => project.name === clickedName);

            if(matchingProject) {
                changeProjects(matchingProject);
            }
        });

        projectRemove.addEventListener("click", (event) => {
            const clickedProject = event.currentTarget;
            const clickedName = clickedProject.parentNode.parentNode.dataset.idName;
            const matchingProjectIndex = projects.findIndex((project) => project.name === clickedName);
            projects.splice(matchingProjectIndex, 1);
            displayProjects(projects);
        });

        projectEdit.addEventListener("click", (event) => {
            const clickedProject = event.currentTarget;
            const clickedName = clickedProject.parentNode.parentNode.dataset.idName;
            const matchingProjectIndex = projects.findIndex((project) => project.name === clickedName);

            const dialog = document.querySelector("#project-form");
            dialog.showModal();

            const formsData = document.querySelector("#new-project");
            formsData.addEventListener("submit", (event) => {
                const formData = new FormData(event.target);
                const name = formData.get("project-name");
                const description = formData.get("project-description");
                console.log(matchingProjectIndex);
                projects[matchingProjectIndex].editProject(name, description);
                console.log(projects);
                displayProjects(projects);
            });
        })

        container.appendChild(projectDiv);
    });
}

export function changeProjects(selectedProject) {

    const todos = document.querySelector("#display-todos");
    todos.innerHTML = "";
    
    console.log(selectedProject);
    const projectTitle = document.createElement("h1");
    projectTitle.textContent = selectedProject.name;
    todos.appendChild(projectTitle);

    const projectDescription = document.createElement("p");
    projectDescription.textContent = selectedProject.description;
    todos.appendChild(projectDescription);
}





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