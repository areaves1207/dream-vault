const app = require('./app');
const PORT = process.env.PORT || 8080; //3000 is prod, 8080 localhost

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
