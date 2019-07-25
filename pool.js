//-----------------创建连接池对象--------
//前提，引入mysql模块
const mysql=require('mysql');
var pool=mysql.createPool({
	host:'127.0.0.1',
	port:3306,
	user:'root',
	password:'',
	database:'xz',
	connectionLimit:15
});
//导出连接池对象
module.exports=pool;

