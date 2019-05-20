const express = require('express');
const router = express.Router();
const db = require('../controllers/DatabaseController');

router.get('/', (req, res) => {
    res.redirect('/courses');
})

router.get('/courses', (req, res) => {
    let records = db.getALlCourses();
    res.json(records);
});

router.get(/\/courses\/([a-z, A-Z]{1,3}[\d]{1,3})/, (req, res) => {
    let courseName = (req.params[0]).toUpperCase();
    let records = db.getByCourseCode(courseName);
    res.json(records);
});

router.get(/\/courses\/([a-z, A-Z]{1,3}[\d]{1,3})\/([\d]{1,2})/, (req, res) => {
    let courseName = req.params[0].toUpperCase();
    let sectionNumber = req.params[1];

    console.log(courseName, sectionNumber);

    let records = db.getByCourseNameandSectionNumber(courseName, sectionNumber);
    res.json(records);
});

router.get('/notfilledcourses/bytime/:timing', (req, res) => {
    let timing = req.params.timing;
    let records = db.getAvailableCourseByTiming(timing);
    res.json(records);
});

router.get('/notfilledcourses/byname/:course', (req, res) => {
    let courseName = (req.params.course).toUpperCase();
    let records = db.getAvailableCourseByName(courseName);
    res.json(records);
});

router.get('/notfilledcourses/bynameandtime/:course/:timing', (req, res) => {
    let courseName = (req.params.course).toUpperCase();
    let timing = req.params.timing;
    let records = db.getAvailableCourseByNameAndTime(courseName, timing);
    res.json(records);
});

module.exports = router;
