import express from "express";
import { getDepartData, saveDepartData, savePoliceStationData, updatePoliceStationDataToDepart } from "../Controller/departmentDataController.js";
import multer from "multer";
import path from "path";
const router = express.Router();
const storage = multer.diskStorage(
    {
        destination:'./src/Images',
        filename:(req,file,cb)=>{
            return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
    }
)
router.use(express.static('src/Images'));
const upload = multer({storage:storage});
router.post("/department",saveDepartData);
router.post("/savepolicestation",upload.single('image'),savePoliceStationData);
router.put("/updatedepart/policestation/:id/:obj",updatePoliceStationDataToDepart);
router.get("/",getDepartData);

export default router;