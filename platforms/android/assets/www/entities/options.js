$(document).ready(function(){
	_cmdExit = $('#cmdExit');
	_cmdsend = $('#send');
	_frmPedidos = $('#frm-pedidos');

	_cmdExit.on('tap', function(){
		usuario.cerrar();
		 navigator.app.exitApp();
	});

	_cmdsend.on('tap', function(){
		if($(this).hasClass('animated zoomInRight')){
			$(this).removeClass('animated zoomInRight');
		}

		$(this).addClass('animated shake');

		$(this).on('animationend webkitAnimationEnd', function(){
			$(this).removeClass('animated shake');
			Lungo.Router.article('workspace', 'page-8');
		});
	});

});

