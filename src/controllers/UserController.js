const User = require("./../models/users");

const getAllUsersList = (req, res) => {
    // User.aggregate([
    //     {
    //         $lookup: {
    //             from: "items",
    //             localField: "item",    // field in the orders collection
    //             foreignField: "item",  // field in the items collection
    //             as: "fromItems"
    //          }
    //     }
    // ]).then((result) => {
    //     console.log('result', result);
    // }).catch((error) => {
    //     console.log('error', error);
    // });

    User.find().then((data) => {
        res.success(data);
    })
}

module.exports = {
    getAllUsersList,
  }