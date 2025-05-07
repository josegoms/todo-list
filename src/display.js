//Create project elements and buttons to manipulate them
export function createProjectElement(project, index) {

    //Create project main container
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.dataset.index = index;

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
    projectRemove.title = "Remove Project";
    projectRemove.dataset.index = index;
    projectRemove.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>`;
    iconDivisor.appendChild(projectRemove);

    //Create project edit button
    const projectEdit = document.createElement("button");
    projectEdit.classList.add("edit-project");
    projectEdit.title = "Edit Project";
    projectEdit.dataset.index = index;
    projectEdit.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
          <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>`;
    iconDivisor.appendChild(projectEdit);

    //Return done project div
    return projectDiv;
}

export function renderProjects(projects) {

    //Temporary container
    const fragment = document.createDocumentFragment();

    //Loop over all projects
    projects.forEach((project, index) => {
        const newProject = createProjectElement(project, index);
        fragment.appendChild(newProject);
    });

    return fragment;
}

//Create todos
export function createTodoElement(todo, index) {

    //Create todo main container
    const todosDiv = document.createElement("div");
    todosDiv.classList.add("todo");
    todosDiv.dataset.index = index;

    //Create todo title element
    const title = document.createElement("h3");
    title.textContent = todo.title;
    todosDiv.appendChild(title);

    //Create todo description element
    const description = document.createElement("p");
    description.textContent = todo.description;
    todosDiv.appendChild(description);

    //Create todo dueDate element
    const dueDate = document.createElement("p");
    dueDate.textContent = `Due: ${todo.dueDate}`;
    todosDiv.appendChild(dueDate);

    //Create todo priority element
    const priority = document.createElement("p");
    priority.textContent = `Priority: ${todo.priority}`;
    todosDiv.appendChild(priority);

    //Create todo status element
    const status = document.createElement("p");
    status.textContent = todo.done ? "Done!" : "Not Done.";
    todosDiv.appendChild(status);

    //Create todo edit button element
    const btnEdit = document.createElement("button");
    btnEdit.classList.add("edit-todo");
    btnEdit.title = "Edit Todo";
    btnEdit.dataset.index = index;
    btnEdit.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
      <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>`;
    todosDiv.appendChild(btnEdit);

    //Create todo remove button element
    const btnRemove = document.createElement("button");
    btnRemove.classList.add("remove-todo");
    btnRemove.title = "Remove Todo";
    btnRemove.dataset.index = index;
    btnRemove.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
    </svg>`;
    todosDiv.appendChild(btnRemove);

    return todosDiv;
}