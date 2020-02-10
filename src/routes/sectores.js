const express = require('express');
const router = express.Router();


const mysqlConection = require('../database');


router.get('/sectores',(req,res)=>{
    mysqlConection.query('SELECT * FROM sectors',(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

module.exports = router;