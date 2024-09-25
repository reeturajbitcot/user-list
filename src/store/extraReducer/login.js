export const handleLoginPending = (state) => {
  state.isLoading = true;
};

export const handleLoginFulfilled = (state, action) => {
  const { employee, token } = action.payload;
  state.isLoading = false;
  state.isAuthenticated = true;
  state.user = employee;
  state.userToken = token;
};

export const handlLoginRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.error.message;
};
