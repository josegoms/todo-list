export function displayProjects(projects) {
    const container = document.querySelector("#projects-container");
    container.innerHTML = "";

    projects.forEach((project) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        
        const projectName = document.createElement("h2");
        projectName.textContent = project.name;
        projectDiv.appendChild(projectName);

        const projectDescription = document.createElement("p");
        projectDescription.textContent = project.description;
        projectDiv.appendChild(projectDescription);

        const projectTodos = document.createElement("p");
        projectTodos.textContent = `${project.todos.length} todos`;
        projectDiv.appendChild(projectTodos);

        container.appendChild(projectDiv);
    });
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