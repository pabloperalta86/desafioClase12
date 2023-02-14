const { faker } = require('@faker-js/faker');

const productosRandom = () => {
    const productos = [];
    for (let i = 0; i < 5; i++) {
        productos.push({
            id:`${i+1}`,
            title: faker.commerce.product(),
            price: faker.finance.amount(),
            thumbnail: faker.internet.avatar()
        })
    }
    return(productos)
}

module.exports = productosRandom;