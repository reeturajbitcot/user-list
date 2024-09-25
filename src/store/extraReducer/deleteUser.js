export const handleDeleteUserPending = (state) => {
  state.isLoading = true;
};
export const handleDeleteUserFulfilled = (state) => {
  state.isLoading = false;
};

export const handleDeleteUserRejected = (state) => {
  state.isLoading = false;
};
