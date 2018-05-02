import initialState from './initialState';

const currentUserReducer = (state = initialState.currentUser, action) => {
  switch (action.type) {
    case 'ASSIGN_USERNAME':
      sessionStorage.setItem('currentUser', action.payload);
      return action.payload;
    default:
      return sessionStorage.currentUser || state;
  }
};

export default currentUserReducer;
