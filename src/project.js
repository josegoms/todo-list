//Class to create projects with properties
export class Project {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    getTodos() {
        return this.todos;
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
    }

    editProject(name, description) {
        this.name = name;
        this.description = description;
    }
}