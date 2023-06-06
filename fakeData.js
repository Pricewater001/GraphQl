const mongoose = require("mongoose");
const PlogModel = require("./models/plogsModel");
const CompanyModel = require("./models/companyModel");
const UserModel = require("./models/usersModel");

const companyData = [
  {
    _id: new mongoose.Types.ObjectId(),
    id: 1,
    name: "pwc",
    location: "Haza3 majali",
    rank: 4,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    id: 2,
    name: "Deloitte",
    location: "Zahran St 190, Amman",
    rank: 2,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    id: 3,
    name: "Hassan",
    location: "Al-Barha",
    rank: 1,
  },
];

const userData = [
  {
    _id: new mongoose.Types.ObjectId(),
    id: 1,
    name: "Hasan",
    age: 26,
    major: "Computer Science",
    companyId: companyData[0]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    id: 2,
    name: "Hakim",
    age: 26,
    major: "IT",
    companyId: companyData[1]._id,
  },
];

const plogData = [
  {
    _id: new mongoose.Types.ObjectId(),
    id: 1,
    title: "Breaking News",
    isTrue: false,
    age: 23,
    country: "Jordan",
    description: "Breaking Breaking Breaking",
    comments: [],
    userId: userData[0]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    id: 2,
    title: "Irbid",
    isTrue: false,
    age: 21,
    country: "Irbid",
    description: "The most beautiful City",
    comments: [
      { id: 1, content: "yes you are right" },
      { id: 2, content: "No you are Not Wrong" },
    ],
    userId: userData[1]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    id: 3,
    title: "Prog.Hasan",
    isTrue: true,
    age: 35,
    country: "USA",
    description: "Not Prog Hassan",
    comments: [
      { id: 1, content: "First Comment" },
      { id: 2, content: "no this is the first Comment" },
    ],
    userId: userData[0]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    id: 4,
    title: "Not Hello ",
    isTrue: false,
    age: 20,
    country: "KSA",
    description: "Not Hello From the other world ",
    comments: [
      { id: 1, content: "First Comment" },
      { id: 2, content: "no this is the first Comment" },
    ],
    userId: userData[1]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    id: 5,
    title: "Hola ",
    isTrue: true,
    age: 40,
    country: "UAE",
    description: "TEST TEST TEST ",
    comments: [
      { id: 1, content: "First Comment" },
      { id: 2, content: "no this is the first Comment" },
    ],
    userId: userData[1]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    id: 6,
    title: "but",
    isTrue: true,
    age: 40,
    country: "UAE",
    description: "TEST TEST TEST ",
    comments: [
      { id: 1, content: "First Comment" },
      { id: 2, content: "no this is the first Comment" },
    ],
    userId: userData[0]._id,
  },
];

const fillRelationships = async () => {
  try {
    await Promise.all([
      CompanyModel.insertMany(companyData),
      UserModel.insertMany(userData),
      PlogModel.insertMany(plogData),
    ]);

    const companies = await CompanyModel.find();
    const users = await UserModel.find();
    const plogs = await PlogModel.find();

    for (const plog of plogs) {
      const user = users.find((user) => user._id.equals(plog.userId));
      if (user) {
        user.plogs.push(plog._id);
        await user.save();
      }
    }
    

    for (const user of users) {
      const company = companies.find((company) =>
        company._id.equals(user.companyId)
      );
      if (company) {
        company.users.push(user._id);
        await company.save();
      }
    }

    console.log("Relationships filled successfully.");
  } catch (error) {
    console.error("Error filling relationships:", error);
  }
};

module.exports = {  fillRelationships };


