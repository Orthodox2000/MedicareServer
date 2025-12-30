import express from 'express';
import  checkDatabaseExists  from './DatabaseComponents/mongotest.js';

const app=express();

app.get('/:id',(req,res)=>{ 
    res.send(req.params.id);
    
})

app.get('/dbname/:dbname', async (req, res) => {
  const dbName = req.params.dbname;
    res.send(await checkDatabaseExists(dbName)); 
});

app.listen(3000,()=>{
    console.log("started server.");
});