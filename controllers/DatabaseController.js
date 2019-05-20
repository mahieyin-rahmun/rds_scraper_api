const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { parseTime } = require('../utils/TimeParser');

const pythonScrapperPath = path.resolve(__dirname, '../scrapper/scrapper_controller.py');

var refreshDatabase = function () {
    let process = spawn('python', [pythonScrapperPath]);

    process.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    process.stderr.on('data', (err) => {
        console.log(err.toString());
    });
};

var getAllCourses = function () {
    let records = fs.readFileSync(path.join(__dirname, '../data.json'));
    try {
        records = JSON.parse(records);
    } catch (err) {
        return {
            status: "Failed",
            message: "Parser failed to get data, try again in a minute"
        };
    }
    return records;
};

var getByCourseCode = function (courseCode) {
    let records = getAllCourses();

    if (!records.status) {
        records = records.filter(record => record.name.includes(courseCode));
    }

    return records;
};

var getAvailableCourseByTiming = function (timing) {
    timing = parseTime(timing);
    let records = getAllCourses();

    if (!records.status) {
        records = records.filter(record => record.time.includes(timing) && record.capacity_remaining > 0);
    }

    return records;
};

var getAvailableCourseByName = function (courseCode) {
    let records = getAllCourses();

    if (!records.status) {
        records = records.filter(record => record.name.includes(courseCode) && record.capacity_remaining > 0);
    }

    return records;
};

var getAvailableCourseByNameAndTime = function (courseCode, timing) {
    timing = parseTime(timing);
    let records = getAllCourses();

    if (!records.status) {
        records = records.filter(record => record.name.includes(courseCode) && record.time.includes(timing) && record.capacity_remaining > 0);
    }

    return records;
};

var getByCourseNameandSectionNumber = function (courseCode, sectionNumber) {
    let records = getAllCourses();

    if (!records.status) {
        records = records.filter(record => record.name.includes(courseCode) && sectionNumber === record.section);
    }

    return records;
};

module.exports = {
    refreshDatabase,
    getAllCourses,
    getByCourseCode,
    getAvailableCourseByTiming,
    getAvailableCourseByName,
    getAvailableCourseByNameAndTime,
    getByCourseNameandSectionNumber
};
