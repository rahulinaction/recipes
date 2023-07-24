const createReducer = (initialState: any, handlers: any) => {
  const reducer = (state = initialState, action: any) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
  return reducer;
}
export default createReducer;