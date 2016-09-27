/**
 * Created by avzal on 23.09.2016.
 */
var RandomService=require("./RandomService");

exports.generate=function(config){
	var copyObject={}
	for(var p in config){
		var val=config[p];
		switch(val.type){
			case "date":
				copyObject[p]=RandomService.getDate(val.min,val.max);
				break;
			case "string":
				if(val.regex)
					copyObject[p]=RandomService.getRegex(val.regex);
				else
					copyObject[p]=RandomService.getString(val.min,val.max);
				break;
			case "number":
				copyObject[p]=RandomService.getNumber(val.min,val.max);
				break;
			case "object":
				copyObject[p]=exports.generate(val);
				break;
			case (val instanceof Array):
				throw "Not implemented";
		}
	}
	return copyObject;
};
exports.generateArray=function(object,count){
	var result=[];
	if(typeof(object)!="object")
		return result;
	for(var i=0; i<count; i++){
		result.push(exports.generate(object));
	}
	return result;
};
exports.getConfig=function(object){
	var configObject={};
	for(var p in object){
		var val=object[p];
		switch(true){
			// We need more complex check for date
			case (typeof val=="string" && new Date(val)!="Invalid Date" && /[A-Z]/.test(val)):
				configObject[p]={
					type:"date",
					max :new Date(),
					min :new Date(1978,1,1),
					dmax:new Date(),
					dmin:new Date(1978,1,1)
				};
				break;
			case (typeof val=="string"):
				configObject[p]={
					type :"string",
					max  :val.length,
					min  :0,
					dmax :val.length,
					dmin :0,
					regex:null
				};
				break;
			case (typeof val=="number"):
				configObject[p]={
					type:"number",
					max :+"9".repeat(val.toString().length),
					min :0,
					dmax:+"9".repeat(val.toString().length),
					dmin:0
				};
				break;
			case (typeof val=="object"):
				configObject[p]=exports.getConfig(val);
				configObject[p].type="object";
				break;
		}
	}
	return configObject;
},
	exports.extend=function(newConfig,oldConfig){
		oldConfig=oldConfig || {};
		var resultConfig={};
		for(var p in newConfig){
			if(oldConfig[p] && (oldConfig[p].type!=newConfig[p].type || !oldConfig[p].isModified))
				resultConfig[p]=newConfig[p];
			else if(oldConfig[p])
				resultConfig[p]=oldConfig[p];
			else
				resultConfig[p]=newConfig[p];
		}
		return resultConfig;
	};