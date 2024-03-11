const express = require("express")
const app = express()
const mongoose = require("mongoose")

app.use(express.json())
const cors = require("cors")
app.use(cors())

// make file accessible
app.use("/files", express.static("files"))
const mongoURL = "mongodb+srv://kumarijaya:jaya123@cluster.iz0c4ne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
})
.then(() => {
   console.log("Connected to mongodb")
})
.catch((e) => console.log(e))

// multer

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  
require("./pdfDetails")
const PdfSchema = mongoose.model("PdfDetails")
const upload = multer({ storage: storage })


app.post("/upload-files", upload.single("file"), async(req, res) => {
    console.log(req.file)
    const title=req.body.title
    const fileType = req.body.fileType;
    const filename=req.file.filename
    try {
        await PdfSchema.create({ title: title, pdf: filename, fileType: fileType }); // Include fileType
        res.send({ status: "ok" });
    } catch(error) {
        res.status(500).json({ status: "error", message: error.message });
    }
})

app.get("/get-files", async(req,res) => {
    try{
        PdfSchema.find({}).then((data) => {
            res.send({status:"ok", data:data})
        })
    } catch(error){}
})
app.get("/", async(req, res) => {
    res.send("Success")
})

app.listen(8000, () => {
    console.log("Server connected")
})