const express = require('express');
const cors = require('cors');

const {serverConfig, ConnectDB} = require('./config');
const apiRoutes = require('./routes')

const app = express();
ConnectDB();

// middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://foodiekart-pyt6up19k-jayakrushna60850-gmailcoms-projects.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.urlencoded({extended : true}));
app.use(express.json());



app.get('/', (req,res) => {
    res.send('API IS LIVE!');
})

app.use('/api',apiRoutes);

// const PORT = serverConfig.PORT;
// app.listen(PORT, () =>{
//     console.log('Server started on port : ' + PORT);
// });

module.exports = app;