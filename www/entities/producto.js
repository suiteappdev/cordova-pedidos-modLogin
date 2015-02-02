var producto = {}
producto.back = false;

producto.ObtenerProductosCategoria = function(data){
	_page = $('#page-2');
	_product_list  = $('#product_list');

	try{
		$.ajax({
			type:"GET",
			url:UrlCollection.PRODUCTOS_CATEGORIAS,
			data:data,
			dataType:'jsonp',
			beforeSend: function(){
				Lungo.Notification.show();
			},
			crossdomain:true,
			success:function(data){
				if(!data){
					Lungo.Notification.hide();
					return;
				}
				
				Lungo.Notification.hide();

				$.each(data, function(key, val){
					product_template = $('<div class="colset-3 animated"><div class="wrap"><div class="product-inner"><div class="product_img"><img src=""></div><div class="colset-1 product_description"><span id="product_description" class="colset-1"></span><div class="form"><fieldset class="radius shadow" style="background-color:#FAFABE;"><label>Ref.</label><label class="select "><select id="cmbReferencias"></select></label></fieldset></div><span class="colset-2">Embalaje: </span><span id="product_embalaje" class="colset-2"></span></div><div class="product-price colset-1"><div class="btn-add colset-2"><a href="#" class="cmdPedir entity button anchor" data-icon="check" data-label="large"><span class="icon shopping-cart"></span><abbr>Pedir</abbr></a></div><div class="price colset-2"><span></span></div></div></div></div></div>');
					product_template.find('.product-inner').attr('data-idpro', val.id);
					_product_img = product_template.find('img').attr('src', val.urlimg);
					_product_img = product_template.find('img').data('entity', val);
					_btnPedir = product_template.find('.cmdPedir').data('entity', val);
					product_template.find('#product_embalaje').text(val.embalaje);
					_product_refs = product_template.find('#cmbReferencias');
					_product_refs.attr('data-id', val.id);
					_product_price = product_template.find('.price span').text(accounting.formatMoney(val.precioventa, { symbol: "COP",  format: "%v %s" })); 
					_product_description = product_template.find('#product_description').text(val.descripcion);
					_product_list.append(product_template);
				});

				$('[data-id]').each(function(key, val){
					referencia.obtenerReferencia({
						idproducto :$(this).data('id')
					}, $(this));
				});

				_page.find('.product_img img').each(function(index, val){
					$(val).on('tap', function(){
						_productObj = $(this).data('entity');
						dialogo.mostrarDialogo({
							confirm:function(){
								_productObj.cantidad = $('#qty').val();
								shoppingcart.agregarProducto(_productObj);

								$('.notification .window').html(' ');
								Lungo.Notification.hide();
							},
							cancel:function(){
								Lungo.Notification.hide();
								$('.notification .window').html(' ');
							}
						}, _productObj);
					});
				});

				_page.find('.cmdPedir').each(function(index, val){
					$(val).on('tap', function(){
						_productObj = $(this).data('entity');
						dialogo.mostrarDialogo({
							confirm:function(){
								_productObj.cantidad = $('#qty').val();
								shoppingcart.agregarProducto(_productObj);

								$('.notification .window').html(' ');
								Lungo.Notification.hide();
							},
							cancel:function(){
								Lungo.Notification.hide();
								$('.notification .window').html(' ');
							}
						}, _productObj);
					});
				});
				

				$(document).on('keyup','#qty', function() {
					producto.linea == "1" ? $('#amount').text(parseInt($(this).val()) * _productObj.precio_a) : $('#amount').text(parseInt($(this).val()) * _productObj.precio_b);
				});

				$(document).on('tap','[data-workspaceBack]', function(){
					producto.back = true;
					Lungo.Router.section('frm-category');
				});	
			}
		});
	}catch(e){
		Lungo.Notification.hide();
	}
}

producto.obtenerTodo = function(data){
	_page = $('#page-2');
	_categorylist = $('#categorylist');
	_product_list  = $('#product_list');
	_categorylist.hide();

	$.ajax({
		type:'GET',
		data:data,
		beforeSend: function(){
			Lungo.Notification.show();
		},
		url:UrlCollection.PRODUCTOS_TODO,
		dataType:'JSONP',
		success : function(data){
				if(!data){
					Lungo.Notification.hide();
					return;
				}

				Lungo.Notification.hide();
				
				_product_list.empty();
				_categorylist.empty();
				
				$.each(data, function(key, val){
					 product_template = $('<div class="colset-3 animated"><div class="wrap"><div class="product-inner"><div class="product_img"><img src=""></div><div class="colset-1 product_description"><span id="product_description" class="colset-1"></span><div class="form"><fieldset class="radius shadow" style="background-color:#FAFABE;"><label>Ref.</label><label class="select "><select id="cmbReferencias"></select></label></fieldset></div><span class="colset-2">Embalaje: </span><span id="product_embalaje" class="colset-2"></span></div><div class="product-price colset-1"><div class="btn-add colset-2"><a href="#" class="cmdPedir entity button anchor" data-icon="check" data-label="large"><span class="icon shopping-cart"></span><abbr>Pedir</abbr></a></div><div class="price colset-2"><span></span></div></div></div></div></div>');
					 product_template.find('.product-inner').attr('data-idpro', val.id);
					_product_img = product_template.find('img').attr('src', val.urlimg);
					_product_img = product_template.find('img').data('entity', val);
					_btnPedir = product_template.find('.cmdPedir').data('entity', val);
					product_template.find('#product_embalaje').text(val.embalaje);
					_product_refs = product_template.find('#cmbReferencias');
					_product_refs.attr('data-id', val.id);
					_product_price = product_template.find('.price span').text(accounting.formatMoney(val.precioventa, { symbol: "COP",  format: "%v %s" })); 
					_product_description = product_template.find('#product_description').text(val.descripcion);
					
					_product_list.append(product_template);

				});

				$('[data-id]').each(function(key, val){
					referencia.obtenerReferencia({
						idproducto :$(this).data('id')
					}, $(this));
				});

				producto.bindUi();
		}
	});

producto.bindUi  =  function(){
	_page = $('#page-2');
	_page.find('.product_img img').each(function(index, val){
		$(val).on('tap', function(){
			_productObj = $(this).data('entity');
			dialogo.mostrarDialogo({
				confirm:function(){
					_productObj.cantidad = $('#qty').val();
					shoppingcart.agregarProducto(_productObj);

					$('.notification .window').html(' ');
					Lungo.Notification.hide();
				},
				cancel:function(){
					Lungo.Notification.hide();
					$('.notification .window').html(' ');
				}
			}, _productObj);
		});
	});

	_page.find('.cmdPedir').each(function(index, val){
		$(val).on('tap', function(){
			_productObj = $(this).data('entity');
			dialogo.mostrarDialogo({
				confirm:function(){
					_productObj.cantidad = $('#qty').val();
					shoppingcart.agregarProducto(_productObj);

					$('.notification .window').html(' ');
					Lungo.Notification.hide();
				},
				cancel:function(){
					Lungo.Notification.hide();
					$('.notification .window').html(' ');
				}
			}, _productObj);
		});
	});

	
	$(document).on('keyup','#qty', function() {
		producto.linea == "1" ? $('#amount').text(parseInt($(this).val()) * _productObj.precio_a) : $('#amount').text(parseInt($(this).val()) * _productObj.precio_b);
	});

	$(document).on('tap','[data-workspaceBack]', function(){
		producto.back = true;
		Lungo.Router.section('frm-category');
	});
}

}
