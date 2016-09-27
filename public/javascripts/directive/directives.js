/**
 * Created by avzal on 22.09.2016.
 */
angular.module('FakeApp')
	.directive("configObject",function(RecursionHelper){
		return {
			restrict:"A",
			scope   :{
				configObject    :"=",
				configObjectName:"="
			}, //<div config-object="value" config-object-name="key" ng-switch-when="object"></div>
			//<div log-dir="::value" ng-switch-when="object"></div>
			template:`
		<h3>{{configObjectName}}:</h3>
<ul ng-repeat="(key,value) in configObject track by key">
	<hr>
	<li config-object-string="value" config-object-string-key="key" ng-if="value.type=='string'"></li>
	<li config-object-number="value" config-object-number-key="key" ng-if="value.type=='number'"></li>
	<li config-object-date="value" config-object-date-key="key" ng-if="value.type=='date'"></li>
	<li config-object="value" config-object-name="key" ng-if="value.type=='object'"></li>
	</ul>`,
			compile :function(element){
				// Use the compile function from the RecursionHelper,
				// And return the linking function(s) which it returns
				return RecursionHelper.compile(element);
			}
		};
	})
	.directive("configObjectString",function(RandomService){
		return {
			scope   :{
				configObjectString   :"=",
				configObjectStringKey:"="
			},
			template:`<div>
	<h3>{{configObjectStringKey}}:</h3>
<input type="number" ng-change="setModified()" ng-model="configObjectString.min">
	<input type="number" ng-change="setModified()" ng-model="configObjectString.max">
	<button ng-show="configObjectString.isModified" ng-click="setDefaultModified()">default</button>
<div>
regex: <input ng-change="testRegex()" ng-model="configObjectString.regex">
	<button ng-show="configObjectString.regex" ng-click="testRegex()">generate</button>
	<div>example: {{exampleRegex}} <span ng-show="errorText" class="error">{{errorText}}</span></div>
</div>
<div>
Predefined strings:
	<select ng-model="predefined" ng-options="item as item for item in strings"><option value="">Choose</option></select>
</div>
</div>`,
			link    :function(scope,element){
				scope.setModified=function(){
					scope.configObjectString.isModified=true;
				};
				scope.strings=["Names","Email","Phone"];
				scope.testRegex=function(){
					try{
						if(scope.configObjectString.regex)
							scope.exampleRegex=RandomService.getRegex(scope.configObjectString.regex);
						else
							scope.exampleRegex=null;
						scope.errorText=null;
					}catch(e){
						scope.errorText=e.message;
					}
				};
				scope.setDefaultModified=function(){
					scope.configObjectString.isModified=null;
					scope.configObjectString.min=scope.configObjectString.dmin;
					scope.configObjectString.max=scope.configObjectString.dmax;
				};
			}
		};
	})
	.directive("configObjectNumber",function(){
		return {
			scope   :{
				configObjectNumber   :"=",
				configObjectNumberKey:"="
			},
			template:`<div>
	<h3>{{configObjectNumberKey}}:</h3>
<input type="number" ng-change="setModified()" ng-model="configObjectNumber.min">
	<input type="number" ng-change="setModified()" ng-model="configObjectNumber.max">
	<button ng-show="configObjectNumber.isModified" ng-click="setDefaultModified()">default</button>
</div>`,
			link    :function(scope,element){
				scope.setModified=function(){
					scope.configObjectNumber.isModified=true;
				};
				scope.setDefaultModified=function(){
					scope.configObjectNumber.isModified=null;
					scope.configObjectNumber.min=scope.configObjectNumber.dmin;
					scope.configObjectNumber.max=scope.configObjectNumber.dmax;
				};
			}
		};
	})
	.directive("configObjectDate",function(){
		return {
			scope   :{
				configObjectDate   :"=",
				configObjectDateKey:"="
			},
			template:`<div> We need add datepicker
	<h3>{{configObjectDateKey}}:</h3>
<input ng-change="setModified()" ng-model="configObjectDate.min">
	<input ng-change="setModified()" ng-model="configObjectDate.max">
	<button ng-show="configObjectDate.isModified" ng-click="setDefaultModified()">default</button>
</div>`,
			link    :function(scope,element){
				scope.setModified=function(){
					scope.configObjectDate.isModified=true;
				};
				scope.setDefaultModified=function(){
					scope.configObjectDate.isModified=null;
					scope.configObjectDate.min=scope.configObjectDate.dmin;
					scope.configObjectDate.max=scope.configObjectDate.dmax;
				};
			}
		};
	})
	.service('RecursionHelper',['$compile',function($compile){
		return {
			/**
			 * Manually compiles the element, fixing the recursion loop.
			 * @param element
			 * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
			 * @returns An object containing the linking functions.
			 */
			compile:function(element,link){
				// Normalize the link parameter
				if(angular.isFunction(link)){
					link={
						post:link
					};
				}

				// Break the recursion loop by removing the contents
				var contents=element.contents().remove();
				var compiledContents;
				return {
					pre :(link && link.pre)?link.pre:null,
					/**
					 * Compiles and re-adds the contents
					 */
					post:function(scope,element){
						// Compile the contents
						if(!compiledContents){
							compiledContents=$compile(contents);
						}
						// Re-add the compiled contents to the element
						compiledContents(scope,function(clone){
							element.append(clone);
						});

						// Call the post-linking function, if any
						if(link && link.post){
							link.post.apply(null,arguments);
						}
					}
				};
			}
		};
	}])