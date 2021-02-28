const express = require ('express');
const cors = require ('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'SysAdmin',
	database: 'react_db'
});

connection.connect (err => {
	if(err) {
		console.log(err)
		return err;
	}
});

app.use(cors());

app.get('/', (req, res) => {
	res.send('Test');
});

app.get('/products/add', (req, res) => {
	const {name, price} = req.query;
	const INSERT_PRODUCT_QUERY = `INSERT into products(name, price) values ('${name}', ${price})`
	connection.query(INSERT_PRODUCT_QUERY, (err, results) => {
		if(err) {
			return res.send(err);
		}
		else {
			return res.send('Product added successfully');
		}
	})

})

app.get('/products', (req, res) => {
connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
	if(err) {
		return res.send(err)
	}
	else {
		return res.json({
			data: results
		});
	}
});
});

app.listen(4000, () => {
	console.log(`Products server listening on port 4000`);
})