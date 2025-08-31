import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { setAllAdminJobs } from '@/redux/jobSlice'

// shadcn dialog components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/v1/job/${selectedJobId}`, { withCredentials: true });
            if (res.data.success) {
                toast.success("Job deleted successfully");
                const updated = allAdminJobs.filter(job => job._id !== selectedJobId);
                dispatch(setAllAdminJobs(updated));
            }
        } catch (error) {
            toast.error("Failed to delete job");
            console.log(error);
        } finally {
            setOpenDialog(false);
            setSelectedJobId(null);
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id}>
                            <TableCell>{job?.company?.name}</TableCell>
                            <TableCell>{job?.title}</TableCell>
                            <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className="w-36">
                                        <div 
                                            onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                            className="flex items-center gap-2 w-fit cursor-pointer"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>
                                        <div 
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                            className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                                        >
                                            <Eye className="w-4"/>
                                            <span>Applicants</span>
                                        </div>
                                        <div 
                                            onClick={() => {
                                                setSelectedJobId(job._id);
                                                setOpenDialog(true);
                                            }} 
                                            className="flex items-center w-fit gap-2 cursor-pointer mt-2 text-red-600"
                                        >
                                            <Trash2 className="w-4"/>
                                            <span>Delete</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this job? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AdminJobsTable
 