var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'barca',
  port: '3306',
  database : 'nodejs'
});
 
connection.connect();
var sql = 'SELECT * from user';
connection.query(sql, function(err, rows, fields) {
  if (err) {
    console.log(err);
    return;
  };
  console.log('The solution is: ', rows);
});
 
connection.end();
