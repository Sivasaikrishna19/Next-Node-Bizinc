const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/users', userRoutes);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
