import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const keyword = searchedQuery || ""; // fallback to empty string
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${keyword}`, {
                    withCredentials: true
                });
                console.log(res.data)
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("Error fetching jobs:", error);
            }
        };
        fetchAllJobs();
    }, [searchedQuery, dispatch]); // added dependencies
};

export default useGetAllJobs;
