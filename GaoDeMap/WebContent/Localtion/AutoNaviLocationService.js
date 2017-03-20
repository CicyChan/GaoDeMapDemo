var that = this; 

var init = function (){
	
	//init Map
	// Center : BeiJing
	// Language for 3 option :  zh-cn , en , zh_en
	
	that.oAutoNaviMap = new AMap.Map('GaodeMap', {
        center:[116.397428, 39.90923],
        zoom:10,
        lang: 'en'
     });
	
	//add Map plugin in :   toolbar , Scale
	
	that.oAutoNaviMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
		    function(){
		
		        that.oAutoNaviMap.addControl(new AMap.ToolBar());
		 
		        that.oAutoNaviMap.addControl(new AMap.Scale());
		 
		       // that.oAutoNaviMap.addControl(new AMap.OverView({isOpen:true}));
	 });
};

// add marker via latitude and longtitude 
var renderforLng = function(){
	
	this.oAutoNaviMap.clearMap();
	
	var oLatitude, oLongtitude, iLatitude, iLangtitude;
	
	oLatitude = document.getElementById("Latitude");
	oLongtitude = document.getElementById("Longtitude");
	
	
	if(oLatitude.value !== '' 
		&& oLongtitude.value !== '' 
		&& parseFloat(oLatitude.value)
		&&  parseFloat(oLongtitude.value)){
		
		var oMarker = new AMap.Marker({
			position : [
				 parseFloat(oLongtitude.value),
				 parseFloat(oLatitude.value)
			]
		});
		
		oMarker.setMap(this.oAutoNaviMap);
		that.oAutoNaviMap.setCenter([	 parseFloat(oLongtitude.value),
		                				 parseFloat(oLatitude.value)]);
	}else{
		console.log("Invalid latitide , Longtitude")
	}
	
	
};

//render the address infomaiton via address
var renderforAddress = function(){
	var that = this;
	this.oAutoNaviMap.clearMap();
	
	var oAddress = document.getElementById("Address");
	
	var fnGeoCodeForAddess = function(status, result){
		if(status === 'complete' && result.info === 'OK'){
			//render it to Map 
			var aGeoCodes = result.geocodes;
			for(var i = 0; i < aGeoCodes.length; i++ ){
				var oMarker = new AMap.Marker({
					map : that.oAutoNaviMap,
					position : aGeoCodes[i].location
				});
				
				that.oAutoNaviMap.setCenter(aGeoCodes[i].location);
			}
			
		}else{
			console.log("Invalid address ")
		}
	}
	
	var fnGetGeoCodeCallBack = function(){
		geoCoder = new AMap.Geocoder(); 
		
		geoCoder.getLocation(oAddress.value, fnGeoCodeForAddess)
	};
	
	AMap.service('AMap.Geocoder', fnGetGeoCodeCallBack);
};



window.onload = init;