import React from "react";

const Todo = () => {
    const [todos, setTodos] = React.useState([]);

    const [todo, setTodo] = React.useState("");
    const [detail, setDetail] = React.useState("");
   
    const [todoEditing, setTodoEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState("");
    
    const [editingDetails, setEditingDetails] = React.useState("");
    

    React.useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
            setTodos(loadedTodos);
        }
    }, []);

    React.useEffect(() => {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }, [todos]);

    function handleSubmit(e) {
        e.preventDefault();
        const newTodo = {
            id: new Date().getTime().toString(),
            text: todo,
            description: detail,
        };
        setTodos([...todos].concat(newTodo));
        setTodo("");
        setDetail("");
    }

    function deleteTodo(id) {
        let updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    function submitEdits(id) {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.text = editingText;
                todo.details = editingDetails
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
    }

    return (
        <div className="container-fluid">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setTodo(e.target.value)}
                        value={todo}
                    />
                </div>
                <div className="form-group">
                    <textarea className="form-control"
                        rows="3"
                        onChange={(e) => setDetail(e.target.value)}
                        value={detail}
                    ></textarea>

                </div>

                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo) => (
                <div key={todo.id} className="todo">
                    <div className="todo-text">
                        {todo.id === todoEditing ? (
                            <div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setEditingText(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control"
                                        rows="3"
                                        onChange={(e) => setEditingDetails(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        ) : (

                            <div>
                                <h3>{todo.text}</h3>
                                <p>{todo.description}</p>
                            </div>
                        )}
                    </div>
                    <div className="todo-actions">
                        {todo.id === todoEditing ? (
                            <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                        ) : (
                            <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                        )}

                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Todo;