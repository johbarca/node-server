var sqlMap = {
    user:{
        add: 'insert into user( name, password) values ( ?, ?)',
        select_name: 'SELECT * from user where name = ?',    //查询 username
        select_password: 'SELECT * from user where password = ?'      //查询 password
    }
}

module.exports = sqlMap;