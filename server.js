const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

mongoose.connect('mongodb://localhost/webar_app', { useNewUrlParser: true, useUnifiedTopology: true });

const Model = mongoose.model('Model', {
  name: String,
  file: String,
});

app.post('/api/upload', upload.single('model'), async (req, res) => {
  const model = new Model({
    name: req.file.originalname,
    file: req.file.path,
  });
  await model.save();
  res.json({ success: true, model });
});

app.get('/api/models', async (req, res) => {
  const models = await Model.find();
  res.json(models);
});

app.listen(3000, () => console.log('Server running on port 3000'));
