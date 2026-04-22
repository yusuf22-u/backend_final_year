import {
  getBedsService,
  getBedService,
  createBedService,
  updateBedService,
  deleteBedService,
  assignBedService,
  releaseBedService,
  rescheduleBedService
} from "../services/bedService.js";

// Get all
export const getBeds = async (req, res) => {
  try {
    const beds = await getBedsService()
    res.json(beds);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one
export const getBed = async (req, res) => {
  try {
    const bed = await getBedService(req.params.id);
    res.json(bed);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createBed = async (req, res) => {
  try {
    const id = await createBedService(req.body);

    res.status(201).json({
      success: true,
      message: "Bed created successfully",
      data: { id }
    });
    console, log('success')
  } catch (error) {

    // Handle duplicate error from MySQL (backup safety)
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "Bed number already exists"
      });
    }

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update
export const updateBed = async (req, res) => {
  try {
    await updateBedService(req.params.id, req.body);
    res.json({ message: "Bed updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete
export const deleteBed = async (req, res) => {
  try {
    await deleteBedService(req.params.id);
    res.json({ message: "Bed deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// assign bed
export const assignBed = async (req, res) => {
  const { id } = req.params;
  const { patient_id, assigned_at } = req.body;

  console.log("params:", req.params);
  console.log("body:", req.body);

  try {
    await assignBedService(id, patient_id, assigned_at);

    res.json({ message: "Bed assigned successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Release
export const releaseBed = async (req, res) => {
  try {
    await releaseBedService(req.params.id);
    res.json({ message: "Bed released" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ready bed
export const reSchudelBed = async (req, res) => {
  try {
    await rescheduleBedService(req.params.id);

    res.json({ message: "Cleaning completed" });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};