import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteJob } from "../controllers/job.controller.js";  
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.delete("/:id",isAuthenticated, deleteJob);

// only admin should delete


export default router;

