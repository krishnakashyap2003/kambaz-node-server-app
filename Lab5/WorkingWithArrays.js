let todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
  { id: 123, title: "Task 123 - This will error on delete!", completed: false },
  { id: 1234, title: "Task 1234", completed: false }
];

export default function WorkingWithArrays(app) {

  const getTodos = (req, res) => {
    res.json(todos);
  };

  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false
    };
    todos.push(newTodo);
    res.json(todos);
  };

  const postNewTodo = (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  };

  const removeTodo = (req, res) => {
    const { id } = req.params;
    todos = todos.filter(t => t.id !== parseInt(id));
    res.json(todos);
  };

  const deleteTodo = (req, res) => {
    const { id } = req.params;

    if (parseInt(id) === 123) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }

    const index = todos.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }

    todos.splice(index, 1);
    res.sendStatus(200);
  };

  const updateTodo = (req, res) => {
    const { id } = req.params;

    const index = todos.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }

    todos[index] = { ...todos[index], ...req.body };
    res.sendStatus(200);
  };

  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/create", createNewTodo);
  app.get("/lab5/todos/:id/delete", removeTodo);   
  app.post("/lab5/todos", postNewTodo);
  app.delete("/lab5/todos/:id", deleteTodo);       
  app.put("/lab5/todos/:id", updateTodo);
}
