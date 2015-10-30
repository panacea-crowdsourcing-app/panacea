var models = require('./database/index.js');
var models = models()
  , Web_SMS = models.Web_SMS
  , Disease_Incidence = models.Disease_Incidence
  , Social_Media = models.Social_Media;
console.log(models);

var sequelize = require('./database/database.js');

var log = function(inst) {
  console.dir(inst.get())
}

Web_SMS.findAll({
  })
  .then(function(posts) {
    posts.forEach(log);
  })