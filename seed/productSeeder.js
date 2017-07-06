/**
 * Created by damiatm94 on 06-Jul-17.
 */

const Product = require('../models/product');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

const products = [
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: 'Gothic',
        description: 'Awesome Game!!!',
        price: 10
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: 'World of Warcraft',
        description: 'Some MMO game from Blizzard Studio',
        price: 34
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: 'Call of Duty',
        description: 'FPS Game',
        price: 20
    })
];

let done = 0;

function exit() {
    mongoose.disconnect();
}

for (let i in products) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

mongoose.disconnect();