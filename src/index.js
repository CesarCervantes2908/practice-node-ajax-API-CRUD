const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const { pathToFileURL } = require('url');
let app = express();
let products = [
    {
        name: 'Microphone'
    },
    {
        name: 'Keyboard'
    }
];
//Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.get('/products',(req, res)=>{
    res.json(products);
});
app.post('/products', (req, res)=>{
    let nextIndex = products.length + 1;
    let {name} = req.body;
    if(!name){
        res.status(400).send('No se especificó el nombre del producto');
    }else{
        products.push({
            id: nextIndex,
            name
        });
        res.json(products);
    };
});
app.put('/products/:id', (req, res)=>{
    let {id} = req.params;
    let {name} = req.body;
    if(!name){
        res.status(400).send('No se especificó el nombre del producto');
    }else{
        products[id - 1] = {
            ...products[id - 1],
            name
        };
        res.json(products)
    };
});
app.delete('/products/:id', (req, res)=>{
    let {id} = req.params;
    products = products.filter((product, index)=>(index + 1) != id);
    res.json(products);
});

//Start server
app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Server Listening on PORT: ${process.env.PORT || 8080}`);
});