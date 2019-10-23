var sqlMap = {
    user: {
        add: 'insert into user( id, name, password) values ( 0, ?, ?)',
        select_name: 'SELECT * from user where name = ?', //查询 username
        select_password: 'SELECT * from user where password = ?' //查询 password
    },
    file: {
        add: 'insert into file( id, userName, name, path) values ( 0, ?, ?, ?)',
        getFile: 'select name,path from file where userName = ?'
    }
}

module.exports = sqlMap;