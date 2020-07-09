import { Component, OnInit } from '@angular/core';

import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './redux/actions';

import {
  store
} from './redux/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'redux-todo-list';

  ngOnInit(): void {
    // Log the initial state
    console.log('INITIAL STATE: ', store.getState());

    // Every time the state changes, log it
    // Note that subscribe() returns a function for unregistering the listener
    const unsubscribe = store.subscribe(() => console.log(store.getState()));

    // Dispatch some actions
    store.dispatch(addTodo('Learn about actions'));
    store.dispatch(addTodo('Learn about reducers'));
    store.dispatch(addTodo('Learn about store'));
    store.dispatch(toggleTodo(0));
    store.dispatch(toggleTodo(1));
    store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

    // Stop listening to state updates
    unsubscribe();
  }
}

/**
 * Final notes:
 * We specified the behavior of our app before we even started writing the UI.
 * We won't do this in this tutorial, but at this point you can write tests for your reducers and action creators.
 * You won't need to mock anything because they are just pure functions. Call them, and make assertions on what they return.
 */
