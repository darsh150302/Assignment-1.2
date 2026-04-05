const User = require('../models/User');
const Snippet = require('../models/Snippet');

const getDashboard = async (_req, res) => {
  try {
    const [totalUsers, totalSnippets, recentUsers, recentSnippets] = await Promise.all([
      User.countDocuments(),
      Snippet.countDocuments(),
      User.find().select('name email isAdmin createdAt').sort({ createdAt: -1 }).limit(10),
      Snippet.find().populate('owner', 'name email').sort({ createdAt: -1 }).limit(10),
    ]);

    return res.json({
      summary: { totalUsers, totalSnippets },
      recentUsers,
      recentSnippets,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.id === id) {
      return res.status(400).json({ message: 'Admin account cannot delete itself.' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await Snippet.deleteMany({ owner: id });
    await user.deleteOne();

    return res.json({ message: 'User and related snippets deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard, deleteUser };
