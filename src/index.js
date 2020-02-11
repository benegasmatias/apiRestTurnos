const express = require('express');
const app=express();

const cors = require('cors');
//SETTING
app.set('port',process.env.PORT||3000);
app.use(compression());
//middlewares

app.use(express.json());//se puede accceder a la infromacion gracias a esta linea de codigo
app.use(cors());  //son los servidores que se pueden conectar con mi api             
//routes

app.use(require('./routes/personas'));
app.use(require('./routes/vehiculos'));
app.use(require('./routes/sectores'));
app.use(require('./routes/turnos'));

app.listen(app.get('port'), ()=>{
    console.log('server on port ',app.get('port'));
})