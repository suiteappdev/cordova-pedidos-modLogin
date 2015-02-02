var history = {};
history.stack = [];

history.remember = function(){
	if(history.stack.length  == 0 && lineas.misLineas.length > 1){
		Lungo.Router.article('workspace', 'page-6');
		return;
	}

	var rememberObj = history.stack.pop();

	try{
		if(rememberObj['arg'] == undefined){
			rememberObj['fn']();
			return;
		}
		
		rememberObj['fn'](rememberObj['arg'].join(''));
		if(rememberObj.prop != undefined){
			categoria[rememberObj.prop] = config.CATEGORIA_SISTEMA;					
		}
	}catch(e){
		categoria.obtenerFamilia1();
		categoria.familia1 = config.CATEGORIA_SISTEMA;
	}	
}

history.bindEvent = function(){
	$('[data-workspaceback]').off('tap');
	$('[data-workspaceback]').on('tap', function(){
		history.remember();			
	});
}