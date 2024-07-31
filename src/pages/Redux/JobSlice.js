import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobId: null,
  },
  reducers: {
    setJobId: (state, action) => {
      state.jobId = action.payload;
    },
    selectJobId: (state) => state.jobId,
  },
});

export const { setJobId, selectJobId } = jobSlice.actions;
export default jobSlice.reducer;
