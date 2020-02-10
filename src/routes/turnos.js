const express = require('express');
const router = express.Router();

const mysqlConection = require('../database');

router.get('/turnos/disponibles/:sector', (req,res) => {
    const {sector} = req.params;
  
    mysqlConection.query('SELECT * FROM shifts_available WHERE (disponible = "si" and entregado = "no" and sector_id = ?)',[sector],(err,rows,fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


router.post('/turnos/add', (req /*entrada*/ , res/*salida*/)=>{
    const {id, dataTime, sector_id, disponible, entregado} = req.body;//que es el objeto que manda el usuario 
    const query="SET @p0=?; SET @p1=?; SET @p2=?; SET @p3=?; SET @p4=?;  CALL `TurnosDisponibleAddOfEdit`(@p0, @p1, @p2, @p3, @p4);";//la consulta que llama al procedimiento almacenado
    mysqlConection.query(query,[id, dataTime, sector_id, disponible, entregado],(err,rows,fields)=>{ /* (err,rows,fields) esto es lo que podemos obtener*/
        if(!err){
            res.json({Status: 'Turno Guardado'});
        }else{
            console.log(err);
        }
    });
});

router.post('/turnosEntregado/add',(req, res) => {
    const {fecha,budget_cod} = req.body;
   
    const query="INSERT INTO `turnos` (`id`, `fecha`, `budget_cod`) VALUES (NULL, ?, ?);";
    mysqlConection.query(query,[fecha,budget_cod],(err,rows,fields)=>{
        if(!err){
            res.json({Status:'Turno Entregado'});
        }
    });
});

router.get('/turnosEntregado/verificar/:cod',(req, res) => {
    const {cod} = req.params;
    const query="SELECT id FROM turnos WHERE budget_cod= ?";
    mysqlConection.query(query,[cod],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.put('/turnos/edit/:id',(req ,res ) => {
    const {dataTime, sector_id, disponible, entregado} = req.body;
    const {id} = req.params;
    const query="SET @p0=?; SET @p1=?; SET @p2=?; SET @p3=?; SET @p4=?;  CALL `TurnosDisponibleAddOfEdit`(@p0, @p1, @p2, @p3, @p4);";
    mysqlConection.query(query,[id, dataTime, sector_id, disponible, entregado],(err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Turno Actualizado'});
        }else{
            console.log(err);
        }
    });
});

//---------------------------------PRESUPUESTOS--------------------------------------------


router.get('/presupuestosDisponibles/:sector_id',(req,res)=>{
    const {sector_id} = req.params;
    const query ='SELECT * FROM budgets_shifts WHERE (sectors_id= ? and available="si" and delivered="no")';
    mysqlConection.query(query,[sector_id],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


router.put('/presupuestoDisponible/edit/:id',(req ,res ) => {
    const {author_id, sector_id,dateTime, available, delivered} = req.body;
    const {id} = req.params;
    const query="SET @p0=?; SET @p1=?; SET @p2=?; SET @p3=?; SET @p4=?; SET @p5=?; CALL `presupuestoAddOfEdit`(@p0, @p1, @p2, @p3, @p4, @p5);";
    mysqlConection.query(query,[id, author_id, sector_id,dateTime, available, delivered],(err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Presupuesto Actualizado'});
        }else{
            console.log(err);
        }
    });
});

router.post('/presupuestoDisponible/add',(req ,res ) => {
    const {id,author_id,dataTime, sectors_id, available, delivered} = req.body;

    const query="SET @p0=?; SET @p1=?; SET @p2=?; SET @p3=?; SET @p4=?; SET @p5=?; CALL `presupuestoAddOfEdit`(@p0, @p1, @p2, @p3, @p4, @p5);";
    mysqlConection.query(query,[id, author_id, sectors_id, dataTime, available, delivered],(err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Turno Presupuesto Agregado'});
        }else{
            console.log(err);
        }
    });
});

router.post('/presupuestoEntregado/add',(req ,res ) => {
    const {cod_budget,sector,car, amount, descripcion, budget,dateTime} = req.body;

    const query="SET @p0=?; SET @p1=?; SET @p2=?; SET @p3=?; SET @p4=?; SET @p5=?; SET @p6=?; CALL `presupuestoEntregadoAddOfEdit`(@p0, @p1, @p2, @p3, @p4, @p5, @p6);";
    mysqlConection.query(query,[cod_budget,sector,car, amount, descripcion, budget,dateTime],(err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Turno de Presupuesto Entregado'});
        }else{
            console.log(err);
        }
    });
});

router.get('/presupuestoEntregado/verificar/:cod',(req,res)=>{
const {cod} = req.params;
mysqlConection.query('SELECT cod_budget,sector FROM budgets WHERE cod_budget = ?',[cod],(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
});
});

//------------------------SOLICITUDES DE TURNOS-------------------------------------------
router.get('/solicitud',(req,res)=>{
const {} = req.body;
const query ="";
mysqlConection.query(query,[],(err,rows,fields)=>{
    if(!err){
        console.log(rows);
    }else{
        console.log(err);
    }
});
});


module.exports = router;