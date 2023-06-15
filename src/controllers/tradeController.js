
const Trade = require("./../models/trades");

const createTrade = (req, res) => {
    if (req.body.shares < 1 && req.body.shares > 100) {
        res.status(400);
    }
    if (req.body.type !== 'buy' && req.body.type !== 'sell') {
        res.status(400);
    }
    const trade = new Trade({
        type: req.body.type,
        user_id: req.body.user_id,
        shares: req.body.shares,
        symbol: req.body.symbol,
        price: req.body.price,        
    });
    
    trade.save()
    .then(async (result) => {
        res.status(201).success(result);
    })
    .catch(err => {
        console.log(err);
        res.send( err );
    });
  }

const getAllTradeList = (req, res) => {
    let type = req.query.type;
    let user_id = req.query.user_id;
    if (type && user_id) {
      Trade.find({user_id: user_id, type: type}).then((data) => {
        res.success(data);
    }) 
}
    if (type) {
      Trade.find({type: type}).then((data) => {
        res.success(data);
    }) 
}
    if (user_id) {
      Trade.find({user_id: user_id}).then((data) => {
        res.success(data);
    })  
    }
    Trade.find().then((data) => {
        res.success(data);
    })
}

const tradeDetails = (req, res) => {
    const id = req.params.id;
    Trade.findById(id)
      .then(result => {
        res.status(201).success(data);
      })
      .catch(err => {
        res.status(404).success('ID not found');
      });
}

const tradeDelete = (req, res) => {
    const id = req.params.id;
    Trade.findByIdAndDelete(id)
      .then(result => {
        res.status(405)
      })
      .catch(err => {
        res.status(404);
      });
}

module.exports = {
    createTrade,
    getAllTradeList,
    tradeDetails,
    tradeDelete
}