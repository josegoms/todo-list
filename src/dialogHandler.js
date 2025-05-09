export function openProjectDialog({ projectToEdit = null, onSubmit }) {

    //Call dialog
    const dialog = document.querySelector("#project-form");
    dialog.showModal();

    //Select input areas
    const projectName = document.querySelector("#project-name");
    const projectDescription = document.querySelector("#project-description");
    const formsData = document.querySelector("#new-project");

    //Pre-fill form if editing
    if (projectToEdit) {
        projectName.value = projectToEdit.name;
        projectDescription.value = projectToEdit.description;
    } else {
        formsData.reset();
    }

    //Catch user input
    formsData.addEventListener("submit", handleSubmit);
        
    function handleSubmit(event) {
        event.preventDefault();
        
        //Catch every input values
        const formData = new FormData(event.target);
        const name = formData.get("project-name");
        const description = formData.get("project-description");
        
        //Call the callback with provided data
        onSubmit({ name, description });
        
        dialog.close();
        formsData.removeEventListener("submit", handleSubmit);
    };

    //Cancel button
    const cancel = dialog.querySelector(".cancel");
    const handleCancel = () => {
        dialog.close();
        formsData.removeEventListener("submit", handleSubmit);
        cancel.removeEventListener("click", handleCancel);
    };

    cancel.addEventListener("click", handleCancel);
}

export function openTodoDialog({ todoToEdit = null, onSubmit}) {

    //Call dialog
    const dialog = document.querySelector("#todo-form");
    dialog.showModal();

    //Select input areas
    const todoTitle = document.querySelector("#todo-name");
    const todoDescription = document.querySelector("#todo-description");
    const todoPriority = document.querySelector("#todo-priority");
    const todoDueDate = document.querySelector("#todo-due-date");
    const formsData = document.querySelector("#new-todo");

    //Pre-fill form if editing
    if (todoToEdit) {
        todoTitle.value = todoToEdit.title;
        todoDescription.value = todoToEdit.description;
        todoPriority.value = todoToEdit.priority;
        todoDueDate.value = todoToEdit.dueDate;
    } else {
        formsData.reset();
    }

    //Catch user input 
    const handleSubmit = (event) => {
        event.preventDefault();

        //Catch every input values
        const formData = new FormData(event.target);
        const title = formData.get("todo-name");
        const description = formData.get("todo-description");
        const priority = formData.get("todo-priority");
        const dueDate = formData.get("todo-due-date");

        //Call the callback with provided data
        onSubmit({ title, description, priority, dueDate });

        dialog.close();
        formsData.removeEventListener("submit", handleSubmit);
    }

    formsData.addEventListener("submit", handleSubmit);

    //Cancel button
    const cancel = dialog.querySelector(".cancel");
    const handleCancel = () => {
        dialog.close();
        formsData.removeEventListener("submit", handleSubmit);
        cancel.removeEventListener("click", handleCancel);
    };

    cancel.addEventListener("click", handleCancel);
}