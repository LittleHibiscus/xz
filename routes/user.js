//----------------创建路由器对象-------------
const express=require('express');
//引入连接池对象,引入上一级的pool.js
const pool=require('../pool.js');
var router=express.Router();
//添加路由
//***************1.用户注册******************
router.post('/reg',function(req,res){
    var obj=req.body;
	console.log(obj);
	//验证数据是否为空
	if(!obj.uname){//如果为空
		res.send({code:401,msg:'uname required'});
		return;//阻止往后执行
	}else if(!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		return;//阻止往后执行
	}
	else if(!obj.email){
		res.send({code:403,msg:'email required'});
		return;//阻止往后执行
	}
	else if(!obj.phone){
		res.send({code:404,msg:'phone required'});
		return;//阻止往后执行
	}
	//执行sql语句
	pool.query('INSERT INTO xz_user SET ?',[obj],function(err,result){
		if(err) throw err;
		console.log(result);
		//如果注册成功//{code:200,msg:'register suc'}
		if(result.affectedRows>0){
			res.send({code:200,msg:'register suc'});
		}
	});
	//res.send('注册成功');
});

//***************2.用户登录*******************
router.post('/login',function(req,res){
	//2.1获取数据
	var obj=req.body;
	console.log(obj);
	//2.2验证数据是否为空
	if(!obj.uname){
	res.send({code:401,msg:'uname required'});
		return;//阻止往后执行
	}
	else if(!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		return;
	}
	else{
		res.send({code:301,msg:'用户名或密码错误'});
		return;
	}
	//2.3执行sql语句
	//查找用户名和密码同时满足的数据
	pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],function(err,result){
	if(err) throw err;
	console.log(result);
	//判断是否登录成功
	if(result.length>0){
		res.send({code:200,msg:'login suc'});
	}else{
	  res.send({code:301,msg:'login err'});
	}
	
		});
//res.send('登录成功');
});

//***************3.用户检索********************
router.get('/detail',function(req,res){
	//3.1获取数据
	var obj=req.query;
	console.log(obj);
	//3.2验证是否为空
	if(!obj.uid){
		res.send({code:401,msg:'uid required'});
		return;
	}
 
	//3.3查询用户表中编号对应的数据
	pool.query('SELECT *FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
	if(err)throw err;
	//console.log(result);
	//res.send(result);
	//判断是否检索到用户,如果检索到，把该用户的对象检索，把该用户的对象响应到浏览器，否则响应检索不到
	//返回的是一个数组
	if(result.length>0){
	res.send( result[0] );
	}else{
	res.send({code:301,msg:'can not found'});
	}
	});	
});

//***************4.用户修改*********************
router.get('/update',function(req,res){
	//4.1获取数据
	var obj=req.query;
	console.log(obj);
    //4.2验证数据是否为空
	//遍历对象。获取每个属性值
	var i=400;
	for(var key in obj){
	i++;
	// 属性    属性值
	//console.log(key,obj[key]);
	//如果属性值为空，!obj[key]则提示属性名是必须的
	if(!obj[key]){
		res.send({code: i,msg:key+' required'});
		return;
	}
	}
   //4.3执行sql语句
  pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,obj.uid],function(err,result){
  if(err)throw err;
  //console.log(result);
  //判断是否修改成功
   if(result.affectedRows>0){
	  res.send({code:200,msg:'update suc'});
  }else{
	  res.send({code:301,msg:'update err'});
  }
 });
//res.send('修改用户');
});
//***************5.用户列表（分页查询）***********
router.get('/list',function(req,res){
	//5.1获取数据
   var obj=req.query;
   console.log(obj);

   //5.2如果分页为空，默认值是1，如果大小为空，默认是3
   var pno=obj.pno;
   var size=obj.size;
   if(!pno)  pno=1;
   if(!size) size=3;
   //5.3把值转为整型
   pno=parseInt(pno);
   size=parseInt(size);
   //5.4计算开始查询的值start
   var start=(pno-1)*size;
   //5.5执行sql语句
   pool.query('SELECT *FROM xz_user LIMIT ?,?',[start,size],function(err,result){
   if(err) throw err;
   res.send(result);
   });
});
//***************6.用户删除**********************
router.get('/delete',function(req,res){
	//6.1获取数据
	var obj=req.query;
	console.log(obj);
	//6.2验证数据
	if(!obj.uid){
	res.send({code:401,msg:'uid required'});
	return;
	}
	//6.3执行sql语句
	pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
	if(err) throw err;
	
	console.log(result);
	//删除返回对象，只有查询时数组
	if(result.affectedRows>0){
	res.send({code:200,msg:'delete suc'});
	}else{
	res.send({code:301,msg:'delete err'});
	}
	});
    //res.send('删除成功');
})
//导出路由器对象
module.exports=router;