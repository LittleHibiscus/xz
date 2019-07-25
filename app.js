//-----------------------服务器文件---------------
//(1)引入express模块
const express=require('express');
//引入用户路由器
const userRouter=require('./routes/user.js');
//引入商品路由器
const productRouter=require('./routes/product.js');
//引入body-paraser中间件,post请求
const bodyParser=require('body-parser');
//(2)创建web服务器
var app=express();
//(3)监听端口8080
app.listen(8080);




//使用body-parser 中间件，将post请求的数据转为对象
app.use(bodyParser.urlencoded({
	extended:false//使用查询querystring字符串
}) );
//中间件，托管静态资源到./public目录
app.use(express.static('./public'));
//使用路由器用户 /user下   /user/reg，挂载在服务器下
app.use('/user',userRouter);
//使用商品路由器，挂载到/product   /product/list
app.use('/product',productRouter);