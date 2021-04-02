const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require("./app/models");
const Role = db.role;

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
require('./app/routes/course.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Just in case there's no roles defined already
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err)
          console.log(err.message);
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err)
          console.log(err.message);
        console.log("added 'admin' to roles collection");
      });
    }
  })
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});

// Calling initial to populate with user and admin roles into the database
initial();
