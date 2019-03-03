const express =  require('express');
const mongoose =  require('mongoose');
const bodyParser =  require('body-parser');

const wells =  require('./routes/api/wells');

const app =  express();

//body parser middleware
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//DB config
const db = require('./config/keys').mongoURI;

//Connect to mongodb
mongoose
    .connect(db)
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err));

app.get('/', (req,res) => res.send("Hello World !!!"));


//Use routes
app.use('/api/wells', wells);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));


