/**
 * Created by avzal on 23.09.2016.
 */
var query=require("../config/mysql").query;
var RandomService=require("./RandomService");
var GenerateService=require("./GenerateService.js");

function isSessionExist(session_id,name){
	return query("select identifier from json_configs where session_id=? and name=?",[session_id,name]);
}

exports.add=function(session_id,name,json_config,json){
	console.log("add",session_id,name,json_config,json);
	return new Promise(function(resolve,reject){
		isSessionExist(session_id,name)
			.then(function(rows){
				var ident=rows[0];
				if(ident){
					console.log('ident.identifier',ident.identifier);
					query("update json_configs set config=?,json=? where session_id=? and name=? and identifier=?",[json_config,json,session_id,name,ident.identifier]).then(resolve).catch(reject);
				}
				else{
					console.log('ident.identifier',ident.identifier);
					query("insert into json_configs(session_id,identifier,name,config,json) values (?,?,?,?,?)",[session_id,ident.identifier,name,json_config,json]).then(resolve).catch(reject);
				}
			})
			.catch(reject);
	});
};

exports.get=function(session_id){
	return query("select * from json_configs where session_id=?",[session_id]);
};
exports.getRandomArray=function(identifier,name,count=10){
	return new Promise(function(resolve,reject){
		query("select config from json_configs where identifier=? and name=?",[identifier,name])
			.then(function(result){
				if(result[0]){
					var config=JSON.parse(result[0].config);
					var array=GenerateService.generateArray(config,count);
					resolve(array);
				}else{
					reject({status:400,err:{}})
				}
			})
			.catch(function(err){
				reject({status:500,err:err})
			});
	});
};