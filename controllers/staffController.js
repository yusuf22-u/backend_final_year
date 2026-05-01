import { createStaffService } from "../services/staffServices.js";
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