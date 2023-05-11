import Status from '../models/status.js';
import Job from '../models/job.js';


export async function  postStatusOnce  (req, res) {
    const { name, 
      isOpened } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
  
    try {
      let existingStatus = await Status.findOne({ name });
      if (existingStatus) {
        return res.status(409).json({ error: "Status already exists" });
      }
  
      const newStatus = new Status({ name, isOpened });
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
      const jobs = await Job.find({ jobStatus: statusId }).populate("jobStatus");
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export async function getStatusIdByName(req, res) {
    const { name } = req.params;
  
    try {
      const status = await Status.findOne({ name });
  
      if (!status) {
        return res.status(404).json({ error: "Status not found" });
      }
  
      res.status(200).json({ statusId: status._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

  // Assuming you have imported the necessary models and middleware

export async function updateJobStatus(req, res) {
  const { jobId,statusId } = req.params;
  // const {  } = req.body;

  try {
    const job = await Job.findById(jobId).populate("jobStatus");

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const newStatus = await Status.findById(statusId);

    if (!newStatus) {
      return res.status(404).json({ error: "Status not found" });
    }

    job.jobStatus = newStatus;
    await job.save();

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function updateJobStatusToClosed(req, res) {
  const { jobId } = req.params;

  try {
    // Récupérer l'ID du statut "closed" en utilisant son nom
    const statusClosed = await Status.findOne({ name: "closed" });
    if (!statusClosed) {
      throw new Error("Status 'closed' not found");
    }

    // Mettre à jour le job avec le statut "closed"
    const job = await Job.findByIdAndUpdate(
      jobId,
      { $set: { jobStatus: statusClosed._id } },
      { new: true }
    );

    // Renvoyer la réponse avec le job mis à jour
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update job status to 'closed'" });
  }
}
/*
export async function updateJobStatusToOpened(req, res) {
  const { jobId } = req.params;

  try {
    // Récupérer l'ID du statut "closed" en utilisant son nom
    const statusClosed = await Status.findOne({ name: "opened" });
    if (!statusClosed) {
      throw new Error("Status 'opened' not found");
    }

    // Mettre à jour le job avec le statut "closed"
    const job = await Job.findByIdAndUpdate(
      jobId,
      { $set: { jobStatus: statusClosed._id } },
      { new: true }
    );

    // Renvoyer la réponse avec le job mis à jour
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update job status to 'opened'" });
  }
}*/

