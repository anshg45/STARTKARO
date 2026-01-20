import multer from "multer";
import path from "path";

// Set Storage Engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx|ppt|pptx/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype) || 
                   file.mimetype === "application/pdf" ||
                   file.mimetype === "application/msword" ||
                   file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                   file.mimetype === "application/vnd.ms-powerpoint" ||
                   file.mimetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation";

  if (extname) { // Focusing mainly on extension as mimetype can vary
    return cb(null, true);
  } else {
    cb("Error: Images & Docs Only!");
  }
}

export default upload;
