import * as repo from "../repositories/staffRepository.js";

export const getStaffService = ()=> repo.getAllStaff();
export const getSingleStaffService = (id)=> repo.getStaffById(id);
export const createStaffService = (data)=> repo.createStaff(data);
export const updateStaffService = (id,data)=> repo.updateStaff(id,data);
export const deleteStaffService = (id)=> repo.deleteStaff(id);