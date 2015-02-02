$(document).ready(function(){
	_username = $('#txtUser');
	_password = $('#txtPassword');
	_btn_submit = $('#btn-submit');
	_btn_sessionDestroy = $$("#sessionDestroy");
	_btn_app_exit = $('.close_app');
	_pagelogin = $('#frm-login');

	_btn_submit.on('tap', function(){
		usuario.connectar(_username.val(), _password.val());
	});

	_btn_sessionDestroy.on('tap', function(){
		usuario.cerrar();
		 navigator.app.exitApp();
	});

	_btn_app_exit.on('tap', function(){
		usuario.cerrar();
		navigator.app.exitApp();
	});	
});








