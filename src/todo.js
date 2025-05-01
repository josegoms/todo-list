//Class to create todos with properties
export class Todo {
    //Constructor
    constructor(title, description, dueDate, priority, done = false) {
        //Properties
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;
    }

    //Toggle done
    toggleDone() {
        this.done = !this.done;
    }

    //Change priority
    changePriority(newPriority) {
        this.priority = newPriority;
    }
}