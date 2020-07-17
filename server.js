const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const PORT = process.env.PORT || 3000;
const app = express();

const appRouter = require("./apps/apps-router");

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use("/apps", appRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
