import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) {
      setError("Please select a job category or enter a search term!");
      return;
    }

    setError("");
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-6 my-12'>

        {/* Modern Tagline */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className='mx-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white font-semibold shadow-md'
        >
          Desh ma basera desh ko lagi kam gara!
        </motion.div>

        <h1 className='text-5xl font-bold'>
          Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
        </h1>

        <p className='text-gray-600 max-w-2xl mx-auto'>
          Nepal ko har yuwako lagi digital rojgar platform.
       🚀
        </p>

        {/* Search Box */}
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-white'>
          <input
            type="text"
            placeholder='Find your dream jobs...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full'
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] hover:bg-[#5a2fa5]">
            <Search className='h-5 w-5' />
          </Button>
        </div>

        {/* Error Popup */}
        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-red-500 text-sm mt-2 animate-pulse'
          >
            {error}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
