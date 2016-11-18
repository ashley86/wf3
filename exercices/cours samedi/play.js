window.onload = function(){
	/*recuperation des "cartes" (li)*/
	var conteneurCarte = document.getElementById("conteneur");
	var cartes = conteneurCarte.getElementsByTagName('li');
	var tableauScore = document.getElementById('score');
	var rejouer = document.getElementById('rejouer');
	var message = document.getElementById('messages');
	//alert(cartes.length)
	/* variable pour stoker resultat --> stoke l'objet carte*/ 
	var resultCarte = null;
	/* variable totalPaires --> la division par 2 du nombre de cartes du jeu */ 
	var totalPaires;
	/* var currentScore --> score de la partie en cour, commence à 0 */
	var currentScore = 0;
	var valeurScorePaire = 5;
	/* var totalScore --> score de la session, commence à 0 */
	var totalScore = 0;
	/* var nbEssai --> commence à 0 */
	var nbEssais = 0;
	/* var max essai --> commence à 5 */
	var maxEssais = 5;
	/* creation de l'objet de message */ 
	var msg = {
		"ok":"GAGNE !!",
		"ko":"PERDU !!"
	}
	//alert(msg.ko)
	/* on mets un addEventListener sur le bt rejourer dés le debut */
	addEvent(rejouer,restart,"click");
	/* gestion du nombre aleatoire permettant de choisir ce que l'on met
	dans les cartes a partir de l'array 'alphabet'*/
	function nombreAleatoire(paramLong){ // paramLong represente la longueur du tableau
		return Math.round(Math.random()*paramLong);
	}
	
	/* fonction qui modifi l'apparence d'une carte */
	function modifiCarte(paramCarte1,paramCarte2,paramEtat){
		paramCarte1.style.opacity = 1;
		if(paramEtat == "current"){
			paramCarte1.style.backgroundColor = "#00f";
		}else if(paramEtat == "ok"){
			paramCarte1.style.backgroundColor = "#0f0";
			paramCarte2.style.backgroundColor = "#0f0";
			paramCarte2.style.opacity = 1;
		}else{
			paramCarte1.style.backgroundColor = "#f00";
			paramCarte2.style.backgroundColor = "#f00";
			paramCarte2.style.opacity = 1;
			setTimeout(function(){
				paramCarte1.style.backgroundColor = "#333";
				addEvent(paramCarte1,testEvent,"click");
				paramCarte1.style.opacity = 0;
				paramCarte2.style.backgroundColor = "#333";
				addEvent(paramCarte2,testEvent,"click");
				paramCarte2.style.opacity = 0;
			},1000);
		}
	}
	function calculEssais(){
		nbEssais++;
		tableauScore.children[1].innerHTML = nbEssais+"/"+maxEssais;
		if(nbEssais == maxEssais){
			endGame(false);
			return false;
		}
		return true;
	}
	function calculScore(){
		currentScore += valeurScorePaire;
		totalPaires--;
		tableauScore.children[0].innerHTML = currentScore;
		if(totalPaires == 0){
			endGame(true);
			return false;
		}
		return true;
	}
	function endGame(result){
		var color = "#f00";
		if(result){
			color = "#0f0";
			totalScore += currentScore;
			tableauScore.children[2].innerHTML = totalScore;
			messageDisplay(true,color);
		}else{
			messageDisplay(false,color);
		}
		for(var i = 0;i<cartes.length; i++){
			//console.log(result);
			cartes[i].style.backgroundColor = color;
			cartes[i].style.opacity = 1;
			removeEvent(cartes[i],testEvent,"click");
		}
		rejouer.style.display = "block";
	}
	/* gestion des comportement de carte :*/
	function testEvent(event){
		//console.log(resultCarte);
		/*detterminer si on a deja stoqué un résultat de carte : */
		removeEvent(event.target,testEvent,"click");
		if(resultCarte == null){ // pas de carte dans la variable
			// (condition A) 
			resultCarte = event.target; // on stoque la carte
			modifiCarte(event.target,null,"current"); /* fonction qui va modifier 
			l'apparence et le comportement de la carte ( click oui / non )*/
		}else{ //si oui comparer l'ancien resultat avec le nouveau
			// (condition B)
			if(resultCarte.textContent == event.target.textContent){
				if(calculScore()){
					modifiCarte(event.target,resultCarte,"ok");
				}
				// changer le score
				// l'apparence et le comportement
				// decrementer le nombre de paires à trouver
			}else{
				// changer l'apparence et le comportement
				if(calculEssais()){
					modifiCarte(event.target,resultCarte,"ko");
				}
				// increment le nombre d'essai.
			}
			resultCarte = null;
		}
		
	}
	/*
		au clique faire apparaitre le contenu de la carte

		
		

		(condition A) 
		1 reveler le contenu de la carte,
		2 interdire un nouveau clique sur cette carte

		( condition B)
		1 reveler le contenu de la carte 
		2 comparer au resultat de stoque
			(condition c) si resultat ok :
				1 changer couleur des carte ( vert pour ok )
				2 interdire clique sur la deuxeme carte
				3 donner un score 
			(condition d) sinon resultat ko:
				1 changer la couleur des cartes (rouge) pendant un temps
				2 à la fin du temps cacher les cartes 
				3 reautoriser le clique sur les cartes
		3 Vider la variable de stoque.
fin gestion des cartes :*/

	/* gestion des regles 
		resultat : {si resultats ok 
						a - decrementation de la variable totalPaires
						b - mettre a jour current score et l'affichage
						si variable totalPaires == 0:
							1 envoi un message "youpi!"
							2 on additionne currentScore avec le totalScore
							3 donner la possibilité au joueur de rejouer.
					}si non resultat ko{
						a -  incrementation de la variable essais
						si la variable essai est egale à maxEssai{
							1 message "perdu !!".
							2 efface le current score.
							3 donner la possibilité au joueur de rejouer.
						}
					}
	fin regles */
	/* pour pouvoir attacher un gestionnaire d'evenement qui soit
	compatible avec tout les navigateurs on commence par tester si 
	la methode d'attachement renvoi true ou false.*/
	function addEvent(paramObj,paramFunc,paramEvent){
		if(paramObj.addEventListener){
			paramObj.addEventListener(paramEvent,paramFunc,false);
		}else{
			paramObj.attachEvent("on"+paramEvent, paramFunc);
		}
	}
	/* fonction  pour enlever un gestionaire d'evt d'un objet */
	function removeEvent(paramObj,paramFunc,paramEvent){
		if(paramObj.removeEventListener){
			paramObj.removeEventListener(paramEvent,paramFunc,false);
		}else{
			paramObj.detachEvent("on"+paramEvent, paramFunc);
		}
		console.log('ok')
	}
	function creationCarte(paramRealAlpha){
		/* cette fonction permet de remplir les cartes avec les valeurs
		qui ont ete créés et placées dans le tableau realAlpha dans la 
		fonction init */
		/* remplir les cartes avec des lettres */
		for (var i = 0; i < cartes.length; i++) {
			var rand = nombreAleatoire(paramRealAlpha.length-1);
			//console.log(rand)
			cartes[i].innerHTML = paramRealAlpha[rand];
			addEvent(cartes[i],testEvent,"click");
			paramRealAlpha.splice(rand,1);
		};
		//console.log(paramRealAlpha);
	}
	/* cette fonction va permettre de gerer les messages de fin de partie.
	1er on cree un mini objet type json qui stoque le message ok et le 
		message ko.
	2eme on determine par un parametre si l'on à gagné ou pas
	3eme on va modifier la propriété display de l'objet html qui 
		affiche notre message.
	*/
	function messageDisplay(result,pColor){
		if(result){
			message.innerHTML = msg.ok;
		}else{
			message.innerHTML = msg.ko;
		}
		message.style.borderColor = pColor;
		message.style.color = pColor;
		message.style.display = "block";
	}
	function restart(){
		nbEssais = 0;
		currentScore = 0;
		tableauScore.children[0].innerHTML = currentScore;
		tableauScore.children[1].innerHTML = nbEssais+"/"+maxEssais;
		for (var i = 0; i < cartes.length; i++) {
			cartes[i].style.backgroundColor = "#333";
			cartes[i].style.opacity = 0;
			cartes[i].innerHTML = "";
		}
		message.style.display = "none";
		init();
	}

	function init(){
		rejouer.style.display = "none";
		totalPaires = cartes.length/2
		var realAlpha = []; 
		/* creer des lettres */
		var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
		/* melanger les lettres */
		for(var i=0; i<totalPaires;i++){
			var rand = nombreAleatoire(alphabet.length-1); /* nombre aleatoir permetant
			de selectionner in index alétoirement dans le tableau alphabet*/
			realAlpha.push(alphabet[rand]); /* placement dans ce tableau 
			de la premiere partie de la paire de carte */ 
			realAlpha.push(alphabet[rand]);	/* placement dans ce tableau 
			de la deuxieme partie de la paire de carte */ 
			/* push est une methode de l'objet Array() qui permet de placer des 
			données à la suite dans un tableau */
			alphabet.splice(rand,1);/* on detruit l'information utilisé de façon a
			ne pas le retrouver une seconde fois et fausser les paires*/
			/* methode splice permet de supprimer une data dans un tableau en prenant
			comme argument de départ l'index ou commencer la supression, et en 
			deuxième argument le nombre de data a supprimer.*/
		}
		creationCarte(realAlpha);
		//console.log(alphabet);
		//console.log(realAlpha);
	}


	init();
/*alert(document.innerHeight)*/
//{fonction init
	

	/* remplir les cartes avec des lettres */
	/* rendre les cartes cliquable pour l'utilisateur */

//}
























	/*
	// Recuperation des elements
	var conteneur = document.getElementById("conteneur");
	var item = document.getElementsByClassName("item");
	var scoreText = document.getElementById("score").children[0];
	var essaiText = document.getElementById("score").children[1];
	var rejouer = document.getElementById("rejouer");
	var mess;
	// dispartion du bt rejouer
	rejouer.style.display = "none";


	var nb = item.length/2;
	var currentItem = null;
	var currentColor = "#ccc";
	var time;
	var score = 0;
	var essai = 0;
	var points = 10;
	var continu = false;
	var scoreTotal = 0;
	// fonction de choix d'un numero au hazard.
	function randomize(num){
		return Math.round(Math.random()*(num.length-1));
	}
	// test
	function test(){
		alert("cwoinn!!!");
	}
	// gestion de la compatibilité des ecouteurs d'evenement entre les navigateurs
	function addEvent(targ, func){
		if(targ.addEventListener){ // fox Chrom
			targ.addEventListener('click', func, false);
		}else if(targ.attachEvent){ // old IE
			targ.attachEvent('onclick', func);
		}
	}	
	function removEvent(targ, func){
		if(targ.removeEventListener){
			targ.removeEventListener('click', func, false);
		}else if(targ.detachEvent){
			targ.detachEvent('onclick', func);
		}
	}
	
	// comparaison de resultat
	function compar(event){
		if(currentItem == null){
			currentItem = event.target;
			removEvent(currentItem, compar);
			currentItem.style.backgroundColor = currentColor;
			//console.log(event.target.textContent)
		}else{
			if(currentItem.textContent == event.target.textContent){
				//test();
				changeEtat(currentItem, event.target, true);
			}else{
				changeEtat(currentItem, event.target, false);
				//alert('nnooooooooooon!!! paff');

			}		
		}
		event.target.style.opacity = 1;
	}
	function changeEtat(paramItem, target, param){
		if(param){
			paramItem.style.backgroundColor = "#0f0";
			target.style.backgroundColor = "#0f0";
			removEvent(target,compar);
			gestionScore();
		}else{
			
			paramItem.style.backgroundColor = "#f00";
			target.style.backgroundColor = "#f00";
			time = setTimeout(function(){
				addEvent(paramItem, compar);
				paramItem.style.backgroundColor = "#ddd";
				target.style.backgroundColor = "#ddd";
				paramItem.style.opacity = 0;
				target.style.opacity = 0;
				clearTimeout(time);
			}, 500);
		}
		currentItem = null;
		gestionEssai(param);		
	}
	function gestionScore(){
		score += points;
		scoreText.innerHTML = score;
		if(score == points*(item.length/2)){
			message(true)
		}	
	}
	function gestionEssai(param){
		if(param){
			essai=0;
		}else{
			essai++;
			if(essai == 5){
				message(param);
				for(var i=0; i<item.length; i++){
					removEvent(item[i], compar);
				};
			}
		}
		essaiText.innerHTML = essai+"/5";		
	}
	
	function message(param){
		if(!continu){			
			mess = document.createElement('h1');
			mess.style.width = (conteneur.offsetWidth-2)+"px";
			mess.style.fontSize = "3em";
			mess.style.color = "#fff";
			mess.style.position = "absolute";
			mess.style.top = "40%";
			mess.style.textAlign = "center";
			conteneur.appendChild(mess);
			continu = true;
		}else{
			mess.style.display = "block";
		}
		if(param){
			mess.style.backgroundColor = "#0f0";
			mess.innerHTML = "GAGNÉ !!";
		}else{
			mess.style.backgroundColor = "#f00";
			mess.innerHTML = "PERDU pôv'tanche !!";
		}		
		rejouer.style.display = "block";
		afficheScoreTotal()
	}

	function afficheScoreTotal(){
		scoreTotal += score;
		var scoreTotalText = document.getElementById("score").children[2];
		var txt = scoreTotalText.textContent;
		if(parseInt(txt) == 0){
			txt = "0"+scoreTotal;
		}else{
			txt = scoreTotal;
		}
		scoreTotalText.innerHTML = txt;
		console.log(txt);
	}
	// fonction permettant de creer les lettres dans les cartes et d'appliquer les
	//ecouuteurs d'evenement aux items
	function initCartes(){
		var second = [];
		var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
		for (var i = 0; i < nb; i++) {
			var rand = randomize(alphabet);
			item[i].innerHTML = alphabet[rand];
			second.push(alphabet[rand]);
			alphabet.splice(rand,1);
			addEvent(item[i], compar);
		};
		for (var j = nb; j < item.length; j++) {
			var rand = randomize(second);
			item[j].innerHTML = second[rand];
			second.splice(rand,1);
			//console.log(second);
			addEvent(item[j], compar);
		};
		
	}
	function reStart(event){
		event.preventDefault();
		for (var i = 0; i < item.length; i++) {
			item[i].innerHTML = "";
			item[i].style.backgroundColor = "#ddd";
			item[i].style.opacity = 0;
		};
		mess.style.display = "none";
		score = 0;
		essai = 0;
		essaiText.innerHTML = essai+"/5";
		scoreText.innerHTML = score;
		//alert("ici")
		initCartes();
	}

	initCartes()
	addEvent(rejouer, reStart)



*/

/*	function methodDebug(_obj){
		if(!Object.prototype.debug){
			Object.prototype.debug = function(){
			var text = "Objet {\n";
				for (var i in this) {
					if(i !== "debug"){
						text += ' ['+i+'] => '+this[i]+'\n <br /><br />';
					}
				};
				document.write(text +'}');
			}
		}
		_obj.debug();
	}

	methodDebug(document.getElementsByTagName('body')[0]);
*/





}



















































