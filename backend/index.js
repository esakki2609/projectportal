const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const projectRoutes = require('./routes/projects');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
