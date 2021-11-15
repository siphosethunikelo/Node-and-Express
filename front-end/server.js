const express = require('express')

const app = express();

app.use(express.static('dist/final-product'));

app.get('/*', function (req, res) {
    res.sendFile('/', { root: 'dist/final-product' }
    );
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Port: ', process.env.PORT);
});