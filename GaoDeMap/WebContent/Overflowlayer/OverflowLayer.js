var init = function(){
	var map = new AMap.Map('container', {
        resizeEnable: true,
   			zoom: 5,
   			zooms:[4,18],
   			center: [106.485352, 34.603692]
		});
		var createMarker = function(data,hide) {
			var div = document.createElement('div');
			div.className = 'circle';
			var r = Math.floor(data.count / 1024);
			div.style.backgroundColor = hide?'#393':'#09f';
			div.innerHTML = data.count || 0;
			var marker = new AMap.Marker({
				content: div,
				title:data.name,
				position: data.center.split(','),
				offset: new AMap.Pixel(-24, 5),
				zIndex: data.count
			});
			
			if(!hide){
				marker.setMap(map)
			}
			
			return marker;
		}
		var _onZoomEnd = function(e) {
			if (map.getZoom() < 6) {
				for (var i = 0; i < markers.length; i += 1) {
					map.remove(markers[i].subMarkers)
				}
				map.add(markers);
			}
		}
		
		var markers = []; //province见Demo引用的JS文件
		for (var i = 0; i < provinces.length; i += 1) {
			var marker = createMarker(provinces[i]);
			markers.push(marker);
		}
		//map.setFitView();
		AMap.event.addListener(map, 'zoomend', _onZoomEnd);
}