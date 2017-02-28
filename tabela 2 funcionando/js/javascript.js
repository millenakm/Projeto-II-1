var servidor="http://192.168.1.172:3000/product/";
var dados, j;
var troca=0;
var dele=0;
var naorepete=0;

function salvar(){//SALVA OS DADOS ESCRITOS NO MODAL
	Nome =  $('#nome').val();
	Valor = $('#valor').val();
	Estoque = $('#estoque').val();
	Status = $('#status').val();
}


function tudo(){//PRINTA E ARRUMA O VALOR
	$('#tabelaProdutos').empty(); //Limpando a tabela
	$.get(servidor, function(data) {
		dados=data;
		for(var i=0;i<dados.length;i++){
			j= dados[i].id;
			var n = dados[i].valor.toString();
			n = parseFloat(n).toFixed(2)
			n = n.replace(".", ",");
			if (troca==0) {
				if(dados[i].status == "A"){
				$('#tabelaProdutos').append('<tr><td>'+dados[i].id+'</td><td>'+dados[i].nome+'</td><td>'+'R$ '+n+' '+'</td><td>'+'<span class="glyphicon glyphicon-thumbs-up"></span>'+'</td><td>'+dados[i].estoque+'</td><td>'+'<button type="button" onclick= "editaTabela('+i+')" data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+ '</td><td>'+'<button type="button" onclick= "deletaTabela('+j+') " data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>' +'</td></tr>');
			}  
			
			}
			else{
				if(dados[i].status == "I"){
					$('#tabelaProdutos').append('<tr><td>'+dados[i].id+'</td><td>'+dados[i].nome+'</td><td>'+'R$ '+n+' '+'</td><td>'+'<span class="glyphicon glyphicon-thumbs-down"></span>'+'</td><td>'+dados[i].estoque+'</td><td>'+'<button type="button" onclick= "editaTabela('+i+')" data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+ '</td><td>'+'<button type="button"  onclick= "deletaTabela('+j+')" data-toggle="modal" data-target="#myModal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>' +'</td></tr>');
				}
			}  
		}
	});
}

function Login(){//IDENTIFICAÇÃO DE LOGIN
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


function deletaTabela(v){//FUNÇÃO QUE É CHAMADA 
	dele = v; //ID DO PRODUTO SALVO AQUI
	$("#confirma").hide();
	$("#edita").hide();
	$("#deleta").show();
	$("#mensagem").hide();
	$("#alertcampovazio").hide();
	$("#alertnaorepete").hide();
	$("#cancela").hide();
	$("#textboxs").hide();
	alteranome = 2;
	titulo();
	}

function del(){
	$.ajax({
	type: 'DELETE',
	url: servidor+ dele,
	success: tudo //SE TIVER SUCESSO, VAI LIMPAR A TABELA E PRINTAR NOVAMENTE
	});
	$('#myModal').modal('hide');
}

 function editaTabela(o){//FUNÇÃO PARA EDITAR
	$("#confirma").hide();
	$("#edita").show();
	$("#deleta").hide();
	$("#cancela").show();
	$("#alertcampovazio").hide();
	$("#alertnaorepete").hide();
	$("#textboxs").show();
	alteranome = 1;
	titulo();
	document.getElementById('nome').value = dados[o].nome;//PEGA AS INFORMAÇÕES EXISTENTES
	document.getElementById('valor').value = dados[o].valor;
	document.getElementById('status').value = dados[o].status;
	document.getElementById('estoque').value = dados[o].estoque;
	muda = dados[o].id;
}

function limparcampo(){//O MODAL INICIA VAZIO
	$('#nome').val("");
	$('#valor').val("");
	$('#estoque').val("");
 
	}

function titulo(){//SELECIONA O TITULO A PARTIR DO VALOR
	if(alteranome==0){
		 document.getElementById('titulo').innerHTML = "  Adicionar Itens";
	}else if(alteranome==1){
		document.getElementById('titulo').innerHTML = "  Editar Itens";
	}else{
		document.getElementById('titulo').innerHTML = "  Tem certeza que deseja deletar?";
	}
}

function verificaNumeroEstoque(e){ //BLOQUEIA LETRAS NO ESTOQUE
	if ((e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) || e.which ==32 )   {
		 return false;
	}
}

function verificaNumerosValor(e){ //BLOQUEIA LETRAS NO VALOR
	if ((e.which != 8 && e.which != 0 && (e.which < 46 || e.which > 57)) || e.which ==47) {
		 return false;
	}
}

function Bloqueianumeros(e){ //BLOQUEIA NUMEROS NO NOME
	if ((e.which != 8 && e.which != 0 && (e.which < 65 || e.which > 126)) || (e.which>=123 && e.which<=125) || e.which==20 ) {
		 return false;
	}
}

function nomeIgual(){
		if(naorepete==0){
			$.ajax({
				url : servidor,
				type : 'POST',
				data : {
					nome: Nome,
					valor: Valor,
					estoque: Estoque,
					status: Status
				},
				success: tudo	
			});
			$('#myModal').modal('hide');//FECHAMENTO DE MODAL
			$("#alertconcluido").show();//ALERTA DE CONCLUIDO
			window.setTimeout(function() {
			$(".alert").slideUp(500, function(){
			$(this).hide(); 
			});
			}, 2000);

		}else{
			$("#alertnaorepete").show();//ALERTA DE REPETIÇÃO
			window.setTimeout(function() {
			$(".alert").slideUp(500, function(){
			$(this).hide(); 
			});
			}, 2000);
			naorepete=0;
		}
}

function actions(){//FUNÇÕES DE BOTÕES E INPUT
	$("#alertconcluido").hide();
	$("#alerteditado").hide();
	$("#estoque").keypress(verificaNumeroEstoque);
	$("#nome").keypress(Bloqueianumeros);
	$("#valor").keypress(verificaNumerosValor);

	$("#loga").click(function(){
		Login();
	});
	$("#valor").maskMoney({decimal:".", thousands:"", million:"." //MASCARA DE DINHEIRO
	});

	$("#deleta").click(function(){ //DELETA OS DADOS DEFINITIVAMENTE
		del();
	});

	$("#inativos").click(function(){//ABRE ITENS INATIVOS
		troca = 400;
		tudo();
	});

	$("#ativos").click(function(){//ABRE ITENS ATIVOS
		troca = 0;
		tudo();
	});

	$("#adiciona").click(function(){ //ABRE O MODAL
		alteranome = 0;
		titulo();
	});
	$('#confirma').click(function(){
		salvar();//PUXA DADOS DIGITADOS NO MODAL
		if(Nome=="" || Valor=="" || Estoque==""){//SE ESTIVER ALGUM CAMPO VAZIO DA O ALERTA E BLOQUEIA O SUBMIT
			$("#alertcampovazio").show();
			window.setTimeout(function() {
			$(".alert").slideUp(500, function(){
			$(this).hide(); 
			});
			}, 2000);
		}else{
			for(var i=0;i<dados.length;i++){//FAZ VARREDURA PARA VERIFICAR EXISTENCIA DE NOME IGUAL
				if(dados[i].nome.toLowerCase()===Nome.toLowerCase()){naorepete=1;}//ACHANDO NOME IGUAL, VARIAVEL SETA PARA 1
			}
			nomeIgual();//CHAMA FUNÇÃO QUE VERIFICA NOME IGUAL
		}
	});
	$('#edita').click(function(){
		salvar();
		if(Nome=="" || Valor=="" || Estoque==""){// ALERTA DE CAMPO VAZIO
			$("#alertcampovazio").show();
			window.setTimeout(function() {
			$(".alert").slideUp(500, function(){
			$(this).hide(); 
			});
			}, 2000);
		}else{ //EDITA O ITEM SELECIONADO
		$.ajax({
			url : servidor+ muda,
			type : 'PUT',
			data : {
				nome: Nome,
				valor: Valor,
				estoque: Estoque,
				status: Status
			},
				success: tudo
		});
		$('#myModal').modal('hide');//FECHA MODAL
		$("#alerteditado").show();//MENSAGEM DE EDIÇÃO CONCLUIDA
			window.setTimeout(function() {
			$(".alert").slideUp(500, function(){
			$(this).hide(); 
			});
			}, 2000);
	   }
	});
	$("#adiciona").click(function(){ //CHAMA O MODAL INICIAL DE ADICIONAR ITEM
		$("#alertcampovazio").hide();
		$("#alertnaorepete").hide();
		$("#myModal").modal();
		$("#edita").hide();
		$("#deleta").hide();
		$("#confirma").show();
		$("#cancela").show();
		$("#textboxs").show();
		limparcampo();//CHAMA O MODAL VAZIO

	});
}

$(document).ready(function(){//O QUE DEVE SER EXECUTADO AO INICIAR A PAGINA
	tudo();
	actions();
});