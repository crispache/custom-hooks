
import { useReducer, useEffect } from "react";
import { todoReducer } from '../08-useReducer/todoReducer'


const init = () => {
    return JSON.parse( localStorage.getItem('todos') ) || []
}
  

export const useTodo = ( initialState = [] ) => {
  
    const [todos, dispatch] = useReducer(todoReducer, initialState, init );

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
      }, [todos])


    const handleNewTodo = ( todo ) => {
        const action = {
          type: 'CREATE',
          payload: todo,
        };
        dispatch( action );
    };


    const handleDeleteTodo = ( id ) => {
      dispatch( {
        type: 'DELETE',
        payload: id,
      })
    }


    const handleToggleTodo = ( id ) => {
      dispatch( {
        type: 'TOGGLE',
        payload: id,
      })
    }

    return {
        todos,
        todosCounter: todos.length,
        pendingTodosCount: todos.filter(todos => !todos.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    };
};
