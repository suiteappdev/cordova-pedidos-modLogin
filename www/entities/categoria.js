var categoria = {};

categoria.familia1 = config.CATEGORIA_SISTEMA;
categoria.familia2 = config.CATEGORIA_SISTEMA;
categoria.familia3 = config.CATEGORIA_SISTEMA;
categoria.familia4 = config.CATEGORIA_SISTEMA;
categoria.familia5 = config.CATEGORIA_SISTEMA;

categoria.renderizarCategoria = function(RawData){
	$('#categorylist').show();
	_optionCollection = [];

	$(RawData).each(function(key, val){
		if(val.id != config.CATEGORIA_SISTEMA){
			_optionCollection.push('<div class="category_row colset-1 animated zoomInRight" data-id='+val.id+'><img src="'+val.urlimg+'" ></div>');
		}
	});

	$('#categorylist').html(_optionCollection.join(''));
	categoria.bindEvents();
}

categoria.obtenerFamilia1 = function(){
	$.ajax({
		type:'GET',
		url:config.BASEPATH+'categoria/familia1?callback=?',
		dataType: 'jsonp',
		success:function(data){
			categoria.renderizarRaiz(data);
		}
	});
}

categoria.obtenerFamilia2 = function(data){
	$.ajax({
		type:'GET',
		data:data,
		url:config.BASEPATH+'categoria/familia2?callback=?',
		dataType: 'jsonp',
		success:function(data){
			categoria.renderizarCategoria(data);
		}

	});
}

categoria.obtenerFamilia3 = function(data){
	$.ajax({
		type:'GET',
		data:data,
		url:config.BASEPATH+'categoria/familia3?callback=?',
		crossdomain : true,
		dataType: 'jsonp',
		success:function(res){
			categoria.renderizarCategoria(res);
		}

	});
}

categoria.obtenerFamilia4 = function(data){
	$.ajax({
		type:'GET',
		data:data,
		url:config.BASEPATH+'categoria/familia4?callback=?',
		dataType: 'jsonp',
		success:function(data){
			categoria.renderizarCategoria(data);
		}

	});
}

categoria.obtenerFamilia5 = function(data){
	$.ajax({
		type:'GET',
		data:data,
		url:config.BASEPATH+'categoria/familia5?callback=?',
		dataType: 'jsonp',
		success:function(data){
			categoria.renderizarCategoria(data);
		}

	});
}

categoria.bindEvents = function(){
	$('.category_row').off('tap');
	$('.category_row').on('tap', function(){
		if($(this).hasClass('animated zoomInRight')){
			$(this).removeClass('animated zoomInRight');
		}

		$(this).addClass('animated shake');

		$(this).on('animationend webkitAnimationEnd', function(){
			$(this).removeClass('animated shake');
			_val = $(this).data('id');
			
			if($(this).data('root')){
				categoria.mostrarfamilia2(_val);
				categoria.familia1 = _val;
				
				history.stack.push({
					fn: categoria.mostrarfamilia1,
					prop : 'familia1'
				});

			}else if(categoria.familia2 == config.CATEGORIA_SISTEMA){
				categoria.mostrarfamilia3(_val);
				categoria.familia2 = _val;
				
				history.stack.push({
					fn:categoria.mostrarfamilia2,
					arg : [categoria.familia1],
					prop : 'familia2'
				});	

			}else if(categoria.familia3 == config.CATEGORIA_SISTEMA){
				categoria.mostrarfamilia4(_val);
				categoria.familia3 = _val;

				history.stack.push({
					fn:categoria.mostrarfamilia3,
					arg :[categoria.familia2],
					prop : 'familia3'
				});

			}else if(categoria.familia4 == config.CATEGORIA_SISTEMA ){
				categoria.mostrarfamilia5(_val);
				categoria.familia4 = _val;

				history.stack.push({
					fn:categoria.mostrarfamilia4,
					arg : [categoria.familia3],
					prop : 'familia4'
				});	
			}else{
				producto.ObtenerProductosCategoria({
					familia1 : categoria.familia1,
					familia2 : categoria.familia2,
					familia3 : categoria.familia3,
					familia4 : categoria.familia4,
					familia5 : 0,
					linea: lineas.miLinea
				});			
			}
		});
	});

	$('#btn-todo').off().on('tap', function(){
        if(lineas.miLinea == null){
		    navigator.notification.alert(
		        'debe elegir su lista de precio',  // message
		        function(){
                	Lungo.Router.article('workspace', 'page-6');
		        },       
		        'Sin Lista',            // title
		        'Ok'                  // buttonName
		    );
            return;
        }

		producto.obtenerTodo({
			familia1 : categoria.familia1, 
			familia2 : categoria.familia2,
			familia3 : categoria.familia3, 
			familia4 : categoria.familia4,
			familia5 : categoria.familia5,
			linea: lineas.miLinea
		});

		history.stack.push({
			fn:categoria.obtenerFamilia1
		})
	});
}

categoria.renderizarRaiz = function(RawData){
	$('#categorylist').show();
	_optionCollection = [];

	$(RawData).each(function(key, val){
		if(val.id != config.CATEGORIA_SISTEMA){
			_optionCollection.push('<div class="category_row colset-1" data-root="true" data-id='+val.id+'><img src="'+val.urlimg+'" ></div>');
			$('#categorylist').html(_optionCollection.join(''));
			$('#product_list').html(' ');
			categoria.bindEvents();
		}
	});


}

categoria.mostrarfamilia2 = function(familia1){
	categoria.obtenerFamilia2({
		familia : familia1 
	});

	$('#product_list').html(' ');

	producto.ObtenerProductosCategoria({
		familia1 : familia1,
		familia2 : 1,
		familia3 : 1,
		familia4 : 1,
		familia5 : 1,
		linea    : lineas.miLinea
	});
}

categoria.mostrarfamilia3 = function(familia2){
	categoria.obtenerFamilia3({
		familia: familia2
	});

	$('#product_list').html(' ');

	producto.ObtenerProductosCategoria({
		familia1 : categoria.familia1,
		familia2 : familia2,
		familia3 : 1,
		familia4 : 1,
		familia5 : 1,
		linea    : lineas.miLinea
	});

}

categoria.mostrarfamilia4 = function(familia3){
	categoria.obtenerFamilia4({
		familia : familia3
	});
	
	$('#product_list').html(' ');

	producto.ObtenerProductosCategoria({
		familia1 : categoria.familia1,
		familia2 : categoria.familia2,
		familia3 : familia3,
		familia4 : 1,
		familia5 : 1,
		linea    : lineas.miLinea
	});
}

categoria.mostrarfamilia5 = function(familia4){
	categoria.obtenerFamilia5({
		familia : familia4
	});
}

categoria.todos = function(familia){

}



