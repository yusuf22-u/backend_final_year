import {
 getAllBeds,
  getBedById,
  createBedModel,
  updateBed,
  deleteBed,
  assignBedRepo,
  releaseBedRepo,
  getBedByBedNumber,
  reSheduleBedRepo
} from "../repositories/bedRepository.js";

// Get all
export const getBedsService = async () => {
  return await getAllBeds();
  
};
// console.log("bed", getAllBeds())
// Get one
export const getBedService = async (id) => {
  const bed = await getBedById(id);
  if (!bed) throw new Error("Bed not found");
  return bed;
};

// Create
export const createBedService = async (data) => {
  const { bed_number, ward, status } = data;

  if (!bed_number || !ward) {
    throw new Error("Bed number and ward are required");
  }

  // Check if bed already exists
  const [existingBed] = await getBedByBedNumber(bed_number);

  if (existingBed.length > 0) {
    throw new Error("Bed already exists with that number");
  }

  return await createBedModel({ bed_number, ward, status });
};

// Update
export const updateBedService = async (id, data) => {
  const bed = await getBedById(id);
  if (!bed) throw new Error("Bed not found");

  await updateBed(id, data);
};

// Delete
export const deleteBedService = async (id) => {
  const bed = await getBedById(id);
  if (!bed) throw new Error("Bed not found");

  await deleteBed(id);
};

// Assign
export const assignBedService = async (bedId, patientId, assignedAt) => {
   await assignBedRepo(bedId, patientId, assignedAt);
};

// Release
export const releaseBedService = async (bedId) => {
  const bed = await getBedById(bedId);
  if (!bed) throw new Error("Bed not found");

  await releaseBedRepo(bedId);
};
// Ready bed
export const rescheduleBedService = async (bedId) => {
  const bed = await getBedById(bedId);

  if (!bed) throw new Error("Bed not found");

  await reSheduleBedRepo(bedId);
};