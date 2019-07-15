const express = require('express');
const knex = require('knex');

const db = require('../data/dbConfig.js');
const dbConnection = knex({
  client: "sqlite3",
  connection: {
    filename: './data/budget.db3'
  },
  useNullAsDefault: true
});

const accountRouter = express.Router();

accountRouter.get('/', (req, res) => {
  //get data from the db 
  //select * from accounts
  dbConnection('accounts')
  .then(account => {
    res.status(200).json(account);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})
//get specifc
accountRouter.get('/:id', (req, res) => {
    //select * from accounts where id = :id
    const id = req.params.id;
    
    dbConnection('accounts')
    .where({ id }) //THIS NEEDS TO BE AN OBJ
    .first() //unwrap it
    .then(account => {
        if(account){
        res.status(200).json(account);
        } else {
            res.status(404).json({ message: "Not Found" });
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})
//post
accountRouter.post('/', (req, res) => {
    //insert into Accounts (name, budget)
    //values( whaterver, whatever )
    const account = req.body;
    if (!account.name || !account.budget){
        res.status(400).json({ message: "please enter budget and name" });
    } else {
        dbConnection('accounts')
        .insert(account, 'id')
        .then(arrayOfIds => {
            const idOfLast = arrayOfIds[0];
            res.status(201).json(idOfLast);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }
})
//put
accountRouter.put('/:id', (req, res) => {
    //update Accounts 
    //set (content)
    //where id = :id
    dbConnection('accounts')
    .where({ id: req.params.id })//specify which one to change
    .update(req.body) //changes
    .then(count => {
        if (count > 0) {
            res.status(200).json(count);
        } else {
            res.status(404).json({ message: "could not find that" });
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})
//delete
accountRouter.delete('/:id', (req, res) => {
    //delete from Accounts
    //where id = :id
    dbConnection('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        res.status(200).json(count);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = accountRouter;