import express from 'express';
import cors from 'cors';

// For types
import type { Request, Response } from 'express';  
import CheckValidKey from './app/DatabaseComponents/CheckValidKey.ts'
const app = express();
app.use(cors());
app.get('/validapi/:key', async(req: Request, res: Response) => {
  const { key } = req.params;
  const result=await CheckValidKey(key);
  res.send(result);
});

app.get('/status',(req :Request,res:Response)=>{
  res.send("healthy");
})
 

app.listen(3001, () => {
  console.log('started server.');
});

// Handle GET request at Medicare data
app.get('/add', (req, res) => {
  const { height, weight, bp, walkedDistance,uploadTime,deviceInfo } = req.query;

  // Log received data (for debugging)
  console.log('Received data:', { height, weight, bp, walkedDistance,uploadTime,deviceInfo });

  // Send back a response
  res.json({
    status: 'success',
    message: 'Data received successfully',
    receivedData: {
      height,
      weight,
      bp,
      walkedDistance,
      uploadTime,deviceInfo
    },
  });
});
