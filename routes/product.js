//***********************商品路由器*********************
//引入express
const express=require('express');
//引入连接池 上一级目录 ../pool.js
const pool=require('../pool.js');
//创建路由器对象

var router=express.Router();
//添加路由
//*********************1.商品列表***********************
router.get('/list',function(req,res){
  //1.1获取数据
  var obj=req.query;
  console.log(obj);
  //1.2验证是否为空,设置页码为1，大小为9
  var pno=obj.pno;
  var size=obj.size;
  if(!pno) pno=1;
  if(!size) size=9;
  //1.3转为整型 
  pno=parseInt(pno);
  size=parseInt(size);
  //1.4计算开始查询start
  var start=(pno-1)*size;
  //1.5执行sql语句，查询商品编号，价格和标题
  pool.query('SELECT lid,price,title FROM xz_laptop LIMIT ?,?',[start,size],function(err,result){
  if(err) throw err;
  res.send(result);
  });
  
 });

//2.商品详情
//3.添加商品
//4.删除商品
//5.修改商品



//导出路由器对象 对象赋给对象
module.exports=router;