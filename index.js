const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {errorHandler, boomError} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT ?? 2000;

app.use(express.json());
app.use(cors());

routerApi(app);

app.use(boomError);
app.use(errorHandler);

app.listen(port);

