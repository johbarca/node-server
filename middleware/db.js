var mysql = require('mysql');
var db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'barca',
    port: '3306',
    database: 'nodejs'
});
/* db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'barca',
    port: '3306',
    database: 'nodejs'
}); */
/* db.query = function (sql, callback) {

    if (!sql) {
        callback();
        return;
    }
    pool.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        };

        callback(null, rows, fields);
    });
} */
module.exports = db;