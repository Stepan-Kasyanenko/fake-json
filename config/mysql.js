/**
 * Created by avzal on 05.05.2016.
 */
"use strict";
var pool=require('mysql').createPool({
	host           :'localhost',
	user           :'user',
	password       :'pass',
	database       :'fakejsondb',
	connectionLimit:100
});

exports.queryParallel=function(params,withTransaction = true){
	return new Promise(function(resolve,reject){
		if(withTransaction){
			pool.getConnection(function(err,connection){
				exports.beginTransaction(connection)
					.then(function(){
						var promises=[];
						for(var i=0; i<params.length; i++){
							var param=params[i];
							promises.push(exports.query(param.sql,param.params,connection));
						}
						Promise.all(promises)
							.then(function(res){
								connection.commit();
								connection.release();
								resolve(res);
							},function(err){
								connection.rollback();
								connection.release();
								reject(err);
							});
					})
					.catch(reject);

			});
		}
		else{
			var promises=[];
			for(var i=0; i<params.length; i++){
				var param=params[i];
				promises.push(exports.query(param.sql,param.params));
			}
			Promise.all(promises).then(resolve,reject);
		}
	});
};
exports.querySequence=function(params,withTransaction=true){
	return new Promise(function(resolve,reject){
		if(!params || params.length===0){
			reject("params is not defined");
			return;
		}
		pool.getConnection(function(err,connection){

			function startExecute(){
				var i=0;
				var result=[];

				function execute(param){
					exports.query(param.sql,param.params,connection)
						.then(function(res){
							result.push(res);
							i++;
							if(i<params.length){
								execute(params[i]);
							}
							else{
								connection.commit();
								connection.release();
								resolve(result);
							}
						})
						.catch(function(err){
							connection.rollback();
							connection.release();
							reject(err);
						});
				}

				execute(params[i]);
			}

			if(withTransaction){
				exports.beginTransaction(connection)
					.then(function(){
						startExecute();
					})
					.catch(reject);
			}
			else{
				startExecute();
			}

		});
	});
};
exports.query=function(sql,props,conn){
	return new Promise(function(resolve,reject){
		function execute(pConnect,isNeedRelease){
			pConnect.query(
				sql,props,
				function(err,res){
					if(isNeedRelease)
						pConnect.release();
					if(err)
						reject(err);
					else
						resolve(res);
				}
			);
		}

		if(conn)
			execute(conn,false);
		else
			pool.getConnection(function(err,connection){
				if(err)
					reject(err);
				else
					execute(connection,true);
			});
	});
};
exports.getConnection=function(){
	return new Promise(function(resolve,reject){
		pool.getConnection(function(err,connection){
			if(err)
				reject(err);
			else
				resolve(connection);
		});
	});
};
exports.beginTransaction=function(connection){
	return new Promise(function(resolve,reject){
		connection.beginTransaction(function(err){
			if(err)
				reject(err,connection);
			else
				resolve(connection);
		});
	});
};
