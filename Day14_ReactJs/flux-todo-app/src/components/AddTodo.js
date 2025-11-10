// AddTodo.js
import React, { useState } from "react";
import TodoActions from "../actions/TodoActions";

function AddTodo() {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            TodoActions.addTodo(text); // Dispatch action
            setText("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter todo..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodo;
