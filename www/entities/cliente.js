$(document).ready(function() {
cliente = {};

cliente.buscar = function(data){
	$.ajax({
		type:'GET',
		url:UrlCollection.BUSCAR_CLIENTES,
		data:{criteria:data},
		dataType:'JSONP',
		crossdomain:true,
		success:function(json){
			$(json).each(function(key, val){
				_clientRow = $('<li class="rowClient animated fadeInLeft"><div class="on-right text tiny"><span class="icon globe"></span>'+val.direccion+'</div><span class="icon user"></span><strong>'+val.nombres+'</strong><span class="icon phone" style="font-size:17px;"></span><small style="color:#A58E33!important;">'+val.telefono1+' - NIT: '+val.identificacion+' - '+val.direccion+'</small></li>');
				_clientRow.data('user', val);
				$('#clientList').append(_clientRow);
			});

			$('.rowClient').off('tap');
			$('.rowClient').on('tap', function(){
				$('#txtcliente').val($(this).data('user').nombres);
				$('#txtNombre').val($(this).data('user').nombres);
				$('#txtTelefono').val($(this).data('user').telefono1);
				$('#txtNit').val($(this).data('user').identificacion);
				$('#dtoValue1').text($(this).data('user').descuento1+ '%').data('descuento1', $(this).data('user').descuento1);
				$('#dtoValue2').text($(this).data('user').descuento2+ '%').data('descuento2', $(this).data('user').descuento2);
				$('#dtoValue3').text($(this).data('user').descuento3+ '%').data('descuento3', $(this).data('user').descuento3);
				$('#txtDsto1').val(accounting.formatMoney(((parseInt($(this).data('user').descuento1) * pedido.ObtenerSubTotal())/ 100), { symbol: "COP",  format: "%v %s" } ));
				$('#txtDsto2').val(accounting.formatMoney(((parseInt($(this).data('user').descuento2) * pedido.ObtenerSubTotal())/ 100), { symbol: "COP",  format: "%v %s" } ));
				$('#txtDsto3').val(accounting.formatMoney(((parseInt($(this).data('user').descuento3) * pedido.ObtenerSubTotal())/ 100), { symbol: "COP",  format: "%v %s" } ));
				
				$('#txtDcto').val(accounting.unformat($('#txtDsto1').val()) + accounting.unformat($('#txtDsto2').val()) + accounting.unformat($('#txtDsto3').val()));
				
				$('#txtTotal').val((parseInt($('#txtStotal').val()) + parseInt($('#txtIva').val())) - parseInt($('#txtDcto').val()));

				pedido.identificacion = $(this).data('user').identificacion;
				$('#txtUbicacion').val($(this).data('user').direccion);
				$('#clientList').html('');

				if($('#form-pedidos-fields').hasClass('animated fadeInRight')){
					return;
				}else{
					$('#form-pedidos-fields').addClass('animated fadeInRight').show();
				}
			});
		}
	});
}

cliente.bindEvent = function(){
	_txtCliente = $('#txtcliente');
	_pattern = new RegExp('[a-zA-Z]');
	$('#cmdBuscar').off().on('tap', function(e){
		e.preventDefault();

		if(_pattern.test(_txtCliente.val())){
			$('#clientList').html('');
			cliente.buscar(_txtCliente.val());					
		}else{
			$('#clientList').html('');
		}
		return;		
	});
}
});

