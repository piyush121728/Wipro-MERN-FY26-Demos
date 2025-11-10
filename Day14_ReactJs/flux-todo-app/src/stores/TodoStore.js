// TodoStore.js
import { EventEmitter } from "events";
import AppDispatcher from "../dispatcher/Dispatcher";

class TodoStore extends EventEmitter {
    constructor() {
        super();
        this.todos = [];

        // Register with Dispatcher
        AppDispatcher.register(this.handleActions.bind(this));
    }

    handleActions(action) {
        switch (action.type) {
            case "ADD_TODO":
                this.todos.push(action.payload);
                this.emit("change");
                break;
            default:
            // do nothing
        }
    }

    getAll() {
        return this.todos;
    }

    addChangeListener(callback) {
        this.on("change", callback);
    }

    removeChangeListener(callback) {
        this.removeListener("change", callback);
    }
}

const todoStore = new TodoStore();
export default todoStore;
