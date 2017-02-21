
var dados, j;
var muda;
var troca=0;

$(document).ready(function(){
    $('#tabelalinda').empty(); //Limpando a tabela
    $.get("http://192.168.1.171:3000/product", function(data) {
        dados=data;
        for(var i=0;i<dados.length;i++){
        	j= dados[i].id;
        	var n = dados[i].valor.toString();
        	n = parseFloat(n).toFixed(2)
        	n = n.replace(".", ",");
        	if (troca==0) {
        	if(dados[i].status == "A"){
        		$('#tabelalinda').append('<tr><td>'+dados[i].id+'</td><td>'+dados[i].nome+'</td><td>'+'R$ '+n+' '+'</td><td>'+'<span class="glyphicon glyphicon-thumbs-up"></span>'+'</td><td>'+dados[i].estoque+'</td><td>'+'<button type="button" id="editar" onclick= "editar('+i+')" data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+ '</td><td>'+'<button type="button"  onclick= "deleta('+j+')" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>' +'</td></tr>');
        	}  
        	
        	}
        	else{
        		if(dados[i].status == "I"){
        			$('#tabelalinda').append('<tr><td>'+dados[i].id+'</td><td>'+dados[i].nome+'</td><td>'+'R$ '+n+' '+'</td><td>'+'<span class="glyphicon glyphicon-thumbs-down"></span>'+'</td><td>'+dados[i].estoque+'</td><td>'+'<button type="button" id="editar" onclick= "editar('+i+')" data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+ '</td><td>'+'<button type="button"  onclick= "deleta('+j+')" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>' +'</td></tr>');
        		}
        	}  
        }
    });

    $("#inativos").click(function(){
    	troca = 400;
    	$('#tabelalinda').empty();
    	$.get("http://192.168.1.171:3000/product", function(data) {
        	dados=data;
        	for(var i=0;i<dados.length;i++){
        		j= dados[i].id;
        		var n = dados[i].valor.toString();
        		n = parseFloat(n).toFixed(2)
        		n = n.replace(".", ",");
        		if(troca==0){
        			if(dados[i].status == "A"){

        				$('#tabelalinda').append('<tr><td>'+dados[i].id+'</td><td>'+dados[i].nome+'</td><td>'+'R$ '+n+' '+'</td><td>'+'<span class="glyphicon glyphicon-thumbs-up"></span>'+'</td><td>'+dados[i].estoque+'</td><td>'+'<button type="button" id="editar" onclick= "editar('+i+')" data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+ '</td><td>'+'<button type="button"  onclick= "deleta('+j+')" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>' +'</td></tr>');
        			}
        		}
        		else{
        			if(dados[i].status == "I"){

        				$('#tabelalinda').append('<tr><td>'+dados[i].id+'</td><td>'+dados[i].nome+'</td><td>'+'R$ '+n+' '+'</td><td>'+'<span class="glyphicon glyphicon-thumbs-down"></span>'+'</td><td>'+dados[i].estoque+'</td><td>'+'<button type="button" id="editar" onclick= "editar('+i+')" data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+ '</td><td>'+'<button type="button"  onclick= "deleta('+j+')" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>' +'</td></tr>');
        			}
        		}  

        	}
        });
	});


    $("#ativos").click(function(){
    	troca = 0;
    	$('#tabelalinda').empty();
    	$.get("http://192.168.1.171:3000/product", function(data) {
        	dados=data;
        	for(var i=0;i<dados.length;i++){
        		j= dados[i].id;
        		var n = dados[i].valor.toString();
        		n = parseFloat(n).toFixed(2)
        		n = n.replace(".", ",");
        		if(troca==0){
        			if(dados[i].status == "A"){

        				$('#tabelalinda').append('<tr><td>'+dados[i].id+'</td><td>'+dados[i].nome+'</td><td>'+'R$ '+n+' '+'</td><td>'+'<span class="glyphicon glyphicon-thumbs-up"></span>'+'</td><td>'+dados[i].estoque+'</td><td>'+'<button type="button" id="editar" onclick= "editar('+i+')" data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+ '</td><td>'+'<button type="button"  onclick= "deleta('+j+')" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>' +'</td></tr>');
        		}	  
        	
        		}
        		else{
        			if(dados[i].status == "I"){
        			$('#tabelalinda').append('<tr><td>'+dados[i].id+'</td><td>'+dados[i].nome+'</td><td>'+'R$ '+n+' '+'</td><td>'+'<span class="glyphicon glyphicon-thumbs-down"></span>'+'</td><td>'+dados[i].estoque+'</td><td>'+'<button type="button" id="editar" onclick= "editar('+i+')" data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+ '</td><td>'+'<button type="button"  onclick= "deleta('+j+')" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>' +'</td></tr>');
        			}
        		}	  
        	}
        });
	});

	deleta = function (v){
	$.ajax({
	type: 'DELETE',
	url: "http://192.168.1.171:3000/product/"+ v,
	});
		location.reload(true);
	}

	$('#confirmar').click(function(){
        $.ajax({
            url : "http://192.168.1.171:3000/product/",
            type : 'POST',
            data : 'nome=' + $('#nome').val() + '&valor=' + $('#valor').val() + '&status=' + $('#status').val() + '&estoque=' + $('#estoque').val(),
				success: function(data){
                $('#confirmar').html(data);
        		location.reload(true);
            }
        });
    });

	$('#editar').click(function(){
        $.ajax({
            url : "http://192.168.1.171:3000/product/"+ muda,
            type : 'PUT',
            data : 'nome=' + $('#nome').val() + '&valor=' + $('#valor').val() + '&status=' + $('#status').val() + '&estoque=' + $('#estoque').val(),
				success: function(data){
                $('#editar').html(data);
                location.reload(true);
            }
        });
    });

	$("#myBtn").click(function(){
        $("#myModal").modal();
    });
});

editar = function(o){
    document.getElementById('nome').value = dados[o].nome;
    document.getElementById('valor').value = dados[o].valor;
    document.getElementById('status').value = dados[o].status;
    document.getElementById('estoque').value = dados[o].estoque;
    muda = dados[o].id;
}

function verificaNumero(e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
         return false;
    }
}
   	$(document).ready(function() {
       	$("#estoque").keypress(verificaNumero);

    });


function numeros( obj , e )
{
    var tecla = ( window.event ) ? e.keyCode : e.which;
    if ( tecla == 8 || tecla == 0 )
        return true;
    if ( tecla != 46 && tecla < 48 || tecla > 57 )
        return false;
}

function teste(e){
	var expressao;
	expressao = /[0-9,.!@#$%¨&*(){};:\/ºª+=_]/;
		if(expressao.test(String.fromCharCode(e.keyCode)))
		{
			return false;
		}
		else
		{
			return true;
		}
}








