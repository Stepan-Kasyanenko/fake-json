/**
 * Created by avzal on 23.09.2016.
 */
var RandExp = require("../node_modules/randexp/build/randexp.min.js");

module.exports={
	getNumber:function(min,max){
		return min+Math.ceil(Math.random()*(max-min));
	},
	getString:function(min,max){
		var length=this.getNumber(min,max);
		return Math.random().toString(36).slice(-length);
	},
	getDate  :function(min,max){
		return new Date(min.getTime()+Math.random()*(max.getTime()-min.getTime()));
	},
	getRegex :function(regex){
		return new RandExp(regex).gen();
	}
}