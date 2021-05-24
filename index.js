const express = require('express');
const mysql = require('mysql');
//body parser
const bodyParser = require('body-parser');
//puerto
const PORT = process.env.PORT || 3050;
//app-instancia express
const app = express();
//inicializar el cors
const cors = require('cors');


//instalar dependencia bodyparser con node para que funcione
app.use(bodyParser.json());
//instalar dependencia de cors
app.use(cors());

//configuracion del cors 
var whitelist = ['http://localhost:3050']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
//conexion a mysql
var connection = mysql.createConnection({
    host     : 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user     : 'bsale_test',
    password : 'bsale_test',
    database : 'bsale_test'
  });


  //Rutas 
          //home
  app.get('/',(req,res)=>{
    res.send('Welcome to Api');

  });

  //buscar producto
  app.get('/product/:id',(req,res)=>{
    const {id} =req.params
    const sql = `SELECT * FROM product WHERE id =${id}`;
    connection.query(sql,(error,result)=>{

      if(error)throw error;
      if(result.length>0){
        res.json(result);
      }
      else
      {
        res.send('Not results');
      }
    }); 
  });

  //listado de todos los producto 
  app.get('/product',(req,res)=>{
    const sql = 'SELECT * FROM product';
      connection.query(sql,(error,results)=>{

        if(error)throw error;
        if(results.length>0){
          res.json(results);
        }
        else
        {
          res.send('Not results');
        }
      }); 
  });

  
//verifica si hay error de conexion
connection.connect(error=>{
    if(error) throw error;
    console.log('Databases server running');
});

//escucha al puerto y empieza correr el servidor
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));







