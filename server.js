const express =  require('express');
const mongoose =  require('mongoose');
const bodyParser =  require('body-parser');

const wells =  require('./routes/api/wells');

const app =  express();

//body parser middleware
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


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


