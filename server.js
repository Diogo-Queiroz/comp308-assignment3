const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require("./app/models");

let corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.json({message: "Welcome"});
});

// Connect to database
db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to database");
}).catch(err => {
  console.log("Cannot connect to database. Error: ", err);
  process.exit();
})

require('./app/routes/tutorial.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
