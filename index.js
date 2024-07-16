import express from "express"
import multer from "multer";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('uploads'))
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/img')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
});

const upload = multer({ storage: storage });


app.post('/upload', upload.single('image'), (req, res) => {
  
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }
  
  res.send('File uploaded successfully.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
