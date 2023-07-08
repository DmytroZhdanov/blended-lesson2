import { Component } from "react";
import { nanoid } from "nanoid";
import { Grid, GridItem, SearchForm, Text, Todo } from "components";

export class Todos extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      this.setState({
        todos,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  handleSubmit = (data) => {
    this.addTodo(data);
  };

  addTodo = (text) => {
    const todo = {
      id: nanoid(),
      text,
    };

    this.setState((prevState) => ({
      todos: [...prevState.todos, todo],
    }));
  };

  deleteTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id),
    }));
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {todos.length === 0 && (
          <Text textAlign="center">There are no any todos ... </Text>
        )}
        <Grid>
          {todos.length > 0 &&
            todos.map((todo, index) => (
              <GridItem key={todo.id}>
                <Todo
                  id={todo.id}
                  counter={index + 1}
                  text={todo.text}
                  onClick={this.deleteTodo}
                />
              </GridItem>
            ))}
        </Grid>
      </>
    );
  }
}

//EditForm