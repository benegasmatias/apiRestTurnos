const express = require('express');
 const router = express.Router();

    const mysqlConection = require('../database');

    router.get('/personas',(req,res)=>{
        //consulta podemos obtener o no las filas
        mysqlConection.query( 'SELECT * FROM persons',(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    });

    router.get('/personas/:id',(req,res)=>{
        const {id} = req.params;
        mysqlConection.query('SELECT * FROM persons WHERE id = ?',[id],(err,rows,fields)=>{
            if(!err){ 
                res.json(rows[0]);
            }else{
                console.log(err); 
            }
        });
    });

    router.get('/personas/viewfordni/:dni',(req, res)=>{
        const {dni} = req.params;

        mysqlConection.query('SELECT * FROM persons WHERE dni = ?',[dni],(err,rows,fields)=>{
            if(!err){
                res.json(rows[0]);
            }else{
                console.log(err);
            }
        })
    })

    router.post('/personas/add/', (req /*entrada*/ , res/*salida*/)=>{
        const {id, dni, name, last_name,mail, mobile} = req.body;//que es el objeto que manda el usuario 
        const query="SET @p0=?; SET @p1=?; SET @p2=?; SET @p3=?; SET @p4=?; SET @p5=?; CALL `personaAddOEdit`(@p0, @p1, @p2, @p3, @p4, @p5);";//la consulta que llama al procedimiento almacenado
        mysqlConection.query(query,[id, dni, name, last_name, mail, mobile],(err,rows,fields)=>{ /* (err,rows,fields) esto es lo que podemos obtener*/
            if(!err){
                res.json({Status: 'Persona Guardada'},rows);
            }else{
                console.log(err);
            }
        });
    });

 module.exports = router;