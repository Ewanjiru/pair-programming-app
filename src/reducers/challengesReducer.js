import initialState from './initialState';

const challengesReducer = (state = initialState.challenges, action) => {
  switch (action.type) {
    case 'GET_CHALLENGES':
      return action.payload;
    default:
      return state;
  }
};

export default challengesReducer;
