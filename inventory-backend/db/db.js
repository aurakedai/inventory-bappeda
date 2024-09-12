const {Pool} = require('pg')

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'Inventory-bappeda',
    password:'SUKETlemu22',
    port:'5432'
});


module.exports = pool;