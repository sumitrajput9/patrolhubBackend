import { StatusCodes } from "http-status-codes";
import { Department, policeStation } from "../Schema/DepartmentSchema.js";

export async function saveDepartData(req, res) {
    try {
        const data = new Department(req.body);
        const response = await data.save();
        res.status(StatusCodes.CREATED).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
    }
}

export async function getDepartData(req,res)
{
   try 
   {
     const response = await Department.find()
                        .populate({
                                path:"policestations"
                            })
         res.status(StatusCodes.OK).json(response);                       
    
   } 
   catch (error) 
   {
       console.log(error);
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
    
   }
}

export async function savePoliceStationData(req, res) {
    try {
        const image = `http://localhost:5800/${req.file.filename}`;
        console.log(image);
        req.body['image'] = image;
        const data = new policeStation(req.body);
        const response = await data.save();
        res.status(StatusCodes.CREATED).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();

    }
}

export async function updatePoliceStationDataToDepart(req, res) {
    try{
           await Department.findByIdAndUpdate(req.params.id,{$push:{policestations:req.params.obj}});
           res.status(StatusCodes.OK).json();

    }
    catch (error) 
    {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();

    }
}