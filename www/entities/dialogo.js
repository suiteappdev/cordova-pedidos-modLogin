var dialogo = {};

dialogo.mostrarDialogo = function (setup, target){
	_obj = shoppingcart.exist(target.id);
	_dialogBody ='<table>' +
						'<tbody>' +
							'<tr>' +
								'<td id="descripcion"></td>' +
								'<td id="price"></td>' +
							'</tr>' +
						'</tbody>' +
					'<tfoot>' +
						'<tr>' +
							'<td colspan="2"><input class="qty" type="number" id="qty" value="'+_obj.cantidad+'" style="width:100%;" name="qty" placeholder="Digite la Cantidad">' + 
							'</td></td>'+
						'</tr>' +
						'<tr><td id="amount" colspan="2">$0.00</tr>'+
					'</tfoot>' +
				'</table>' + 
				'<a href="#" class="button anchor accept "><span class="icon plus-sign"></span><abbr>Agregar!</abbr></a>' +
				'<a href="#" class="button anchor cancel "><span class="icon remove-sign"></span><abbr>Cancelar!</abbr></a>';
	
	Lungo.Notification.html(_dialogBody);

	$$('.notification .accept').tap(setup.confirm);
	$$('.notification .cancel').tap(setup.cancel);
	
	$(document).on('keyup','#qty', function() {
			val = isNaN(parseInt($(this).val()) * parseInt(target.precioventa)) ? accounting.formatMoney(0, { symbol: "COP",  format: "%v %s" }) : accounting.formatMoney(parseInt($(this).val()) * parseInt(target.precioventa), { symbol: "COP",  format: "%v %s" });
			$('#amount').text() == '' ? $('#amount').text(accounting.formatMoney(0, { symbol: "COP",  format: "%v %s" })) : $('#amount').text(val);
	});	
} 
