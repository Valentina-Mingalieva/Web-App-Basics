const express = require('express');
const exhbs = require('express-handlebars');
const products = require('./products.json');

const PORT = process.env.PORT || 4444;

const app = express();

// позволяет app server отдавать файлы
app.use(express.static('public'));
app.set('view engine', 'hbs'); // регистрируем движок
app.engine('hbs',
    exhbs({
        extname: 'hbs', // могу изменить расширение
    }),
);

// http://localhost:4444/
app.get('/', (req, res) => {
    res.render('home');
})

// http://localhost:4444/about
app.get('/about', (req, res) => {
    res.render('about', {cssFileName: 'about', pageTitle: 'About us'});
})
   
// http://localhost:4444/products
app.get('/products', (req, res) => {
    res.render('products', { products, cssFileName: 'products', pageTitle: 'Our products' });
})

// :productId - динамический параметр
app.get('/product/:productId', (req, res) => {
  console.log(req.params);
  const product = products.find(p => p.id === req.params.productId);
  res.render('product', { product });
});

app.listen(PORT, () => {
    console.log(`Application server is running on port ${PORT}`);
})