var categoria_1 = {};
categoria_1.selected = null;

categoria_1.renderizar = function(RawData){
	_optionCollection = [];

	$(RawData).each(function(key, val){
		_optionCollection.push('<div class="category_row colset-1" data-id='+val.id+'><img src="'+val.urlimg+'" ></div>');
	});

	$('#categoryList').html(_optionCollection.join(''));
	
	categoria_1.bindEvents();
} 

categoria_1.obtenerCategorias = function(Id){
	$.ajax({
		type:'GET',
		url:UrlCollection.CATEGORIAS_HIJAS,
		data:{id: Id},
		dataType: 'jsonp',
		success:function(data){
			categoria_1.renderizar(data);
		}

	});
}

categoria_1.bindEvents = function(){
	$('[data-direction="PREV"').off('tap');

	$('[data-direction="PREV"').on('tap', function(){
		categoria.obtenerCategorias();
	});

	$('.category_row').on('tap', function(){
		$(this).addClass('animated shake');

		$(this).on('animationend webkitAnimationEnd', function(){
			$(this).removeClass('animated shake');
			categoria_1.selected = $(this).data('id');
			producto.obtenerProductos(categoria.selected, $(this).data('id'));
			Lungo.Router.section('workspace');
		});
	});
}