export const initialState = {
    visibilityFilter: 'SHOW_ALL', // first branch or sub-tree
    todos: [ // second branch or sub-tree
      {
        text: 'Consider using Redux',
        completed: true
      },
      {
        text: 'Keep all state in a single tree',
        completed: false
      }
    ]
  }