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
        
        //Catch user input
        const formData = new FormData(event.target);
        const name = formData.get("project-name");
        const description = formData.get("project-description");
        
        //Call the callback with provided data
        onSubmit({ name, description });
        
        dialog.close();
        formsData.removeEventListener("submit", handleSubmit);
    };

    //Cancel dialog
    const cancel = document.querySelector(".cancel");
    cancel.addEventListener("click", () => dialog.close());
}