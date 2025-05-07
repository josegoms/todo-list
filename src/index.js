import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { openProjectDialog, openTodoDialog } from "./dialogHandler.js";
import { renderProjects, createTodoElement, openTodoDetails } from "./display.js";

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
            const project = projects[index];
            openProjectDialog({
                projectToEdit: projects[index],
                onSubmit: ({name, description}) => {
                    project.name = name;
                    project.description = description;
                    displayAllProjects();
                    displayWorkspace(project);
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

    if (!project) {
        return;
    }

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

    //Edit todo event listener
    todosContainer.querySelectorAll(".edit-todo").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const index = btn.dataset.index;
            openTodoDialog({
                todoToEdit: project.todos[index],
                onSubmit: ({ title, description, priority, dueDate }) => {
                    const todo = project.todos[index];
                    todo.title = title;
                    todo.description = description;
                    todo.priority = priority;
                    todo.dueDate = dueDate;
                    displayWorkspace(project);
                }
            });
        });
    });

    //Remove todo event listener
    todosContainer.querySelectorAll(".remove-todo").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const index = btn.dataset.index;
            project.removeTodo(index);
            displayWorkspace(project);
            displayAllProjects();
        });
    });

    //Open details event listener
    todosContainer.querySelectorAll(".todo-content").forEach((element) => {
        element.addEventListener("click", () => {
            const index = element.parentNode.dataset.index;
            openTodoDetails(project.todos[index]);
        });
    });

    //Create todo event listener
    addButton.addEventListener("click", () => {
        openTodoDialog({
            onSubmit: ({title, description, dueDate, priority}) => {
                const newTodo = new Todo(title, description, dueDate, priority);
                project.addTodo(newTodo);
                displayWorkspace(project);
                displayAllProjects();
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