/*window.onload = function() {

	//utilitaire d'event.
	function addEvent(targ){
		if(targ.addEventListener){
			targ.addEventListener('click', comparResult, false);
		}else if(targ.attachEvent){
			targ.attachEvent('onclick', comparResult);
		}
	}
	function removEvent(targ){
		if(targ.removeEventListener){
			targ.removeEventListener('click', comparResult, false);
		}else if(targ.detachEvent){
			targ.detachEvent('onclick', comparResult);
		}
	}

	function methodDebug(_obj){
		if(!Object.prototype.debug){
			Object.prototype.debug = function(){
			var text = "Objet {\n";
				for (var i in this) {
					if(i !== "debug"){
						text += ' ['+i+'] => '+this[i]+'\n <br /><br />';
					}
				};
				document.write(text +'}');
			}
		}
		_obj.debug();
	}
	//methodDebug(document.getElementById('conteneur'))
	// recuperation de selements 
	var items = document.getElementsByClassName('item');
	var caseScore = document.getElementById('affichage');
	var textScore = caseScore.children[0];
	var textEssai = caseScore.children[1];
	var okColor = "#0f0";
	var koColor = "#f00";
	var noColor = "#333";
	var normalColor = "#fff";
	var t;
	var score = 0;
	var essai = 0;
	var itemResult = null;
	// creation des variables utils
	
	

	function initCarte(){
		var alphabet = Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
		var secondCase = [];
		// generation des lettres en mode aleatoir;
		var lettres = [];
		var numberOfCase = 0;
		var nb = items.length/2;
		for (var i = 0; i < nb; i++) {
			var num = Math.round(Math.random()*(alphabet.length-1));
			items[i].innerHTML = alphabet[num];
			secondCase.push(alphabet[num]);
			alphabet.splice(num,1);
			addEvent(items[i])
		};
		for (var j = nb; j<items.length; j++) {
				var cas = Math.round(Math.random()*(secondCase.length-1));
				items[j].innerHTML = secondCase[cas];
				secondCase.splice(cas,1);
			addEvent(items[j])
		}
		
	}


	function comparResult(event){
		if(itemResult == null){
			//monresult = event.target.textContent;
			itemResult = event.target;
			event.target.style.color = normalColor;
		}else{
			if(itemResult.textContent == event.target.textContent){
				changeEtat(true, event.target, itemResult)
				itemResult=null;
			}else{
				changeEtat(false, event.target, itemResult)
				itemResult=null;
			}
		}
	}
	function messageFinal(param){
		var contneur = document.getElementById('conteneur');
		var perdu = document.createElement('h1');
		perdu.style.position = "absolute";
		perdu.style.zIndex="2";
		perdu.style.top = "40%";
		perdu.style.textAlign = "center";
		perdu.style.fontSize = "3em";
		perdu.style.color = normalColor;
		perdu.style.width = contneur.offsetWidth-2+"px";
		if(param){
			perdu.innerHTML ="Gagné ! Ouaiis !!!";
			perdu.style.backgroundColor = okColor;
		}else{
			perdu.innerHTML ="perdu ! Dômage !!!";
			perdu.style.backgroundColor = koColor;
		}
		document.getElementById('conteneur').appendChild(perdu);
	} 
	function gestionScore(){
		score += 10;
		textScore.innerHTML = score;
		if(score == items.length/2){
			messageFinal(true);
		}
	}
	function gestionEssai(param){
		if(!param){
			essai += 1;
			textEssai.innerHTML = essai+"/5";
			if(essai == 5){
				messageFinal(param);
			}
		}else{
			essai = 0;
			textEssai.innerHTML = essai+"/5";
		}
		
	}
	
	//alert(document.getElementById('conteneur').offsetWidth)
	function changeEtat(param, target, pItem){
		if(param){
			target.style.color = okColor;
			pItem.style.color = okColor;
			target.style.opacity = 0.5;
			pItem.style.opacity = 0.5;
			removEvent(pItem);
			removEvent(target);
			gestionScore();
		}else{
			target.style.color = koColor;
			pItem.style.color = koColor;
			t = setTimeout(function(){
				target.style.color = noColor
				pItem.style.color = noColor;
				clearTimeout(t);
			},700)
		}
		gestionEssai(param)
	}
	//methodDebug(items[1]);

	initCarte();

	 

}*/

