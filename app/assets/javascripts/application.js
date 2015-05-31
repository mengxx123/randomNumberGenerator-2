// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

function hideAns(){
    $("span.ans").css({"color": "white"});
};

function showAns(){
    $("span.ans").css({"color": "black"});
};

function checkAns(){
    var is = $(".numbers .inp");
    var as = $(".numbers .ans");

    var ws = _.filter( _.zip(is, as),
		       function(ia){ return $(ia[0]).val() != $(ia[1]).text(); } );

    if( ws.length != 0 ){
    	_.each(ws, function(ia){ $(ia[0]).val(""); });
	alert("wrong!!");
    } else {
	alert("correct!!");
    }
};

function eraseAns(){
    $(".inp").val("");
};


function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function shuffleAns(){
    var as = _.map( $(".numbers .ans"), function(a){ return $(a).text(); } );
    _.each(_.zip($(".numbers .ans"), shuffle(as)),
	   function(a){
	       $(a[0]).text(a[1]);
	   });
    eraseAns();
};


function genNum(){
    $(".numbers ul").empty();
    var many = parseInt($("#many").val());
    var min = parseInt($("#min").val());
    var max = parseInt($("#max").val());
    var scale = parseInt($("#scale").val());

    // .append() study: http://stackoverflow.com/questions/1145208/jquery-how-to-add-li-in-an-existing-ul
    for (i = 0; i < many; i++){
    	var x = Math.floor(Math.random() * (max - min) + min) * scale;
	$(".numbers ul").append(
	    $("<li>").append($("<input>").attr({class: "inp", type: "text"}))
                     .append("&nbsp;&nbsp;&nbsp;(")
                     .append($("<span>").attr({class: "ans"}).text(x.toString()))
                     .append(")")
	);
    };
    hideAns();
};

$(document).ready(function(){
    genNum();
});

$("#gen").click( function(){
    genNum();
});

$("#show").click( function(){
    showAns();
});

$("#hide").click( function(){
    hideAns();
});

$("#check").click( function(){
    checkAns();
});

$("#erase").click( function(){
    eraseAns();
});

$("#shuffle").click( function(){
    shuffleAns();
});
