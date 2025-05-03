export function displayProjects(projects) {
    const container = document.querySelector("#projects-container");
    container.innerHTML = "";

    projects.forEach((project) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.dataset.idName = project.name;
        
        const projectName = document.createElement("h2");
        projectName.textContent = project.name;
        projectDiv.appendChild(projectName);

        const projectDescription = document.createElement("p");
        projectDescription.textContent = project.description;
        projectDiv.appendChild(projectDescription);

        const projectTodos = document.createElement("p");
        projectTodos.textContent = `${project.todos.length} todos`;
        projectDiv.appendChild(projectTodos);

        projectDiv.addEventListener("click", (event) => {

            const clickedProject = event.currentTarget;
            const clickedName = clickedProject.dataset.idName;
            console.log(event.target);

            const matchingProject = projects.find((project) => project.name === clickedName);
            console.log(matchingProject);

            if(matchingProject) {
                changeProjects(matchingProject);
            }
        });

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