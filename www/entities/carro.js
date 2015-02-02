var shoppingcart = {}
shoppingcart.stack = [];

shoppingcart.agregarProducto  = function(producto){
	if(producto.cantidad == '' || parseInt(producto.cantidad) < 0){
		producto.cantidad = 1;
	}

	_obj = shoppingcart.exist(producto.id);

	if(_obj){
		_obj.cantidad = producto.cantidad;
		$('.tag').addClass('animated bounce');
	}else{
		producto.referencia = $('[data-idpro="'+producto.id+'"]').find('#cmbReferencias').val();
		shoppingcart.stack.push(producto);
		$$('.tag').text(parseInt($$('.tag').text()) + 1);
		$('.tag').on('animationend webkitAnimationEnd', function(){
			$('.tag').removeClass('animated bounce');				
		});
		
		$('.tag').addClass('animated bounce');							
	}
}

shoppingcart.mostrar = function(stack){
	_productList = $('.productList');

	if(stack.length <= 0 && lineas.miLinea == null ){
        navigator.notification.alert(
            'debe elegir su linea de precio!',  // message
            function(){
                Lungo.Router.article('workspace', 'page-6');
            },       
            'Sin Linea',            // title
            'Ok'                  // buttonName
            );
        
        	return;

	}else if(lineas.miLinea != null && stack.length <= 0){
	    navigator.notification.alert(
	        'debe agregar productos a su pedido!',  // message
	        function(){
	            Lungo.Router.article('workspace', 'page-2');
	        },       
	        '0 productos',            // title
	        'Ok'                  // buttonName
	        );  

		return;
	}

	_productList.empty();

	$(stack).each(function(index, val){
		_productTemplateList = $('<li data-id="'+val.id+'" class="product_row"><a href="#" class="button small danger on-right" data-icon="trash" data-label="Quitar del pedido"><span class="icon trash"></span>Quitar</a></li>');
		_productTemplateList.append('<h2 class="text">'+val.descripcion+'</h2><span class="product-shop-price"><small>Precio: <small>'+accounting.formatMoney(val.precioventa)+' * </span><a href="#" class="product-shop-qty"><small>Cantidad: <small>'+val.cantidad+'</a><small class="product-shop-total"> = '+accounting.formatMoney(parseInt(val.precioventa) * parseInt(val.cantidad))+'</small>');
		_productTemplateList.find('.product-shop-qty').data('entity', stack[index]).on('tap', function(){
			dialogo.mostrarDialogo({
				confirm: function(){

				},
				cancel : function(){
				}
			}, stack[index]);
		});

		_productList.append(_productTemplateList);
	});
}

shoppingcart.bindUI = function(){
	$('.product_row .danger').each(function(index, val){
		$(val).on('click', function(){
			$(this).parent().on('animationend webkitAnimationEnd', function(){
				$(this).remove();
				shoppingcart.borrar($(this).data('id'));
			})

			$(this).parent().addClass('animated fadeOutLeft');
		});

        $(".product_row").swipe({
    		swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
      			$(this).addClass('animated fadeOutLeft');

				$(this).on('animationend webkitAnimationEnd', function(){
					$(this).remove();
					shoppingcart.borrar($(this).data('id'));
					if(shoppingcart.stack.length <= 0){
						Lungo.Router.article("workspace", "page-2");					
					}
				});
    		},
     		threshold:0
  		});
	});
}

shoppingcart.borrar = function(criteria){
	$(shoppingcart.stack).each(function(key, ele){
		if(ele.id == criteria){
			shoppingcart.stack.splice(key, 1);
			$$('.tag').text(parseInt($$('.tag').text()) - 1);

			$('.tag').on('animationend webkitAnimationEnd', function(){
				$('.tag').removeClass('animated bounce');
			});

			$('.tag').addClass('animated bounce');

		}
	});
}

shoppingcart.update = function(id, field, newval){
	_updated = false;

	$(shoppingcart.stack).each(function(key, val){
		if(val['id'] == id){
			shoppingcart.stack[key][field] = newval;
			_updated = true;
		}
	});

	return _updated;
}

shoppingcart.exist = function(id){
	_exist = false;
	$(shoppingcart.stack).each(function(key, val){
		if(val['id'] == id){
			_exist = shoppingcart.stack[key];
		}
	});

	return _exist;
}

shoppingcart.limpiar = function(){
	shoppingcart.stack.length = 0;
	$('#productList').html('');
	$$('.tag').text(0);
}