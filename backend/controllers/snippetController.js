const Snippet = require('../models/Snippet');

const validateSnippet = ({ title, language, code }) => title && language && code;

const getSnippets = async (req, res) => {
  try {
    const filter = req.user.isAdmin ? {} : { owner: req.user.id };
    const snippets = await Snippet.find(filter)
      .populate('owner', 'name email')
      .sort({ updatedAt: -1 });

    return res.json(snippets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createSnippet = async (req, res) => {
  const { title, language, description, code } = req.body;

  if (!validateSnippet({ title, language, code })) {
    return res.status(400).json({ message: 'Title, language, and code are required.' });
  }

  try {
    const snippet = await Snippet.create({
      title,
      language,
      description: description || '',
      code,
      owner: req.user.id,
    });

    const populatedSnippet = await Snippet.findById(snippet.id).populate('owner', 'name email');
    return res.status(201).json(populatedSnippet);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSnippet = async (req, res) => {
  const { id } = req.params;
  const { title, language, description, code } = req.body;

  if (!validateSnippet({ title, language, code })) {
    return res.status(400).json({ message: 'Title, language, and code are required.' });
  }

  try {
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found.' });
    }

    const isOwner = snippet.owner.toString() === req.user.id;
    if (!isOwner && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not allowed to update this snippet.' });
    }

    snippet.title = title;
    snippet.language = language;
    snippet.description = description || '';
    snippet.code = code;

    await snippet.save();
    const updatedSnippet = await Snippet.findById(id).populate('owner', 'name email');
    return res.json(updatedSnippet);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteSnippet = async (req, res) => {
  const { id } = req.params;

  try {
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found.' });
    }

    const isOwner = snippet.owner.toString() === req.user.id;
    if (!isOwner && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not allowed to delete this snippet.' });
    }

    await snippet.deleteOne();
    return res.json({ message: 'Snippet deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getSnippets, createSnippet, updateSnippet, deleteSnippet };