var Game = function(data){
	this._nbChild = data.nbChild
	this._scene = document (creat)
	this._uiScore = new UiScore();
	this._childItem = [];
	this._tabSrc = [];
	this._okItemNuber = 0;
	
	
	
	this.randomizeSrc(data.map){
		this._tabSrc
	}
	
	this.init = function(){
		
		document.body.appendChild(this._scene);
		this.uiScore.setScore(0);
		for(var i = 0; i < this._nbChild; i++;){
			this._childItem.push(new ItemImages({src:this._tabSrc[i], parent:this,id:i}))
			this._childItem.push(new ItemImages({src:this._tabSrc[i], parent:this,id:i}))
		}
		
		for(var a = 0; a < this._childItem; a++;){
			this._childItem.addInScene();
		}
	}
}


var UiScore = function(){
	this._corps = document (creat)
	this._score = 0;
	
	
	this.setScore = function(sc){
		document.body.appendChild(this._scene);
		this._corps.contentText = sc;
		this._score = sc;
	}
	this.getScore = function(){
		return this._score;
	}
}
var Item = function(data){
	this._parent = data.parent;
	this._src = data.src;
	this.im = new Image():
	this._id = data.id;
	this._onOff = false;
	
	
	
	
	this.addInScene = function(){
		this._im.src = this._src;
		this._parent.appendChild(this._im);
	}
	
}



























