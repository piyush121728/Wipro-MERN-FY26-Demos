// TodoList.js
import React, { useEffect, useState } from "react";
import todoStore from "../stores/TodoStore";

function TodoList() {
    const [todos, setTodos] = useState(todoStore.getAll());

    useEffect(() => {
        const handleChange = () => {
            setTodos([...todoStore.getAll()]);
        };

        todoStore.addChangeListener(handleChange);
        return () => todoStore.removeChangeListener(handleChange);
    }, []);

    return (
        <ul>
            {todos.length === 0 && <p>No todos yet!</p>}
            {todos.map((todo, index) => (
                <li key={index}>{todo}</li>
            ))}
        </ul>
    );
}

export default TodoList;
