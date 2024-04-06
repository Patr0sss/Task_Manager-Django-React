import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./App.module.css";
import ToDoBar from "./components/toDoBar/toDoBar";

type ToDo = {
  id: number;
  body: string;
  completed: boolean;
  updated: string;
  created: string;
  content: string;
};

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState<ToDo[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo");
      setTodos(response.data);
      // setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
      const newList = todos.filter((todo) => todo.id !== id);
      setTodos(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const [newTodo, setNewTodo] = useState({
    body: "",
  });

  const postTodo = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/todo/`,
        newTodo
      );
      const newTodoItem: ToDo = response.data;
      setNewTodo({ body: "" });
      setTodos((prevTodos) => [...prevTodos, newTodoItem]);
      fetchData();
      const newTaskValue = document.getElementById(
        "newTaskInput"
      ) as HTMLInputElement;
      newTaskValue.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompletedChange = async (id: number, completed: boolean) => {
    try {
      // Wywołaj odpowiednie zapytanie do API, aby zaktualizować wartość completed w bazie danych
      // Po zakończeniu zapytania, możesz zaktualizować stan lub wykonać inne działania w zależności od potrzeb
      await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, { completed });
      console.log(id + " KOMPLETED : " + completed);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDescriptionChange = async (id: number, content: string) => {
    try {
      // Wywołaj odpowiednie zapytanie do API, aby zaktualizować wartość description w bazie danych
      // Po zakończeniu zapytania, możesz zaktualizować stan lub wykonać inne działania w zależności od potrzeb
      await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, { content });
      console.log(id + " Content : " + content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.newTaskBar}>
        <input
          id="newTaskInput"
          placeholder="Add Another Task"
          className={styles.newTaskInput}
          onChange={(e) => {
            setNewTodo((prev) => ({
              ...prev,
              body: e.target.value,
            }));
          }}
        />
        <div className={styles.newTaskSubmit} onClick={postTodo}>
          Submit
        </div>
      </div>
      <div className={styles.todosTable}>
        {todos.map((todo, index) => (
          <ToDoBar
            key={todo.id}
            index={index + 1}
            id={todo.id}
            title={todo.body}
            completed={todo.completed}
            onDelete={handleDelete}
            content=""
            onCompletedChange={handleCompletedChange}
            onDescriptionChange={handleDescriptionChange}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
