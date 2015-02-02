referencia = {};

referencia.obtenerReferencia = function(data, ele){
	return $.ajax({
		type:'GET',
		url:UrlCollection.REFERENCIAS,
		data:data,
		dataType:'JSONP',
		async:true,
		crossdomain:true,
		success:function(data){
			if(data){
				$.each(data, function(key, val){
					$(ele).append('<option value="'+val.referencia+'">'+val.referencia+'</option>');				
				})				
			}
		}
	});

}