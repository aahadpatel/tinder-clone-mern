import express from "express";
import { connect } from "http2";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from 'cors';


const app = express()
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:URwTuhtA1apbk4ZG@cluster0.t9tcj.mongodb.net/tinderdb?retryWrites=true&w=majority`;

// db config 

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

// Middlewares
app.use(express.json());
app.use(Cors());

// API endpoints 


app.get('/', (req, res) => res.status(200).send('Hello world!'));


// post used to push info into the database
app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

// get used to get the information from the database
app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));