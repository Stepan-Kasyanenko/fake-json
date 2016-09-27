/**
 * Created by avzal on 22.09.2016.
 */
angular.module('FakeApp')
	.controller('MainController',['GenerateService','RandomService',"ConfigService",'$timeout',function(GenerateService,RandomService,ConfigService,$timeout){
		var _this=this;
		_this.current={name:"",identifier:"",json:{}};
		_this.options={};
		_this.baseUrl="http://localhost:3000/q"; // simulate session id
		_this.jsons=[];

		this.getUrl=function(){
			return _this.baseUrl+"/"+_this.current.identifier+"/"+_this.current.name;
		};
		_this.generateData=function(){
			var count=3;
			_this.result=GenerateService.generateArray(_this.config,count);
		};

		_this.getProperties=function(){
			var JS=_this.current.json;
			var newConfig=GenerateService.getConfig(JS);
			_this.config=GenerateService.extend(newConfig,_this.config);
		};

		_this.setCurrent=function(js){
			_this.current=js;
		}

		_this.saveModel = function(){
			ConfigService.addConfig(_this.current.name,_this.config,_this.current.json);
		}
		function createDefault(){
			return {
				name      :"user",
				identifier:RandomService.getString(10,10),
				json      :{
					"id"   :1,
					"name" :"Melisa",
					"login":"4234",
					"auth" :{"token":"wioweirweiorioweriwierowew","time":"1981-07-19T07:33:51.454Z"}
				}
			};
		}

		ConfigService.getConfig()
			.then(function(result){
				if(result.data[0]){
					_this.jsons=result.data.map(function(item){ return {name:item.name,identifier:item.identifier,json:JSON.parse(item.json)}});
					_this.current=_this.jsons[0];
				}else{
					_this.current=createDefault();
					_this.jsons.push(_this.current);
				}
				//workaround for set mode "code"
				$timeout(function(){
					_this.options={mode:'code'};
				},0);
			}).catch(function(err){
				console.error(err);
			});

		_this.getProperties();
	}]);