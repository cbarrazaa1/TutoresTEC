const mongoose = require('mongoose');
const {Bachelor} = require('../models/Bachelor');
const {Course} = require('../models/Course');
require('dotenv').config({path: __dirname + '/../../.env'});

if (process.argv.length < 3) {
  console.log(`Usage: ${process.argv[0]} ${process.argv[1]} <bachelorID>`);
}

console.log('Connecting to MongoDB database...');
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', async () => {
  console.log('Connected!\n Running script...');
  const bachelorID = process.argv[2];
  const bachelor = await Bachelor.findById(bachelorID);

  // find all courses that have this bachelor associated
  const courses = await Course.find({
    relatedBachelors: {$in: [bachelorID]},
  });

  // associate courses to the bachelor
  courses.forEach(course => {
    if (!bachelor.relatedCourses.some(id => course._id.equals(id))) {
      console.log(
        `Associating course "${course.name}" with bachelor "${bachelor.shortName}".`,
      );
      bachelor.relatedCourses.push(course._id);
    }
  });

  // apply changes
  console.log('Done!');
  await bachelor.save();

  // close connection
  mongoose.disconnect();
});
