import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
  } from './actions';

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

/**
 *  MAIN REDUCER V1
 */
function todoAppV1(state = initialState, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
            visibilityFilter: action.filter
            });
        case ADD_TODO:
            return Object.assign({}, state, {
            todos: [
                ...state.todos,
                {
                text: action.text,
                completed: false
                }
            ]
            });
        /**
         * Because we want to update a specific item in the array without resorting to mutations,
         * we have to create a new array with the same items except the item at the index.
         * If you find yourself often writing such operations, it's a good idea to use a helper
         * like immutability-helper, updeep, or even a library like Immutable that has native support for deep updates.
         * Just remember to never assign to anything inside the state unless you clone it first.
         */
        case TOGGLE_TODO:
            return Object.assign({}, state, {
              todos: state.todos.map((todo, index) => {
                if (index === action.index) {
                  return Object.assign({}, todo, {
                    completed: !todo.completed
                  });
                }
                return todo;
              })
            });
      default:
        return state;
    }
}


/**
 *  MAIN REDUCER V2 - with reducers compositions
 *
 * Is there a way to make it easier to comprehend? It seems like todos V1 and visibilityFilter are updated completely independently.
 * Sometimes state fields depend on one another and more consideration is required, but in our case we can easily split
 * updating todos into a separate function:
 */

function todos(state = [], action) { // Działa nad gałęzi drzewa, która jest reprezentowana jako tabela
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

function todoAppV2(state = initialState, action) { // Główny reduktor
    switch (action.type) {
      case SET_VISIBILITY_FILTER:
        return Object.assign({}, state, {
          visibilityFilter: action.filter
        });
      case ADD_TODO:
        return Object.assign({}, state, {
          todos: todos(state.todos, action)
        });
      case TOGGLE_TODO:
        return Object.assign({}, state, {
          todos: todos(state.todos, action)
        });
      default:
        return state;
    }
}


/**
 * REDUCER COMPOSITION
 *
 * Note that todos also accepts state—but state is an array! Now todoApp gives todos just a slice of the state to manage,
 * and todos knows how to update just that slice. This is called REDUCER COMPOSITION,
 * and it's the fundamental pattern of building Redux apps.
 */


 /**
  * REDUCER COMPOSITION - Next Step - splitting independent reducers
  */

function visibilityFilter(state = initialState, action) {
    switch (action.type) {
      case SET_VISIBILITY_FILTER:
        return action.filter;
      default:
        return state;
    }
}

/**
 * GOTO reducers_compose.ts
 */

