import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        savedJobs: [] // array to store saved jobs
    },
    reducers: {
        setAllJobs: (state, action) => { state.allJobs = action.payload; },
        setSingleJob: (state, action) => { state.singleJob = action.payload; },
        setAllAdminJobs: (state, action) => { state.allAdminJobs = action.payload; },
        setSearchJobByText: (state, action) => { state.searchJobByText = action.payload; },
        setAllAppliedJobs: (state, action) => { state.allAppliedJobs = action.payload; },
        setSearchedQuery: (state, action) => { state.searchedQuery = action.payload; },

        // Add a job to savedJobs
        addSavedJob: (state, action) => {
            const job = action.payload;
            if (!state.savedJobs.some(j => j._id === job._id)) {
                state.savedJobs.push(job);
            }
        },
        // Remove a job from savedJobs
        removeSavedJob: (state, action) => {
            const jobId = action.payload._id;
            state.savedJobs = state.savedJobs.filter(j => j._id !== jobId);
        }
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    addSavedJob,
    removeSavedJob
} = jobSlice.actions;

export default jobSlice.reducer;
