const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    language: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    code: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Snippet', snippetSchema);
