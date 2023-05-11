import status from '../models/statuscan.js';
import Candidate from '../models/candidate.js';


export async function  postStatusOnce  (req, res) {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
  
    try {
      let existingStatus = await status.findOne({ name });
      if (existingStatus) {
        return res.status(409).json({ error: "Status already exists" });
      }
  
      const newStatus = new status({ name });
      const savedStatus = await newStatus.save();
  
      res.status(201).json(savedStatus);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export async function getStatus (req, res)  {
    const { statusId } = req.params;
  
    if (!statusId) {
      return res.status(400).json({ error: "Status ID is required" });
    }
  
    try {
      const cans = await Candidate.find({ status: statusId }).populate("status");
      res.status(200).json(cans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };