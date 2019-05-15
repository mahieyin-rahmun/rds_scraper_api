const db = require('../controllers/DatabaseController');

const refreshDB = function() {
    process.send(JSON.stringify({ msg: 'Updating database....' }));
    db.refreshDatabase();
};

refreshDB();

setInterval(() => {
    refreshDB();
}, 60000);