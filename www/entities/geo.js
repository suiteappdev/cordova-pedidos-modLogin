var geo = {};
geo.myPosition = {};
geo.myPosition.latitude = '';
geo.myPosition.longitude = '';
geo.cityName = null;

geo.getMyPosition = function(){
	navigator.geolocation.getCurrentPosition(function(position){
		$.ajax({
			type:'GET',
			url:'http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true',
			success:function(data){
				geo.cityName = data.results[1].formatted_address;
			}
		});
	}, function(error){
		console.log(error);
	});
}
