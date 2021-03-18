// import dependencies and initialize express
const express = require('express');
const path = require('path');
const healthRoutes = require('./src/routes/health-route');



const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

// routes and api calls
app.use('/health', healthRoutes);


// default path to serve up index.html (single page application)
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.get('/autor', (req, res) => {
  res.json({
    alumno: 'M. D. P.',
    servicio: 'EKS en AWS',
  });
});


app.listen(PORT, () => {
  console.log(`App UI available on Port ${PORT}`);
});

// error handler for unmatched routes or api calls
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, './public', '404.html'));
});

module.exports = app;

