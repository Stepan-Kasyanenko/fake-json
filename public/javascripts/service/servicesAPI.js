/**
 * Created by avzal on 23.09.2016.
 */
angular.module('FakeApp')
	.service("ConfigService",["$http",function($http){
		var base_url = "api";
		function getUrl(url){
			return base_url+"/"+url;
		}
		return {
			getConfig:function(){
				return $http.get(getUrl("getConfig"));
			},
			addConfig:function(name,json_config,json){
				return $http.post(getUrl("addConfig"),{name:name,json_config:JSON.stringify(json_config),json:JSON.stringify(json)});
			}
		};
	}])