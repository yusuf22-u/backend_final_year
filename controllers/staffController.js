import { getStaffByUserIdRepo } from "../repositories/staffRepository.js";
import { createStaffService, getAllStaffService, getDoctorPatientsServices } from "../services/staffServices.js";

export const createStaff = async (req, res) => {
  try {
    const result = await createStaffService(req.body);

    res.status(201).json({
      message: "Staff created successfully",
      data: result
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllStaff = async (req,res) => {
  try {
    const result = await getAllStaffService()
    if (result.length < 0) {
      return res.status(404).json({ message: "no doctor found" })
    }
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: "server error" })
    console.error("server error", error)
  }
}
export const getDoctorPatient = async (req, res) => {
  try {
    const userId = req.user.userId;

    // convert user → staff
    const staff = await getStaffByUserIdRepo(userId);

    if (!staff) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const result = await getDoctorPatientsServices(staff.id);

    return res.status(200).json(result);

  } catch (error) {
    // return res.status(500).json({ message: "server error", error });
    console.error("serv",error)
  }
};