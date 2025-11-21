const Project = require('../models/Project');
// require('../models/User') endi keraksiz, server.js allaqachon import qilgan

exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const project = await Project.create({
      name,
      owner: req.user._id,
      collaborators: [],
      files: []
    });
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner collaborators', 'username email');

    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.inviteCollaborator = async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: 'Not found' });
    if (!project.owner.equals(req.user._id))
      return res.status(403).json({ message: 'Forbidden' });

    if (!project.collaborators.includes(userId)) {
      project.collaborators.push(userId);
      await project.save();
    }

    const populatedProject = await Project.findById(req.params.id)
      .populate('owner collaborators', 'username email');

    res.json(populatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};