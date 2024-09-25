export const handleFetchContentPending = (state) => {
  state.isLoading = true;
};

export const handleFetchContentFulfilled = (state, action) => {
  state.isLoading = false;
  state.contents = action.payload;
};

export const handleFetchContentRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.error.message;
};
