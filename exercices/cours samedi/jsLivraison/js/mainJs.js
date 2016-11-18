window.onload = function(){
	/* création des etapes de validation */
	var etape = [true,false,true,true];
	//message de certaines étape;
	var messages =["Validé 11 nov.","Expédié 12 nov."];
	/* recuperation des élements du dom */
	var transitMessage = document.getElementById('conteneurProgress').children[0].children[0];
	var fondProgress =document.getElementById('fondProgress');
	var conteneurMessage = document.getElementById('conteneurProgress').children[2];
	// init variable global 
	var sizeEtape = 0;


	/* positionnement des itème selon la progression de la commande et gestion des
	exeptions de placemment*/
	function positionItems(pItem){
		var e = validEtap();
		var newPos = sizeEtape*e;
		console.log(e)
		if(pItem.getAttribute('id') === "progressBar"){
			if( e > 0 ){
				pItem.style.width = (newPos+13)+"px";	
			}
			if(e === etape.length){
				pItem.style.width = newPos+"px";
			}
		}
		if(pItem.getAttribute('id') === "arrowProgress"){
			if(e > 0){
				if(e <= messages.length){
					pItem.style.left = (newPos-(pItem.offsetWidth/2))+"px";
				}else{
					pItem.style.left = ((sizeEtape*messages.length)-(pItem.offsetWidth/2))+"px";
				}
			}
		}
		if(pItem.nodeName === 'P'){
				console.log(pItem)
			if(e){
				pItem.style.left = 0+"px";
				pItem.style.textAlign = 'left';
			}
		}
		if(e >= messages.length && e < etape.length){
		console.log(transitMessage.nodeName)
			transitMessage.style.display ="block";
			transitMessage.style.left = newPos+"px";
		}
	}
	/* deduction des étapes de livraison validées */
	function validEtap(){
		var a = 0;
		for (var i = 0; i < etape.length; i++) {
			if(etape[i]){a++;}
		};
		return a;
	}
	/* création des messages changant selon les etapes */
	function creatMessage(pText){
		var newMessage = document.createElement('P');
		newMessage.textContent = pText;
		conteneurMessage.insertBefore(newMessage,conteneurMessage.getElementsByClassName('finalMessage')[0]);
		return newMessage;
	}

	function addMessage(){
		var et = validEtap();
		for (var i = 0; i < et; i++){
			if(typeof messages[i] !== 'undefined'){
				var m = creatMessage(messages[i]);
				m.style.left = (sizeEtape*(i+1))+"px";
				m.style.textAlign = 'center';
				m.style.marginLeft = (-45)+"px";
				
			}
		}
	}
	function changeLastMessage(){
		var et = validEtap();
		console.log(et,validEtap())
		if(et === etape.length){
			alert()
			conteneurMessage.children[conteneurMessage.children.length-1].textContent = "Commande livrée";
		}
	}

	function init(){
		sizeEtape = (fondProgress.offsetWidth/(etape.length));
		for (var i = 0; i < fondProgress.children.length; i++) {
			positionItems(fondProgress.children[i]);
		};
		addMessage();
		changeLastMessage();
	}
	init();
}