const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dxxvtcb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const productCollection = client.db('emaJohn').collection('products')
        app.get('/products', async(req, res) =>{
            console.log('query', req.query);
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products)
        })
    }
    finally{

    }
}

run().catch(console.dir)


app.get('/', (req, res) =>{
    res.send('John is running and waiting for Ema')
});

app.listen(port, () =>{
    console.log('John is running on,', port);
})