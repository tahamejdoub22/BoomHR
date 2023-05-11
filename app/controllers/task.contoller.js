import Employer from "../models/Employee.js";
import Project from "../models/projet.model.js";
import Task from "../models/task.model.js";
import Employee from "../models/Employee.js";
import cron from "node-cron"

const taskController = {

  createTask: async (req, res) => {
    console.log("hererere");
    try {
      if (!req.body.project) {
        return res.status(400).json({ message: "Project ID is required" });
      }

      const project = await Project.findById(req.body.project);

      if (!project) { // Check if project with given ID exists
        return res.status(404).json({ message: "Project not found" });
      }

      const owner = req.body.owner
      const words = owner.split(" ");
const employe = await Employee.findOne({
  first_name:  words[0],
  last_name:  words[1]
})
console.log(employe)
console.log(employe._id)
      const task = new Task({
        name: req.body.name,
        deadline: req.body.deadline,
        owner: employe._id,
        project: req.body.project,
        // status: req.body.status,
      });

      project.tasks.push(task);
      console.log("task est" + task)
      await project.save();
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      console.log("eroor is " + error.message)
      res.status(400).json({ message: error.message });
    }
  },

  // Récupérer toutes les tâches
  getTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      const tasksWithOwnerAndProject = [];

      for (const task of tasks) {
        const employer = await Employer.findById(task.owner);
        const project = await Project.findById(task.project);
        console.log("ereerer" + employer);
        console.log("ereeddddrer" + employer.fullname);
        tasksWithOwnerAndProject.push({
          task,
          owner: employer.fullname,
          project,
        });
      }
      res.status(200).json(tasksWithOwnerAndProject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Récupérer une tâche par ID
  getTaskById: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Tâche introuvable' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTasksByProjectId: async (req, res) => {
    console.log("taks here")
    try {
      const { projectId } = req.params;
      const tasks = await Task.find({ project: projectId }).populate('owner');
      if (tasks.length > 0) {
        const tasksWithOwnerName = tasks.map((task) => ({
          ...task._doc,
          owner: task.owner.first_name,
        }));
        console.log(tasksWithOwnerName)
        res.status(200).json(tasksWithOwnerName);
      } else {
        console.log("no tasks")
        res.status(404).json({ message: 'Aucune tâche trouvée pour ce projet' });
      }
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: error.message });
    }
  },

  updateTask: async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { ...req.body, status: req.body.status },
        { new: true, useFindAndModify: false }
      );
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: 'Tâche introuvable' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Supprimer une tâche par ID
  deleteTask: async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (task) {
        res.json({ message: 'Tâche supprimée' });
      } else {
        res.status(404).json({ message: 'Tâche introuvable' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateStatus: async (req, res) => {
    const taskId = req.params.id;
    const status = req.params.status
    console.log("update status")
    try {
      const task = await Task.findOne({ _id: taskId })

      task.status = status
      await task.save();
      const tasks = await Task.find({ project: task.project }).populate('owner');
      if (tasks.length > 0) {
        const tasksWithOwnerName = tasks.map((task) => ({
          ...task._doc,
          owner: task.owner.first_name,
        }));
        res.status(200).json(tasksWithOwnerName);
      }

    } catch (err) {
      console.log(err.message)
      res.status(404).json({ message: err.message })
    }
  }

};

export default taskController;

async function autoDeleteTask() {
  const now = new Date();
  await Task.find({ deadline: { $lt: now } }).then(tasks => {
    tasks.forEach(async (task) => {
      await Task.deleteOne({ _id: task.id })
    });
  });
}

cron.schedule('* * * * *', () => {
  autoDeleteTask()
})

const displayDataForEmployer = async (employerId) => {
  try {
    const employer = await Employer.findById(employerId);
    if (!employer) {
      console.log('Aucun employeur trouvé avec cet ID');
      return;
    }
    console.log(`Détails de l'employeur : ${employer.name}`);

    // Afficher les détails du département lié à l'employé
    const department = await Department.findById(employer.department);
    console.log(`Département : ${department.name}`);

    // Afficher la liste des tâches liées à l'employé
    const tasks = await Task.find({ owner: employerId });
    console.log(`Tâches attribuées à ${employer.name}:`);
    tasks.forEach((task) => {
      console.log(`${task.name} - deadline: ${task.deadline} - statut: ${task.status}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

const getTaskById1 = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('owner');
    if (!task) {
      res.status(404).json({ message: 'Tâche introuvable' });
      return;
    }
    // Afficher toutes les données de l'employé, les tâches liées et le département lié
    await displayDataForEmployer(task.owner._id);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};