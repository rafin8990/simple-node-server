const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

const users = [
    { id: 1, name: 'sabana', gmail: "sabana@gmail.com" },
    { id: 2, name: 'rupa', gmail: "rupa@gmail.com" },
    { id: 3, name: 'simu', gmail: "simu@gmail.com" },

];




const uri = "mongodb+srv://dbuser1:Xxg3bMogo2ZkPsgL@cluster0.nuouh7o.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const useerCollection = client.db('simpleNode').collection('users');
        const user={name: 'simu', gmail: "simu@gmail.com"}
        // const result=await useerCollection.insertOne(user);
        // console.log(result);
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await useerCollection.insertOne(user);
            console.log(result);
            user.id = result.insertedId;
            res.send(user)

        })

        app.get('/users', async (req, res)=>{
            const cursor= useerCollection.find({});
            const users= await cursor.toArray();
            res.send(users);
        })

    }
    finally {

    }
}
run().catch(error => console.error(error))




app.get('/', (req, res) => {
    res.send('node is running on the server')
})

app.get('/users', (req, res) => {
    res.send(users)
})



app.listen(port, () => {
    console.log(`port is running on the server ${port}`)
})
