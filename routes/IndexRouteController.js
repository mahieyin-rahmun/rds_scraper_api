const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
	res.redirect('/references');
});

router.get('/references', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/reference.html'));
});

router.all('*', (req, res) => {
    res.redirect('/references');
})

module.exports = router;