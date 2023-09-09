// Definitions
const mongoose = require("mongoose");
require('dotenv').config();


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


// Schemas
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});


// Models
const Person = mongoose.model('Person', personSchema);

// Controllers

// Create and save a person 
const createAndSavePerson = function(done) {
  const janeFonda = new Person({ name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"] });

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

// Create many people
var arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] }
];

const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

// Find people, returns an array
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

// Find one value in a document
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, foodFound) {
    if (err) return console.log(err);
    done(null, foodFound);
  });
};

// Find a person by ID
const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function(err, idFound) {
    if (err) console.log(err);
    done(null, idFound);
  });
};

// Finda document by id then edit and save (classic method)
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  Person.findById(personId, (err, personFound) => {
    if(err) return console.log(err); 
  
    personFound.favoriteFoods.push(foodToAdd);

    personFound.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

// Find and update document (modern method)
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true},      (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

// Find by id and remove document
const removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

// Remove documents according to criteria 
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, infoPeopleRemoved){
    if(err) console.log(err);
     done(null, infoPeopleRemoved);
  })
};

// Chained methods to manipulate queried data
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(err, people) {
  if(err) console.log(err);
  done(null, people);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
