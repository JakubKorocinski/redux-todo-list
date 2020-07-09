/** STORE
 * In the previous sections, we defined the actions that represent the facts about “what happened”
 * and the reducers that update the state according to those actions.
 *
 * The Store is the object that brings them together. The store has the following responsibilities:
 *  Holds application state;
 *  Allows access to state via getState();
 *  Allows state to be updated via dispatch(action);
 *  Registers listeners via subscribe(listener);
 *  Handles unregistering of listeners via the function returned by subscribe(listener).
 *
 * It's important to note that you'll only have a single store in a Redux application.
 * When you want to split your data handling logic, you'll use reducer composition instead of many stores.
 */

 /** CREATING A STORE
  * To easily create a store we use createStore(...) function from Redux core library
  * You can pass an ibject describing a reducer and as a second optional argument you can pass an initial state
  */

import { createStore } from 'redux'
import todoApp from './reducers_compose';
import { initialState } from './state';

export const store = createStore(todoApp, initialState); // Here you can also use as an initial state a request from the backend.
