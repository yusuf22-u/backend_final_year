import * as HistoryService from "../services/historyService.js";

export const createHistory = async (req, res) => {
  try {
    const id = await HistoryService.createHistory(req.body);
    res.status(201).json({ success: true, id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllHistory = async (req, res) => {
  try {
    const history = await HistoryService.getAllHistory();
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHistoryByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const history = await HistoryService.getHistoryByPatient(patientId);
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await HistoryService.updateHistory(id, req.body);
    res.status(200).json({ success: true, message: "History updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await HistoryService.deleteHistory(id);
    res.status(200).json({ success: true, message: "History deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};