import Notice from "../models/Notice.js";

// Get all notices
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    return res.status(200).json({ success: true, notices });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to fetch notices" });
  }
};

// Get a single notice by ID
const getNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findById(id);
    if (!notice) {
      return res.status(404).json({ success: false, error: "Notice not found" });
    }
    return res.status(200).json({ success: true, notice });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to fetch notice" });
  }
};

// Add a new notice
const addNotice = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNotice = new Notice({ title, content });
    await newNotice.save();
    return res.status(200).json({ success: true, notice: newNotice });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to add notice" });
  }
};

// Delete a notice
const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotice = await Notice.findByIdAndDelete(id);
    if (!deletedNotice) {
      return res.status(404).json({ success: false, error: "Notice not found" });
    }
    return res.status(200).json({ success: true, notice: deletedNotice });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to delete notice" });
  }
};

export { getNotices, getNotice, addNotice, deleteNotice };
