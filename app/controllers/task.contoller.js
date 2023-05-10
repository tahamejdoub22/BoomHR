import Employer from "../models/Employee.js";
import Project from "../models/projet.model.js";
import Task from "../models/task.model.js";

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

      const task = new Task({
        name: req.body.name,
        deadline: req.body.deadline,
        owner: req.body.owner,
        project: req.body.project,
        // status: req.body.status,
      });

      project.tasks.push(task);
      console.log("task est" + task)
      await Promise.all([task.save(), project.save()]);
      let newTask = await task.save();
      res.status(201).json(newTask);
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
    try {
      const { projectId } = req.params;
      const tasks = await Task.find({ project: projectId }).populate('owner');
      if (tasks.length > 0) {
        const tasksWithOwnerName = tasks.map((task) => ({
          ...task._doc,
          owner: task.owner.fullname,
        }));
        res.json(tasksWithOwnerName);
      } else {
        res.status(404).json({ message: 'Aucune tâche trouvée pour ce projet' });
      }
    } catch (error) {
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
};

export default taskController;

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