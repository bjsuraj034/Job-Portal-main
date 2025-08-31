import multer from "multer";
import path from "path";
import fs from "fs";

// Function to ensure directory exists
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Configure storage for different file types
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath;
        
        // Determine destination based on fieldname or file type
        if (file.fieldname === 'profilePhoto' || (file.mimetype.startsWith('image/') && req.path.includes('user'))) {
            uploadPath = 'uploads/profile-images';
        } else if (file.fieldname === 'resume' || file.mimetype === 'application/pdf') {
            uploadPath = 'uploads/resumes';
        } else if (file.fieldname === 'logo' || (file.mimetype.startsWith('image/') && req.path.includes('company'))) {
            uploadPath = 'uploads/company-logos';
        } else {
            uploadPath = 'uploads';
        }
        
        // Ensure the directory exists
        ensureDirectoryExists(uploadPath);
        
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to accept only PDFs and images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF and image files are allowed!'), false);
    }
};

export const singleUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
}).single("file");