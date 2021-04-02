const dbConfig = require("../config/db.config");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.role = require("./role.model.js")(mongoose);
db.ROLES = ["user", "admin"];
db.tutorials = require("./tutorial.model.js")(mongoose);
db.courses = require("./course.model.js")(mongoose);
//db.students = require("./student.model.js")(mongoose);

module.exports = db;
