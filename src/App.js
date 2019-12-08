import React, { Component } from "react";

import List from "./List";
import Input from "./Input";
import Title from "./Title";
import { VisibilityFilters } from "./constants";
import Footer from "./Footer";

export default class App extends Component {
  key = 0;
  state = {
    todos: [
      { text: "eat", id: this.key++, completed: false },
      { text: "drink", id: this.key++, completed: false },
      { text: "be merry", id: this.key++, completed: false }
    ],
    visibilityFilter: VisibilityFilters.SHOW_ALL
  };

  onAddTodo = text => {
    const { todos } = this.state;

    this.setState({
      ...this.state,
      todos: [{ text, id: this.key++, completed: false }, ...todos]
    });
  };

  onUpdateVisibilityFilter = visibility => {
    console.log("new visibility: " + visibility);
    this.setState({
      ...this.state,
      visibilityFilter: visibility
    });
  };

  onToggleTodo = index => {
    const { todos } = this.state;

    console.log("toggle " + index);

    this.setState({
      todos: todos.map((todo, i) => {
        if (todo.id === index) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    });
  };

  onRemoveTodo = index => {
    const { todos } = this.state;
  };

  render() {
    const { todos, visibilityFilter } = this.state;
    const activeTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    let visibleTodos = todos;
    if (visibilityFilter === VisibilityFilters.SHOW_ACTIVE) {
      visibleTodos = todos.filter(todo => !todo.completed);
    } else if (visibilityFilter === VisibilityFilters.SHOW_COMPLETED) {
      visibleTodos = todos.filter(todo => todo.completed);
    }

    return (
      <div style={styles.container}>
        <Title>To-Do List</Title>
        <Input
          placeholder={"Type a todo, then hit enter!"}
          onSubmitEditing={this.onAddTodo}
        />
        <List list={visibleTodos} onToggleTodo={this.onToggleTodo} />
        <Footer
          currentFilter={this.state.visibilityFilter}
          onUpdateVisibilityFilter={this.onUpdateVisibilityFilter}
        />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  }
};
