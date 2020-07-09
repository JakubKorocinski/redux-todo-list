import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
  } from './actions'
import { initialState } from './state';

import { combineReducers } from 'redux';


function todos(state = [], action) {
    switch (action.type) {
      case ADD_TODO:
        return [
          ...state,
          {
            text: action.text,
            completed: false
          }
        ];
      case TOGGLE_TODO:
        return state.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            });
          }
          return todo;
        });
      default:
        return state;
    }
  }

function visibilityFilter(state = initialState, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

function todoAppV1(state = {} , action) {
    return {
      // tslint:disable-next-line:no-string-literal
      visibilityFilter: visibilityFilter(state['visibilityFilter'], action),
      // tslint:disable-next-line:no-string-literal
      todos: todos(state['todos'], action)
    };
}

/**
 * Note that each of these reducers is managing its own part of the global state.
 * The state parameter is different for every reducer, and corresponds to the part of the state it manages.
 *
 * When the app is larger, we can split the reducers into separate files
 * and keep them completely independent and managing different data domains.
 */


 /**
  * Finally, Redux provides a utility called combineReducers() that does the same boilerplate logic
  * that the todoApp above currently does. With its help, we can rewrite todoApp like this:
  */

const todoApp = combineReducers({
    visibilityFilter,
    todos
});

export default todoApp;

/**
 * All combineReducers() does is generate a function that calls your reducers with the slices of state selected according to their keys,
 * and combines their results into a single object again. It's not magic. And like other reducers, combineReducers()
 * does not create a new object if all of the reducers provided to it do not change state.
 */
