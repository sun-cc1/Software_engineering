var app = angular.module("baseInfo",[]);
app.controller("baseInfoController", [ '$scope', '$http', function($scope, $http){
    /*模拟请求服务数据*/
   /* 城市联动*/
   $scope.provinceName = '请选择省份';
   $scope.cityName = '请选择城市';
    $scope.districtName = '请选择区域';
   $http.get('../data/json-array-of-province.json').success(function(data){
       $scope.province_selected = '';
       $scope.data = data;
       $scope.province =  $scope.data.province;
       /*选择省份*/
       $scope.changeProvince = function(){
           var province_code = $scope.province_selected.code;
           $scope.provinceName = $scope.province_selected.name;
           $http.get('../data/json-array-of-city.json').success(function(data){
               $scope.city_selected = '';
               $scope.data = data;
               var city_list = data.city;
               $scope.city =  $scope.data.city;
               var strArr = [];
               city_list.forEach(function(c){
                   var city_code = c.code;
                   if(province_code.substring(0,2) == city_code.substring(0,2)){
                      strArr.push(c);
                   }
               })
               $scope.city_list = strArr;
           });
       };
       /*选择城市*/

       $scope.changeCity = function(){
            var city_code = $scope.city_selected.code;
           $scope.cityName = $scope.city_selected.name;
            $http.get('../data/json-array-of-district.json').success(function(data){
              $scope.district_selected = '';
              $scope.data = data;
              var district_list = data.district;
              $scope.district =  $scope.data.district;
              var strArr = [];
              district_list.forEach(function(d){
                  var district_code = d.code;
                  if(city_code.substring(0,4) == district_code.substring(0,4)){
                     strArr.push(d);
                  }
              })
              $scope.district_list = strArr;
          });
       }
      /*选择区域*/
       $scope.changeDistrict = function(){
            $scope.districtName = $scope.district_selected.name;
       }
   });
   $scope.user_name = '';
   $scope.user_tel = '';
   $scope.user_address = '';
   $scope.order_date = '';
   $scope.show_mask = false;
    $scope.warn_dec = '';
    $scope.saveBtn = function(){
        if($scope.user_name == ''){
            $scope.warn_dec = '维修人不能为空';
             $scope.show_mask = true;
        }
        else if($scope.user_tel == ''){
            $scope.warn_dec = '联系方式不能为空';
             $scope.show_mask = true;
        }
       else  if($scope.user_address == ''){
            $scope.warn_dec = '地址不能为空';
             $scope.show_mask = true;
        }
        else {
            var mobile_regx = /^1[0-9]{10}$/;
        	 if(!mobile_regx.test($scope.user_tel)) {
        		  $scope.warn_dec = '联系方式格式不对';
                 $scope.show_mask = true;
        		return;
        	}else{
        	     window.location.href = 'm_master.html';
        	}
        }

    }
    $scope.clearBtn = function(){
         $scope.user_name = '';
           $scope.user_tel = '';
           $scope.user_address = '';
           $scope.order_date = '';
    }
    $scope.closeMask = function(){
         $scope.show_mask = false;
    }
 }]);