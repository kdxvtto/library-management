require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const authorRoutes = require('./router/authorRoutes');
const bookRoutes = require('./router/bookRoutes');
const categoryRoutes = require('./router/categoryRoutes');
const userRoutes = require('./router/userRoutes');
const adminRoutes = require('./router/adminRoutes');
const loginRoutes = require('./router/loginRoutes');
const borrowRoutes = require('./router/borrowRoutes');

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/borrows', borrowRoutes);


console.log(process.env.JWT_SECRET)

mongoose.connect('mongodb://127.0.0.1:27017/dbCoba1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


