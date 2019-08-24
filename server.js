var express = require('express'),
    app     = express(),
    path    = require('path'),

    PORT    = process.env.PORT || 5000,
    // ROOT    = process.env.NODE_ENV === 'production' ? 'client/build' : 'client/public';
    ROOT    = process.env.NODE_ENV === 'production' ? 'build' : 'build'; // TODO: change this for prod

app.use(express.static(path.join(__dirname, ROOT)));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, `${ROOT}/index.html`));
});

app.listen(PORT, (req, res) => {
    console.log(`express server listening on port: ${PORT}`);
});
