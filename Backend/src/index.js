const express = require('express');
const cors = require('cors');

const {serverConfig, ConnectDB} = require('./config');
const apiRoutes = require('./routes')

const app = express();
ConnectDB();

// middleware
app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());



app.get('/', (req,res) => {
    res.send('API IS LIVE!');
})

app.use('/api',apiRoutes);

const PORT = serverConfig.PORT;
app.listen(PORT, () =>{
    console.log('Server started on port : ' + PORT);
});