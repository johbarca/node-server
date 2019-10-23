/*
 * @Author: liulicheng
 * @Github: https://github.com/johbarca
 * @Date: 2019-05-29 11:08:05
 * @LastEditors: liulicheng
 * @LastEditTime: 2019-08-16 17:34:32
 */
var sqlMap = {
    user: {
        add: 'insert into user( id, name, password) values ( 0, ?, ?)',
        select_name: 'SELECT * from user where name = ?', //查询 username
        select_password: 'SELECT * from user where password = ?' //查询 password
    },
    file: {
        add: 'insert into file( id, userName, name, path) values ( 0, ?, ?, ?)',
        getFile: 'select name,path from file where userName = ?'
    },
    live_info: {
        getLiveInfo: 'select * from live_info where id < 200'
    }
}

module.exports = sqlMap;