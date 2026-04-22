import * as service from "../services/staffServices.js";

export const getStaff = async(req,res)=>{
 try{
   const data = await service.getStaffService();
   res.json({success:true,data});
 }catch(error){
   res.status(500).json({message:error.message});
 }
};

export const getStaffById = async(req,res)=>{
 try{
   const data = await service.getSingleStaffService(req.params.id);
   res.json(data);
 }catch(error){
   res.status(500).json({message:error.message});
 }
};

export const createStaff = async(req,res)=>{
 try{
   await service.createStaffService(req.body);
   res.status(201).json({message:"Staff added"});
 }catch(error){
   res.status(500).json({message:error.message});
 }
};

export const updateStaff = async(req,res)=>{
 try{
   await service.updateStaffService(req.params.id, req.body);
   res.json({message:"Updated"});
 }catch(error){
   res.status(500).json({message:error.message});
 }
};

export const removeStaff = async(req,res)=>{
 try{
   await service.deleteStaffService(req.params.id);
   res.json({message:"Deleted"});
 }catch(error){
   res.status(500).json({message:error.message});
 }
};