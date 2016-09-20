angular.module('ExampleApp', [])
  .controller('ExampleController', ['GenerateService', 'RandomService', function(GenerateService, RandomService) {
    var _this = this;
    _this.name = "user";
    _this.jsonText = `{
    "id":1,
    "name":"Melisa",
    "login":"4234",
    "auth": {
       "token":"wioweirweiorioweriwierowew",
       "time":"Tue Sep 20 2016 09:42:11 GMT+0500 (Западная Азия (зима))"
     }
}`;
    _this.baseUrl = "www.fakejson.com/";
    _this.getUrl = function() {
      return _this.baseUrl + _this.name;
    };
    _this.generateData = function() {
      let count = RandomService.getNumber(0, 10)
      let JS = JSON.parse(_this.jsonText);
      _this.result = [];
      if (typeof(JS) != "object")
        return;
      for (let i = 0; i < count; i++) {
        _this.result.push(GenerateService.getRandomCopy(JS));
      }
    };
  }])
  .service("GenerateService", ["RandomService", function(RandomService) {
    return {
      getRandomCopy: function(object) {
        var copyObject = angular.copy(object);
        for (var p in object) {
          let val = object[p];
          switch (true) {
            case (typeof val == "string" && new Date(val) != "Invalid Date" && /[A-Z]/.test(val)):
              copyObject[p] = RandomService.getDate();
              break;
            case (typeof val == "string"):
              copyObject[p] = RandomService.getString(val.length);
              break;
            case (typeof val == "number"):
              copyObject[p] = RandomService.getNumber();
              break;
            case (typeof val == "object"):
              copyObject[p] = this.getRandomCopy(val);
              break;
            case (val instanceof Array):
              throw "Not implemented";
          }
        }
        return copyObject;
      }
    };
  }])
  .service("RandomService", function() {
    return {
      getNumber: function(min = 0, max = Number.MAX_VALUE) {
        return min + Math.ceil(Math.random() * (max - min));
      },
      getString: function(length) {
        return Math.random().toString(36).slice(-length);
      },
      getDate: function(min = new Date(1900, 1, 1), max = new Date()) {
        return new Date(min.getTime() + Math.random() * (max.getTime() - min.getTime()));
      }
    };
  });
