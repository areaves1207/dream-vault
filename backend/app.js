const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());


const usersRoute = require('./routes/users.js');
app.use('/users', usersRoute);


app.get('/', (req, res) => {
    res.send('<h1>Hello, express.js server..!</h1>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port ${port}')
})