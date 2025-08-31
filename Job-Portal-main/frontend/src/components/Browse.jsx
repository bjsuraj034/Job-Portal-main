import React, { useEffect } from "react";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Navbar from "./shared/Navbar";

const Browse = () => {
  // If hook returns loading & error (Fix 2 version)
  const { loading, error } = useGetAllJobs() || {};
  // If hook doesn’t return anything (Fix 1 version), this won’t crash

  const dispatch = useDispatch();
  const { allJobs } = useSelector((state) => state.job);

  useEffect(() => {
    // Clear search query when leaving Browse page
    return () => dispatch(setSearchedQuery(""));
  }, [dispatch]);

  return (
    <div>
      <Navbar/>
    <div className="max-w-7xl mx-auto my-10 px-4">
      <h1 className="font-bold text-xl my-10">
        Search Results ({allJobs?.length || 0})
      </h1>

      {/* Loading state */}
      {/* {loading && (
        <p className="text-gray-500 text-center">Loading jobs...</p>
      )} */}

      {/* Error state */}
      {error && (
        <p className="text-red-500 text-center">
          Failed to fetch jobs. Please try again.
        </p>
      )}

      {/* Empty state */}
      {!loading && allJobs?.length === 0 && (
        <p className="text-gray-500 text-center">No jobs available</p>
      )}

      {/* Jobs grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allJobs?.map((job) => (
          <Job key={job._id} job={job} />
        ))}
      </div>
    </div>
</div>
  );
};

export default Browse;
