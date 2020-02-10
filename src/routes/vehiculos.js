const express = require('express');
 const router = express.Router();

 const mysqlConection = require('../database');

 router.get('/vehiculos',(req,res)=>{
     mysqlConection.query('SELECT * FROM vehicles',(err,rows,fields)=>{
         if(!err){
            res.json(rows);
         }else{
             console.log(err);
         }
     });
 });

 router.get('/vehiculos/viewForPersona/:person',(req,res)=>{
     const {person} = req.params;
     mysqlConection.query('SELECT * FROM vehicles WHERE person_id = ?',[person],(err,rows,fields)=>{
         if(!err){
             res.json(rows);
         }else{
             console.log(err);
         }
     });
 });

 router.post('/vehiculos/add/',(req,res)=>{
     const {id_car,patent,marca,modelo,person_id,anio} = req.body;
  
     const query="SET @p0=?; SET @p1=?; SET @p2=?; SET @p3=?; SET @p4=?; SET @p5=?; CALL `vehiculoAddOEdit`(@p0, @p1, @p2, @p3, @p4, @p5);"   //"CALL `vehiculoAddOEdit`(?,?,?,?,?,?);"
     mysqlConection.query(query,[id_car,patent,marca,modelo,person_id,anio],(err,rows,fields)=>{
         if(!err){
            res.json({Status: 'Vehiculo Guardado'});
         }else{
            console.log(err);
         }
     });
 });

 module.exports = router;