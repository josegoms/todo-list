//Deal with display projects on sidebar and append event listener to each one
export function displayProjects(projects, callback) {

    //Select container to append projects
    const container = document.querySelector("#projects-container");
    container.innerHTML = "";

    projects.forEach((project) => {

        //Create project main container
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.dataset.idName = project.name;

        //Create project elements div
        const contentDivisor = document.createElement("div");
        contentDivisor.classList.add("content-divisor");
        projectDiv.appendChild(contentDivisor);
        
        //Create project name element 
        const projectName = document.createElement("h2");
        projectName.textContent = project.name;
        contentDivisor.appendChild(projectName);

        //Create project description element
        const projectDescription = document.createElement("p");
        projectDescription.textContent = project.description;
        contentDivisor.appendChild(projectDescription);

        //Create project todos element
        const projectTodos = document.createElement("p");
        projectTodos.textContent = `${project.todos.length} todos`;
        contentDivisor.appendChild(projectTodos);

        //Create project icon div
        const iconDivisor = document.createElement("div");
        iconDivisor.classList.add("icon-divisor");
        projectDiv.appendChild(iconDivisor);

        //Create project remove button
        const projectRemove = document.createElement("button");
        projectRemove.classList.add("remove-project");
        projectRemove.title = "Remove";
        projectRemove.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>`;
        iconDivisor.appendChild(projectRemove);

        //Create project edit button
        const projectEdit = document.createElement("button");
        projectEdit.classList.add("edit-project");
        projectEdit.title = "Edit";
        projectEdit.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
              <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>`;
        iconDivisor.appendChild(projectEdit);

        //Add select project event listener
        projectDiv.addEventListener("click", (event) => {

            //Catch selected project
            const clickedProject = event.currentTarget;
            const clickedName = clickedProject.dataset.idName;

            //Call display function
            changeProjects(clickedName, projects);
        });

        //Add remove project event listener
        projectRemove.addEventListener("click", (event) => deleteProject(event, projects));

        //Add edit project event listener
        projectEdit.addEventListener("click", (event) => {

            //Catch selected project
            const clickedProject = event.currentTarget;
            const clickedName = clickedProject.parentNode.parentNode.dataset.idName;

            //Check selected project with all projects, and find its index
            const matchingProjectIndex = projects.findIndex((project) => project.name === clickedName);

            //Call callback
            if (typeof callback === "function") {
                callback(matchingProjectIndex);
              }
        });

        //Append project to container
        container.appendChild(projectDiv);
    });
}

//Handle display project on right-side
export function changeProjects(eventData, projectsAll) {

    //Check selected project with all projects
    const matchingProject = projectsAll.find((project) => project.name === eventData);

    //Clear right-side
    const todos = document.querySelector("#display-todos");
    todos.innerHTML = "";
    
    //Check if selected project exists
    if (!matchingProject) {
        return;
    }

    //Display selected project name
    const projectTitle = document.createElement("h1");
    projectTitle.textContent = matchingProject.name;
    todos.appendChild(projectTitle);

    //Display selected project description
    const projectDescription = document.createElement("p");
    projectDescription.textContent = matchingProject.description;
    todos.appendChild(projectDescription);
}

function deleteProject(eventData, projectsAll) {

    //Catch selected project
    const clickedProject = eventData.currentTarget;
    const clickedName = clickedProject.parentNode.parentNode.dataset.idName;

    //Check selected project with all projects, and find its index
    const matchingProjectIndex = projectsAll.findIndex((project) => project.name === clickedName);

    //Remove project
    projectsAll.splice(matchingProjectIndex, 1);

    //Call function that handles display to renew projects
    displayProjects(projectsAll);
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