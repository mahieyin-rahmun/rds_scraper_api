const express = require('express');
const cors = require('cors');
const { fork } = require('child_process');
const path = require('path');

const APIRouter = require('./routes/APIRouteController');
const IndexRouter = require('./routes/IndexRouteController');

app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, './public')))

let forkedDBUpdateWorker = fork('./controllers/UpdateDBWorker.js');

forkedDBUpdateWorker.on('message', (message) => {
    console.log(message);
});

let port = process.env.PORT || 3000;

app.use('/api', APIRouter);
app.use('/', IndexRouter);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});