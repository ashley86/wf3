var intervalID_K;
var k = 0;

$(document).ready(function(){
    //Haut, haut, bas, bas, gauche, droite, gauche, droite, B, A
    var k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    n = 0;
    $(document).keydown(function (e) {
        if (e.keyCode === k[n++]) {
            if (n === k.length) {

                alert("Vous entrez désormais dans un monde étrange !!!\n Gare à vos oreilles !!!");
                
                $('body').append('<style type="text/css">.konami span { position: absolute; top: 0; left: 0; display: inline-block; width: 35px; height: 29px; -ms-transform: rotate(25deg); -webkit-transform:rotate(25deg); transform: rotate(25deg); background: url(assets/img/hand.png); z-index: 100000; }</style>');
                
                $('body').append('<div class="konami"><audio id="oui" loop><source src="assets/konami-code/oui.mp3"></audio><audio id="calm"><source src="assets/konami-code/calm.mp3"></audio></div>');
                
                intervalID_K = setInterval(setHand, 10);
                document.getElementById('oui').play();

            }
        } else {
            n = 0;
        }
    });
});

function setHand()
{
    k++;
    if( k >= 700)
    {
        document.getElementById('oui').pause();
        document.getElementById('calm').play();
        setTimeout(function(){ clearInterval(intervalID_K) }, 2000);
    }
    
    pos = makeDiv();
    $('.konami').append('<span style="left:' + pos[0] + 'px;top:' + pos[1] + 'px;">');
}

function makeDiv(){
    // vary size for fun
    var divsize = ((Math.random()*100) + 50).toFixed();
    var color = '#'+ Math.round(0xffffff * Math.random()).toString(16);

    // make position sensitive to size and document's width
    var posx = (Math.random() * ($(document).width() - divsize)).toFixed();
    var posy = (Math.random() * ($(document).height() - divsize)).toFixed();

    return [posx, posy];

}