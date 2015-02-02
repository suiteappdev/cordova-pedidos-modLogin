var usuario = {};
usuario.info = {};
usuario.info.identificacion = null;
usuario.conectado = false;

usuario.connectar = function(user, pwd ){
	try{
		$.ajax({
			url:UrlCollection.AUTH,
			type:'GET',
			data:{txtLoginUsername: user, txtLoginPassword:pwd },
			crossdomain : true,
			dataType:'jsonp',
			success:function(data){
				if(data.session){
					usuario.conectado = true;
					usuario.info.identificacion = data.identificacion;
					lineas.ObtenerLineas();
				}else{
		            navigator.notification.alert(
		                'Datos incorrectas Usuario/Contraseña',  // message
		                function(){
		                },       
		                'Error',            // title
		                'Ok'                  // buttonName
	                );
				}
			}
		});		
	}catch(e){
	    navigator.notification.alert(
	        'Tiempo de espera agotado intenta mas tarde',  // message
	        function(){
	        },       
	        'Error',            // title
	        'Ok'                  // buttonName
	    );
	}
}

usuario.checkSession = function(){
	return $.ajax({
		url:UrlCollection.CHECKSESSION,
		type:'GET',
		crossdomain : true,
		dataType:'jsonp'
	});
}

usuario.cerrar = function(){
	$.ajax({
		url:UrlCollection.CLOSESESSION,
		type:'GET',
		crossdomain : true,
		dataType:'jsonp',
		success:function(data){
			usuario.conectado = false;
		}
	});
}


