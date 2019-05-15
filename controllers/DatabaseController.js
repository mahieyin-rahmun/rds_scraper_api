const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { parseTime } = require('../utils/TimeParser');

const pythonScrapperPath = path.resolve(__dirname, '../scrapper/scrapper_controller.py');

var refreshDatabase = function() {
    let process = spawn('python', [pythonScrapperPath]);

    process.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    process.stderr.on('data', (err) => {
        console.log(err.toString());
    });
};

var getALlCourses = function () {
    let records = fs.readFileSync(path.join(__dirname, '../data.json'));
    return JSON.parse(records);
};

var getByCourseCode = function(courseCode) {
    let records = getALlCourses();
    records = records.filter(record => record.name.includes(courseCode));

    return records;
};

var getAvailableCourseByTiming = function(timing) {
    timing = parseTime(timing);
    let records = getALlCourses();    
    records = records.filter(record => record.time.includes(timing) && record.capacity_remaining > 0);

    return records;
};

module.exports = {
    refreshDatabase,
    getALlCourses,
    getByCourseCode,
    getAvailableCourseByTiming
};
