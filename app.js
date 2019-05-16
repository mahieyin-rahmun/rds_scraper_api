const express = require('express');
const cors = require('cors');
const db = require('./controllers/DatabaseController');
const { fork } = require('child_process');

app = express();
app.use(cors());

let forkedDBUpdateWorker = fork('./controllers/UpdateDBWorker.js');

forkedDBUpdateWorker.on('message', (message) => {
    console.log(message);
});

let port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.redirect('/api/courses');
});

app.get('/api/courses', (req, res) => {
    let records = db.getALlCourses();
    res.json(records);
});

app.get('/api/courses/:course', (req, res) => {
    let courseName = (req.params.course).toUpperCase();
    let records = db.getByCourseCode(courseName);
    res.json(records);
});

app.get('/api/notfilledcourses/:timing', (req, res) => {
    let timing = req.params.timing;
    let records = db.getAvailableCourseByTiming(timing);
    res.json(records);
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});