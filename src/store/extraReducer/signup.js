export const handleSignupPending = (state) => {
  state.isLoading = true;
};
export const handleSingupFulfilled = (state, action) => {
  state.isLoading = false;
};

export const handleSingupRejected = (state) => {
  state.isLoading = false;
};
