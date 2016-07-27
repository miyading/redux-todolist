import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import Footer from './Footer'
import {addTodo, completeTodo, VisibilityFilters, setVisibilityFilter} from '../actions/acitons'

class App extends Component {
  render() {
    const {dispatch, visibilityFilter, visibilityTodos} = this.props;
    
    return (
      <div>
        <AddTodo onAddClick={text => {
          dispatch(addTodo(text))
        }}/>
        
        <TodoList todos={visibilityTodos}
                  onTodoClick={index => {
                    dispatch(completeTodo(index))
                  }}/>
        
        <Footer filter={visibilityFilter}
                onFilterChange={nextFilter => {
                  dispatch(setVisibilityFilter(nextFilter))
                }}/>
      </div>
    )
  }
}

App.propTypes = {
  visibilityTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
    ]
  ).isRequired
}

function selectTodos(todos, filter) {
  switch(filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(function(todo) {
        return todo.completed
      })
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(function(todo) {
        return !todo.completed
      })
  }
}

function select(state) {
  return {
    visibilityTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

export default connect(select)(App)