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

var AutoNaviRoute = function(){
	// get Service for Driving 
	
	var oStartPosition 	= document.getElementById("AddressFrom");
	var oWayPoint 		= document.getElementById("AddressVia");
	var oDestination	= document.getElementById("AddressTo"); 
	var that = this;
	
	var fnRouteCallback = function(){
		oRouting = new AMap.Driving({
			map : that.oAutoNaviMap
		});
		
		
		oRouting.search([{keyword : oStartPosition.value},
		                 {keyword : oWayPoint.value},
		                 {keyword : oDestination.value}
				] , function(status, Result){
			
				})
		
	};
	
	//AMap.service("AMap.Transfer" ,fnRouteCallback);   Route for Bus
	//AMap.service("AMap.Walking" ,fnRouteCallback);    Route for Walking
	AMap.service("AMap.Driving" ,fnRouteCallback);     // Route for Driving
	
}

window.onload = init;