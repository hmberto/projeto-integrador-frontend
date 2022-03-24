const express = require('express');

const app = express();

const outputPath = `${__dirname}/dist/`;

app.use(express.static(outputPath));

app.get('/*', (req, res) => {
    res.sendFile(`${outputPath}/index.html`);
})

app.listen(process.env.PORT);