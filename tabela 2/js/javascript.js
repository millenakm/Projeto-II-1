var server="http://192.168.1.168:3000/product/";
var dados, j;
var troca=0;
var dele=0;

function salvar (){
	Nome =  $('#nome').val();
	Valor = $('#valor').val();
	Estoque = $('#estoque').val();
	Status = $('#status').val();
}

function tudo(){
	$('#tabelalinda').empty(); //Limpando a tabela
    $.get(server, function(data) {
        dados=data;
        for(var i=0;i<dados.length;i++){
        	j= dados[i].id;
        	var n = dados[i].valor.toString();
        	n = parseFloat(n).toFixed(2)
        	n = n.replace(".", ",");
        	if (troca==0) {
        		if(dados[i].status == "A"){
        		$('#tabelalinda').append('<tr><td>'+dados[i].id+'</td><td>'+dados[i].nome+'</td><td>'+'R$ '+n+' '+'</td><td>'+'<span class="glyphicon glyphicon-thumbs-up"></span>'+'</td><td>'+dados[i].estoque+'</td><td>'+'<button type="button" onclick= "editar('+i+')" data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+ '</td><td>'+'<button type="button" onclick= "deleta('+j+') " data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>' +'</td></tr>');
        	}  
        	
        	}
        	else{
        		if(dados[i].status == "I"){
        			$('#tabelalinda').append('<tr><td>'+dados[i].id+'</td><td>'+dados[i].nome+'</td><td>'+'R$ '+n+' '+'</td><td>'+'<span class="glyphicon glyphicon-thumbs-down"></span>'+'</td><td>'+dados[i].estoque+'</td><td>'+'<button type="button" onclick= "editar('+i+')" data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+ '</td><td>'+'<button type="button"  onclick= "deleta('+j+')" data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>' +'</td></tr>');
        		}
        	}  
        }
    });

}

$(document).ready(function(){
	tudo();
	$("#estoque").keypress(verificaNumero);
	$("#nome").keypress(teste);
	$("#valor").keypress(numeros);

	$("#valor").maskMoney({decimal:".", thousands:"", precision: 2 });
	
	$("#deletinho").click(function(){
		del();
	});


    $("#inativos").click(function(){
    	troca = 400;
    	tudo();
	});

    $("#ativos").click(function(){
    	troca = 0;
		tudo();
	});


     $("#myBtn").click(function(){
    	alteranome = 0;
    	titulo();
	});
	
	function del(){
		$.ajax({
		type: 'DELETE',
		url: server+ dele,
		});
		tudo();

	}

	$('#confirmar').click(function(){
		salvar();
		if(Nome=="" || Valor=="" || Estoque==""){
		}else{
        $.ajax({
            url : server,
            type : 'POST',
            data : {
            	nome: Nome,
            	valor: Valor,
            	estoque: Estoque,
            	status: Status
            },
				success: function(data){
                $('#confirmar').html(data);
            }
        });
    }
    });

	$('#editaron').click(function(){
        salvar();
        $.ajax({
            url : server+ muda,
            type : 'PUT',
            data : {
            	nome: Nome,
            	valor: Valor,
            	estoque: Estoque,
            	status: Status
            },
				success: function(data){
                $('#editaron').html(data);
            }
        });
    });

  

	$("#myBtn").click(function(){
        $("#myModal").modal();
        $("#editaron").hide();
		$("#deletinho").hide();
		$("#confirmar").show();
		$("#nome").show();
		$('label[for="nome"]').show();
		$("#valorzinho").show();
		$('label[for="valor"]').show();
		$("#status").show();
		$('label[for="status"]').show();
		$("#estoque").show();
		$('label[for="estoque"]').show();
		limparcampo();

    });

});



	deleta = function (v){
		dele = v;
		$("#confirmar").hide();
		$("#editaron").hide();
		$("#deletinho").show();
		$("#nome").hide();
		$('label[for="nome"]').hide();
		$("#valorzinho").hide();
		$('label[for="valor"]').hide();
		$("#status").hide();
		$('label[for="status"]').hide();
		$("#estoque").hide();
		$('label[for="estoque"]').hide();
		alteranome = 2;
		titulo();
	}


editar = function(o){
	$("#confirmar").hide();
	$("#editaron").show();
	$("#deletinho").hide();
	alteranome = 1;
	titulo();
    document.getElementById('nome').value = dados[o].nome;
    document.getElementById('valor').value = dados[o].valor;
    document.getElementById('status').value = dados[o].status;
    document.getElementById('estoque').value = dados[o].estoque;
    muda = dados[o].id;
}

	function limparcampo(){
	$('#nome').val("");
	$('#valor').val("");
	$('#estoque').val("");
 
	}

function titulo(){
	if(alteranome==0){
		 document.getElementById('titulo').innerHTML = "  Adicione Itens";
	}else if(alteranome==1){
		document.getElementById('titulo').innerHTML = "  Edite Itens";
	}else{
		document.getElementById('titulo').innerHTML = "  Tem certeza que quer deletar?";
	}
}

function verificaNumero(e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
         return false;
    }
}

function numeros(e){
	if ((e.which != 8 && e.which != 0 && (e.which < 46 || e.which > 57)) || e.which ==47) {
         return false;
    }
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

  
   
         

     



