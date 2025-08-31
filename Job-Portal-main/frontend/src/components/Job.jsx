import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSavedJob, removeSavedJob } from '@/redux/jobSlice';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // get savedJobs from redux
    const { savedJobs = [] } = useSelector(state => state.job);
    const isSaved = savedJobs.some(savedJob => savedJob._id === job._id);

    // toggle save / remove
    const handleSaveToggle = () => {
        if (isSaved) {
            dispatch(removeSavedJob(job));
        } else {
            dispatch(addSavedJob(job));
        }
    };

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const diff = new Date() - createdAt;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button 
                    variant="outline" 
                    className="rounded-full" 
                    size="icon" 
                    onClick={handleSaveToggle}
                    title={isSaved ? "Remove from saved" : "Save for later"}
                >
                    <Bookmark color={isSaved ? "#7209b7" : "black"} />
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button 
                    onClick={handleSaveToggle} 
                    className={isSaved ? "bg-red-500 text-white" : "bg-[#7209b7] text-white"}
                >
                    {isSaved ? "Remove Saved" : "Save For Later"}
                </Button>
            </div>
        </div>
    );
};

export default Job;
