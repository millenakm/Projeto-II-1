var server="http://localhost:3000/product/";
var dados, j;
var troca=0;
var dele=0;
var naorepete=0;

function salvar (){
	Nome =  $('#nome').val();
	console.log(Nome);
	Valor = $('#valor').val();
	Estoque = $('#estoque').val();
	Status = $('#status').val();
}
$(document).ready(function(){
	$("#alertconcluido").hide();
	$("#alerteditado").hide();
	tudo();
	$("#estoque").keypress(verificaNumeroEstoque);
	$("#nome").keypress(Bloqueianumeros);
	$("#valor").keypress(verificaNumerosValor);

	$("#loga").click(function(){
		Login();
	});

	$("#valor").maskMoney({decimal:".", thousands:"", million:"."
	});

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
				if(dados[i].nome.toLowerCase()===Nome.toLowerCase()){naorepete=1;}
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
		        $("#alertconcluido").show();
			window.setTimeout(function() {
    		$(".alert").slideUp(500, function(){
        	$(this).hide(); 
    		});
			}, 2000);

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
        $("#alerteditado").show();
			window.setTimeout(function() {
    		$(".alert").slideUp(500, function(){
        	$(this).hide(); 
    		});
			}, 2000);
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
		$("#textboxs").show();
		limparcampo();

    });

});

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

function Login(){
var done=0;
var username=document.login.username.value;
username=username.toLowerCase();
var password=document.login.password.value;
password=password.toLowerCase();
if (username=="bianca" && password=="senha") { window.location="file:///D:/Github/Projeto-II/tabela%202%20funcionando/mercadodobruno2.html"; done=1; }
if (username=="outro" && password=="outrosenha") { window.location="file:///D:/Github/Projeto-II/tabela%202%20funcionando/mercadodobruno2.html"; done=1; }
if (username=="outro" && password=="outrasenha") { window.location="file:///D:/Github/Projeto-II/tabela%202%20funcionando/mercadodobruno2.html"; done=1; }
if (done==0) { alert("Senha ou Usuário inválido."); }
}


deleta = function (v){
	dele = v;
	$("#confirmar").hide();
	$("#editaron").hide();
	$("#deletinho").show();
	$("#mensagem").hide();
	$("#alertcampovazio").hide();
	$("#alertnaorepete").hide();
	$("#cancela").hide();
	$("#textboxs").hide();
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
	$("#textboxs").show();
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
		document.getElementById('titulo').innerHTML = "  Tem certeza que deseja deletar?";
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