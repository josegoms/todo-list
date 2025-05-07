import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { openProjectDialog } from "./dialogHandler.js";
import { renderProjects, createTodoElement } from "./display.js";

//Keep projects
const projects = [];

function displayAllProjects() {
    //Select DOM container
    const container = document.querySelector("#projects-container");
    container.innerHTML = " ";

    //Get project elements and append them
    const allProjects = renderProjects(projects);
    container.appendChild(allProjects);

    //Attach event listener to edit buttons
    container.querySelectorAll(".edit-project").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            openProjectDialog({
                projectToEdit: projects[index],
                onSubmit: ({name, description}) => {
                    project.name = name;
                    project.description = description;
                    displayAllProjects();
                }
            });
        });
    });

    //Attach event listener to remove buttons
    container.querySelectorAll(".remove-project").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            projects.splice(index, 1);
            displayAllProjects();
        });
    });

    //Open project workspace
    container.querySelectorAll(".project").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            displayWorkspace(projects[index]);
        })
    });
}

function displayWorkspace(project) {

    //Select main container
    const container = document.querySelector("#workspace");
    container.innerHTML = "";

    //Project name
    const name = document.createElement("h2");
    name.textContent = project.name;
    container.appendChild(name);

    //Project description
    const description = document.createElement("p");
    description.textContent = project.description;
    container.appendChild(description);

    //Add new todo button
    const addButton = document.createElement("button");
    addButton.classList.add("add-todo");
    addButton.textContent = " + Add Todo";
    container.appendChild(addButton);

    //Create todos container
    const todosContainer = document.createElement("div");
    todosContainer.classList.add("todos-container");
    container.appendChild(todosContainer);

    //Loop over todos
    project.todos.forEach((todo, index) => {
        const todoElement = createTodoElement(todo, index);
        todosContainer.appendChild(todoElement);
    });

    todosContainer.querySelectorAll("edit-todo").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            openTodoDialog({
                todoToEdit: project.todos[index],
                onSubmit: ({title, description, dueDate, priority}) => {
                    const todo = project.todos[index];
                    todo.title = title;
                    todo.description = description;
                    todo.dueDate = dueDate;
                    todo.priority = priority;
                    displayWorkspace(project);
                }
            });
        });
    });

    todosContainer.querySelectorAll(".remove-todo").foreach((btn) => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            project.removeTodo(index);
            displayWorkspace(project);
        });
    });

    addButton.addEventListener("click", () => {
        openTodoDialog({
            onSubmit: ({title, description, dueDate, priority}) => {
                const newTodo = new Todo(title, description, dueDate, priority);
                project.addTodo(newTodo);
                displayWorkspace(project);
            }
        });
    });
}

//Create project button
const createProject = document.querySelector("#create-project");
createProject.addEventListener("click", () => {
    openProjectDialog({
        onSubmit: ({name, description}) => {
            const newProject = new Project(name, description);
            projects.push(newProject);
            displayAllProjects();
        }
    });
});

displayAllProjects();
/*//Create todo
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
}*/