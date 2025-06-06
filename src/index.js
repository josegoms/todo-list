import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { openProjectDialog, openTodoDialog } from "./dialogHandler.js";
import { renderProjects, createTodoElement, openTodoDetails, getLocalTodayString } from "./display.js";

//Keep projects
let projects = loadFromLocalStorage();

//Save data to local storage
function saveToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

//Retrieve data from local storage
function loadFromLocalStorage() {
    const loadedProjects = [];
    const storedUserData = localStorage.getItem("projects");

    //Check if there's data available
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        //Loop over projects array and recreate projects class and todos class
        userData.forEach((project) => {

            //Save retrieved todos
            const savedTodos = project.todos;

            //Recreate project class
            const recreatedProject = new Project(project.name, project.description);

            if (savedTodos) {
                savedTodos.forEach((todo) => {

                    //Recreate todo class
                    const recreatedTodo = new Todo(todo.title, todo.description, todo.dueDate, todo.priority);
                    recreatedTodo.done = todo.done;

                    //Append to the respective project
                    recreatedProject.addTodo(recreatedTodo);
                });
            } else {
                return [];
            }
            loadedProjects.push(recreatedProject);
        });   
    } else {
        return [];
    }

    return loadedProjects;
}

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
                    saveToLocalStorage();
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
            saveToLocalStorage();
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

function renderTodos(todos, workspaceCallback) {

    //Create fragment
    const fragment = document.createDocumentFragment();

    //Loop over todos
    todos.forEach((todo, index) => {
        const todoElement = createTodoElement(todo, index);
        fragment.appendChild(todoElement);
    });

    //Edit todo event listener
    fragment.querySelectorAll(".edit-todo").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const index = btn.dataset.index;
            openTodoDialog({
                todoToEdit: todos[index],
                onSubmit: ({ title, description, priority, dueDate }) => {
                    const todo = todos[index];
                    todo.title = title;
                    todo.description = description;
                    todo.priority = priority;
                    todo.dueDate = dueDate;
                    saveToLocalStorage();
                    workspaceCallback();
                }
            });
        });
    });

    //Remove todo event listener
    fragment.querySelectorAll(".remove-todo").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const index = btn.dataset.index;
            todos.splice(index, 1);
            saveToLocalStorage();
            workspaceCallback();
            displayAllProjects();
        });
    });

    //Open details event listener
    fragment.querySelectorAll(".todo-content").forEach((element) => {
        element.addEventListener("click", () => {
            const index = element.parentNode.dataset.index;
            openTodoDetails(todos[index]);
        });
    });

    fragment.querySelectorAll(".done-toggle").forEach((element) => {
        element.addEventListener("click", () => {
            const todoItem = element.closest(".todo");
            const index = todoItem.dataset.index;
            const todo = todos[index];
            todo.toggleDone();

            const contentElements = todoItem.querySelectorAll(".todo-content *");
            if (todo.done === true) {
                element.classList.add("done");
                contentElements.forEach((el) => el.classList.add("done"));
            } else {
                element.classList.remove("done");
                contentElements.forEach((el) => el.classList.remove("done"));
            }
            saveToLocalStorage();
        });
    });

    fragment.querySelectorAll(".todo").forEach((element) => {
        element.addEventListener("DOMContentLoaded", () => {
            const index = element.dataset.index;
            const todo = todos[index];

            const contentElements = element.querySelectorAll(".todo-content *");
            if (todo.done === true) {
                element.classList.add("done");
                contentElements.forEach((el) => el.classList.add("done"));
            } else {
                element.classList.remove("done");
                contentElements.forEach((el) => el.classList.remove("done"));
            }
        });
    });

    return fragment;
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

    //Create todo event listener
    addButton.addEventListener("click", () => {
        openTodoDialog({
            onSubmit: ({title, description, dueDate, priority}) => {
                const newTodo = new Todo(title, description, dueDate, priority);
                project.addTodo(newTodo);
                saveToLocalStorage();
                displayWorkspace(project);
                displayAllProjects();
            }
        });
    });

    //Create todos container
    const todosContainer = document.createElement("div");
    todosContainer.classList.add("todos-container");

    //Get done todos
    const workspaceCallback = () => displayWorkspace(project);
    const doneTodos = renderTodos(project.todos, workspaceCallback);

    todosContainer.appendChild(doneTodos);
    container.appendChild(todosContainer);
}

//Create project button
const createProject = document.querySelector("#create-project");
createProject.addEventListener("click", () => {
    openProjectDialog({
        onSubmit: ({name, description}) => {
            const newProject = new Project(name, description);
            projects.push(newProject);
            saveToLocalStorage();
            displayAllProjects();
        }
    });
});

function handleDefault(e) {

    //Group all todos
    let newTodos;
    if (e === "all") {
        newTodos = projects.flatMap((p) => p.todos);
    } else if (e === "today") {
        const today = getLocalTodayString();
        newTodos = projects.flatMap(p => p.todos).filter(todo => todo.dueDate === today);
    }

    //Select main container
    const container = document.querySelector("#workspace");
    container.innerHTML = "";

    //Create todos container
    const todosContainer = document.createElement("div");
    todosContainer.classList.add("todos-container");

    //Get done todos
    const workspaceCallback = () => handleDefault(e);
    const doneTodos = renderTodos(newTodos, workspaceCallback);

    todosContainer.appendChild(doneTodos);
    container.appendChild(todosContainer);
}

//All visualization
const all = document.querySelector("#all");
all.addEventListener("click", (event) => handleDefault(event.target.id));

const today = document.querySelector("#today");
today.addEventListener("click", (event) => handleDefault(event.target.id));

displayAllProjects();