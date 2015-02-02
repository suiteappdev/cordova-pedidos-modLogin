	var pedido = {};
	
	pedido.stack = [];
	pedido.vendedor = null;
	pedido.totalProductos = 0;
	pedido.subTotal = 0;
	pedido.total = 0;
	pedido.iva = 0;
	pedido.identificacion = null;
	pedido.geolocalizacion = null;
	pedido.descuento1 = 0;
	pedido.descuento2 = 0;
	pedido.descuento3 = 0;

	pedido.ObtenerResumen = function(){
		pedido.totalProductos = pedido.ObtenerUnidades();
		pedido.vendedor = usuario.info.identificacion;
		pedido.subTotal = pedido.ObtenerSubTotal();
		pedido.total = pedido.ObtenerTotal();
	}

	pedido.ObtenerTotal = function(dt1, dt2, dt3){
		pedido.total = pedido.subTotal;

		return pedido.total - dt1 - dt2 - dt3;
	}

	pedido.ObtenerSubTotal = function(){
		_total = 0;

		$(shoppingcart.stack).each(function(key, val){
			_total = _total + (parseInt(val.cantidad) * parseInt(val.precioventa) );
		});

		return _total;
	}
	pedido.ObtenerBaseImp = function(){
		baseImp = {};

		baseImp.iva0 = {};
		baseImp.iva0.total = 0;
		baseImp.iva5 = {};
		baseImp.iva5.total = 0;
		baseImp.iva16= {};
		baseImp.iva16.total = 0;

		$(shoppingcart.stack).each(function(key, val){
			if(val.iva == 0){
				baseImp.iva0.total = baseImp.iva0.total + (parseInt(val.cantidad) * parseInt(val.precioventa) );
				baseImp.iva0.valorIva = 0;
			}else if(val.iva == 5){
				baseImp.iva5.total = baseImp.iva5.total + (parseInt(val.cantidad) * parseInt(val.precioventa) );
				baseImp.iva5.valorIva = (baseImp.iva5.total * 5) / 100;
			}else if(val.iva == 16){
				baseImp.iva16.total = baseImp.iva16.total + (parseInt(val.cantidad) * parseInt(val.precioventa) );
				baseImp.iva16.valorIva = baseImp.iva16.valorIva = (baseImp.iva16.total * 16) / 100;
			}
		});

		return baseImp;
	}

	pedido.ObtenerIVA = function(){
		_totalIva = 0;

		$(shoppingcart.stack).each(function(key, val){
			_totalIva = _totalIva + (parseInt(val.cantidad) * parseInt(val.pventa));
		});

		return _totalIva;
	}

	pedido.ObtenerUnidades = function(){
		return shoppingcart.stack.length;
	}

	pedido.bindEvent = function(){
		_txtTCantidad = $('#txtUtotal');
		_txtSubtotal = $('#txtStotal');
		_dto1 = $('#txtDsto1');
		_dto2 = $('#txtDsto2');
		_dto3 = $('#txtDsto3');
		_dtoTotal = $('#txtDcto');
		_tblBaseImp = $('#tblBaseImp');
		_iva = $('#txtIva');
		_txtTotal = $('#txtTotal');
		_txtMuestra = $('#txtTmuestras');
		_txtObservacion = $('#txtObservacion');
		_cmdSave = $('#cmdSave');

		_txtTCantidad.val(pedido.ObtenerUnidades());
		pedido.iva = parseInt(pedido.ObtenerIVA());

		_baseimp = pedido.ObtenerBaseImp();

		_iva0Total = _baseimp.iva0.total;
		_iva5Total = _baseimp.iva5.total;
		_iva16Total = _baseimp.iva16.total;

		_subTotal = _baseimp.iva0.total + _baseimp.iva5.total + _baseimp.iva16.total;
		_txtSubtotal.val(_subTotal);

		_ivaTotal = _baseimp.iva0.valorIva ? _baseimp.iva0.valorIva : 0 + _baseimp.iva5.valorIva ? _baseimp.iva5.valorIva : 0  + _baseimp.iva16.valorIva ? _baseimp.iva16.valorIva : 0 ;
		_iva.val(_ivaTotal);
		
		$('#txtDcto').val(accounting.unformat(_dto1.val()) + accounting.unformat(_dto2.val()) + accounting.unformat(_dto3.val()));

		$($(_tblBaseImp.find('tbody tr')[0]).children()[1]).text(_iva0Total);
		$($(_tblBaseImp.find('tbody tr')[0]).children()[2]).text(_baseimp.iva0.valorIva ? _baseimp.iva0.valorIva : 0);

		$($(_tblBaseImp.find('tbody tr')[1]).children()[1]).text(_iva5Total);
		$($(_tblBaseImp.find('tbody tr')[1]).children()[2]).text(_baseimp.iva5.valorIva ? _baseimp.iva5.valorIva : 0);

		$($(_tblBaseImp.find('tbody tr')[2]).children()[1]).text(_iva16Total);
		$($(_tblBaseImp.find('tbody tr')[2]).children()[2]).text(_baseimp.iva16.valorIva ? _baseimp.iva16.valorIva : 0);

		_cmdSave.off('tap');
		_cmdSave.on('tap', function(){
			pedido.obtenerUbicacionPedido();
			data = {};
			data.identificacion = pedido.identificacion;
			data.subtotal = _txtSubtotal.val();

			data.dto1 = parseInt($('#dtoValue1').text());
			data.dto2 = parseInt($('#dtoValue2').text());
			data.dto3 = parseInt($('#dtoValue3').text());

			data.vdcto1 = parseInt(accounting.unformat(_dto1.val()));
			data.vdcto2 = parseInt(accounting.unformat(_dto2.val()));
			data.vdcto3 = parseInt(accounting.unformat(_dto3.val()));

			data.totaldto = $('#txtDcto').val();
			data.total = _txtTotal.val();
			
			data.iva = _iva.val();

			data.iva1 = 0;
			data.valriva1 = _baseimp.iva0.valorIva ? _baseimp.iva0.valorIva : 0; 
			data.baseimp1 = _iva0Total;

			data.iva2 = 5;
			data.valriva2 = _baseimp.iva5.valorIva ? _baseimp.iva5.valorIva : 0;
			data.baseimp2 = _iva5Total; 

			data.iva3 = 16;
			data.valriva3 = _baseimp.iva16.valorIva ? _baseimp.iva16.valorIva : 0;
			data.baseimp3 = _iva16Total; 

			data.tmuestra = _txtMuestra.val();
			data.tunidades = _txtTCantidad.val();
			data.observacion = _txtObservacion.val();
			data.idvendedor = usuario.info.identificacion;
			data.productos =  JSON.stringify(shoppingcart.stack);
			data.geolocalizacion = pedido.geolocalizacion;
			
			pedido.enviar(data);
		});
	}

	pedido.enviar = function(data){
		$.ajax({
			type:'POST',
			url:UrlCollection.ENVIAR_PEDIDO,
			crossdomain:true,
			dataType:'JSON',
			data:data,
			success:function(json){
				if(json){
		            navigator.notification.alert(
		                'Has agregado un nuevo pedido a tu lista!',  // message
		                function(){
			                pedido.limpiarCampos();
							$('.rowClient').hasClass('animated fadeInLeft') ? $('.rowClient').removeClass('animated fadeInLeft') : $('.rowClient').addClass('animated fadeOutLeft'); 
							Lungo.Router.article("workspace", "page-2");
		                },       
		                'Enviado',            // title
		                'Ok'                  // buttonName
		                );
				}else{
		            navigator.notification.alert(
		                'No se pudo guardar tu pedido!',  // message
		                function(){
			                pedido.limpiarCampos();
		                },       
		                'Error',            // title
		                'Ok'                  // buttonName
		                );
				}
			}
		});
	}

	pedido.obtenerPedidos = function(data){
		$.ajax({
			type:'GET',
			data:data,
			url:UrlCollection.MIS_PEDIDOS,
			dataType :'JSONP',
			crossdomain :true,
			success:function(data){
				if(!data){
		            navigator.notification.alert(
		                'usted no tiene pedidos!',  // message
		                function(){
							Lungo.Router.article("workspace", "page-2");
							return;
		                },       
		                '0 Pedidos',            // title
		                'Ok'                  // buttonName
		                );
				}
				pedido.mostrar(data);
			} 
		});		
	}

	pedido.mostrar = function(data){
		_requestList = $('#requestList');
		_requestList.html('');

		$(data).each(function(key, val){
			_requestRow = $('<li class="warning"><div class="on-right"><span class="icon map-marker"></span>'+val.geolocalizacion+'</div><span class="icon user"></span><h2 class="text">'+val.nombrecompleto+'</h2><small class="group"><span class="icon calendar"></span>'+val.fechapedido+'</small><small class="group"><span class="icon tag"></span>'+val.descripcion+'</small><small class="group" style="color: #93A707;font-weight: 800;"><span class="icon money"></span>'+accounting.formatMoney(val.total, { symbol: "COP",  format: "%v %s" })+'</small></li>');
			_requestRow.data('pedido', val);
			_requestList.append(_requestRow);
		});
	}

	pedido.limpiarCampos = function(){
		$('#txtcliente').val('');
		$('#txtNombre').val('');
		$('#txtTelefono').val('');
		$('#txtNit').val('');
		$('#txtUbicacion').val('');
		$('#txtUtotal').val('');
		$('#txtStotal').val();
		$('#txtIva').val();
		_txtTCantidad.val('');
		_txtSubtotal.val('');
		_dto1.val('');
		_dto2.val('');
		_dto3.val('');
		_iva.val('');
		_txtTotal.val(''); 
		_txtMuestra.val('');
		_txtObservacion.val('');
		pedido.vendedor = null;
		pedido.totalProductos = 0;
		pedido.subTotal = 0;
		pedido.total = 0;
		pedido.identificacion = null;
		pedido.descuento1 = 0;
		pedido.descuento2 = 0;
		pedido.descuento3 = 0;
		shoppingcart.limpiar()
	}

	pedido.obtenerUbicacionPedido = function(){
		geo.getMyPosition();
		pedido.geolocalizacion = geo.cityName;
	}
