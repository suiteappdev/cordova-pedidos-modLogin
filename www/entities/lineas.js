var lineas = {};
lineas.miLinea = null;
lineas.misLineas = null;

lineas.ObtenerLineas = function(){
	$.ajax({
		type:'GET',
		data:{identificacion:usuario.info.identificacion},
		url:UrlCollection.OBTENER_LINEAS,
		dataType :'JSONP',
		success:function(data){
			if(!data){
				return;
			}
			
			lineas.misLineas = data;
			if(data.length > 1){
				lineas.bindEvents(data); 
			}else{
				lineas.miLinea = data[0].lineadeprecios;
				Lungo.Router.section('workspace', 'page-2');
			}
		}
	});
}

lineas.bindEvents = function(data){
	Lungo.Router.article('workspace', 'page-6');
	_LinesList = $('#LinesList');

	$.each(data, function(key, val){
		_row = '<li data-linea="'+val.lineadeprecios+'" class="warning line_row" style="border-bottom:1px solid #BDBDBD!important;">' +
		            '<strong style="color:#EDBA22!important;">Linea : '+val.lineadeprecios+'</strong>' +
		            '<small>'+val.descripcion+'</small>' +
        		'</li>';
		_LinesList.append(_row);
	}); 

	$('.line_row').on('tap', function(){
		lineas.miLinea = $(this).data('linea');
		Lungo.Router.article('workspace', 'page-2');				
	});
}
