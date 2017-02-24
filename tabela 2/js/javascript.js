var server="http://localhost:3000/product/";
var dados, j;
var troca=0;
var dele=0;
var naorepete=0;

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
	$("#estoque").keypress(verificaNumeroEstoque);
	$("#nome").keypress(Bloqueianumeros);
	$("#valor").keypress(verificaNumerosValor);

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
		success: tudo
		});
		$('#myModal').modal('hide');
	
	}

	$('#confirmar').click(function(){
		salvar();
		if(Nome=="" || Valor=="" || Estoque==""){
			$("#alertcampovazio").show();
			window.setTimeout(function() {
    		$(".alert").slideUp(500, function(){
        	$(this).hide(); 
    		});
			}, 2000);
		}else{
			for(var i=0;i<dados.length;i++){
				if(dados[i].nome==Nome){naorepete=1;}
			}
			nomeIgual();
    	}
    });

    nomeIgual = function(){
    		if(naorepete==0){
		        $.ajax({
		            url : server,
		            type : 'POST',
		            data : {
		            	nome: Nome,
		            	valor: Valor,
		            	estoque: Estoque,
		            	status: Status
		            },
						success: tudo
		            
		        });
		        $('#myModal').modal('hide');
			}else{

			$("#alertnaorepete").show();
			window.setTimeout(function() {
    		$(".alert").slideUp(500, function(){
        	$(this).hide(); 
    		});
			}, 2000);
			naorepete=0;
			}
    }

	$('#editaron').click(function(){
        salvar();
        if(Nome=="" || Valor=="" || Estoque==""){
        	$("#alertcampovazio").show();
			window.setTimeout(function() {
    		$(".alert").slideUp(500, function(){
        	$(this).hide(); 
    		});
			}, 2000);
		}else{
        $.ajax({
            url : server+ muda,
            type : 'PUT',
            data : {
            	nome: Nome,
            	valor: Valor,
            	estoque: Estoque,
            	status: Status
            },
				success: tudo
        });
        $('#myModal').modal('hide');
       }
    });


	$("#myBtn").click(function(){
		$("#alertcampovazio").hide();
		$("#alertnaorepete").hide();
        $("#myModal").modal();
        $("#editaron").hide();
		$("#deletinho").hide();
		$("#confirmar").show();
		$("#cancela").show();
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
		$("#mensagem").hide();
		$("#alertcampovazio").hide();
		$("#alertnaorepete").hide();
		$("#cancela").hide();
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
	$("#cancela").show();
	$("#alertcampovazio").hide();
	$("#alertnaorepete").hide();
	$("#nome").show();
	$('label[for="nome"]').show();
	$("#valorzinho").show();
	$('label[for="valor"]').show();
	$("#status").show();
	$('label[for="status"]').show();
	$("#estoque").show();
	$('label[for="estoque"]').show();
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
		 document.getElementById('titulo').innerHTML = "  Adicionar Itens";
	}else if(alteranome==1){
		document.getElementById('titulo').innerHTML = "  Editar Itens";
	}else{
		document.getElementById('titulo').innerHTML = "  Tem certeza que quer deletar?";
	}
}

function verificaNumeroEstoque(e) {
    if ((e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) || e.which ==32 )   {
         return false;
    }
}

function verificaNumerosValor(e){
	if ((e.which != 8 && e.which != 0 && (e.which < 46 || e.which > 57)) || e.which ==47) {
         return false;
    }
}

function Bloqueianumeros(e){
	if ((e.which != 8 && e.which != 0 && (e.which < 94 || e.which > 126)) || (e.which>=123 && e.which<=125) || e.which==95) {
         return false;
    }
}