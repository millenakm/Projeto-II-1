var servidor="http://192.168.1.172:3000/product/";
var dados, id;
var troca=0;
var dele=0;
var naorepete=0;

function dadosModal(){//SALVA OS DADOS ESCRITOS NO MODAL
	Nome =  $('#nome').val();
	Valor = $('#valor').val();
	Estoque = $('#estoque').val();
	Status = $('#status').val();
}

function linhasTabela(id, nome, valor, estoque, status, i){
	var linhas = '<tr><td>'+id+'</td><td>'+nome+'</td><td>'+'R$ '+valor+' '+'</td><td>'+status+'</td><td>'+estoque+'</td><td>'+'<button type="button" onclick= "botaoEditaTab('+i+')" data-toggle="modal" data-target="#modal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+ '</td><td>'+'<button type="button" onclick= "botaoDeletaTab('+id+')" data-toggle="modal" data-target="#modal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>' +'</td></tr>';
	return linhas;
}

function criaTabela(){//PRINTA E ARRUMA O VALOR
	$('#tabelaProdutos').empty(); //Limpando a tabela
	$.get(servidor, function(data) {
		dados = data;
		for(var i=0;i<dados.length;i++){
			id= dados[i].id;
			var valor = valorTabela(dados[i].valor);
			var ativoIcon = '<span class="glyphicon glyphicon-thumbs-up"></span>';
			var inativoIcon = '<span class="glyphicon glyphicon-thumbs-down"></span>';
			if (troca==0) {
				if(dados[i].status == "A"){
					var linhas = linhasTabela(dados[i].id, dados[i].nome, valor, dados[i].estoque, ativoIcon, i);
					$('#tabelaProdutos').append(linhas);
				}  
			}
			else{
				if(dados[i].status == "I"){
					var linhas = linhasTabela(dados[i].id, dados[i].nome, valor, dados[i].estoque, inativoIcon, i);
					$('#tabelaProdutos').append(linhas);
				}
			}  
		}
	});
}

function valorTabela(valor){
	var n = valor.toString();
	n = parseFloat(n).toFixed(2)
	n = n.replace(".", ",");
	return n;
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


function botaoDeletaTab(v){//FUNÇÃO QUE É CHAMADA 
	dele = v; //ID DO PRODUTO SALVO AQUI
	$("#confirma").hide();
	$("#edita").hide();
	$("#deleta").show();
	$("#alertaCampoVazio").hide();
	$("#alertaProdutoExiste").hide();
	$("#cancela").hide();
	$("#corpoModal").hide();
	alteranome = 2;
	tituloModal();
	}

function deletaItem(){
	var del = {
		type: 'DELETE',
		url: servidor+ dele,
		success: criaTabela //SE TIVER SUCESSO, VAI LIMPAR A TABELA E PRINTAR NOVAMENTE
	}
	$.ajax(del);
	$('#modal').modal('hide');
}

 function botaoEditaTab(o){//FUNÇÃO PARA EDITAR
	$("#confirma").hide();
	$("#edita").show();
	$("#deleta").hide();
	$("#cancela").show();
	$("#alertaCampoVazio").hide();
	$("#alertaProdutoExiste").hide();
	$("#corpoModal").show();
	alteranome = 1;
	tituloModal();
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

function tituloModal(){//SELECIONA O tituloModal A PARTIR DO VALOR
	if(alteranome==0){
		 document.getElementById('tituloModal').innerHTML = "  Adicionar Itens";
	}else if(alteranome==1){
		document.getElementById('tituloModal').innerHTML = "  Editar Itens";
	}else{
		document.getElementById('tituloModal').innerHTML = "  Tem certeza que deseja deletar?";
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
			var adiciona={
				url : servidor,
				type : 'POST',
				data : {
					nome: Nome,
					valor: Valor,
					estoque: Estoque,
					status: Status
				},
				success: criaTabela	
			}
			$.ajax(adiciona);
			$('#modal').modal('hide');//FECHAMENTO DE MODAL
			$("#alertaItemAdicionado").show();//ALERTA DE CONCLUIDO
			mostraAlerta();

		}else{
			$("#alertaProdutoExiste").show();//ALERTA DE REPETIÇÃO
			mostraAlerta();
			naorepete=0;
		}
}
function mostraAlerta(){
	window.setTimeout(function() {
		$(".alert").slideUp(500, function(){
		$(this).hide(); 
		});
	}, 2000);
}

function actions(){//FUNÇÕES DE BOTÕES E INPUT
	$("#alertaItemAdicionado").hide();
	$("#alertaItemEditado").hide();
	$("#estoque").keypress(verificaNumeroEstoque);
	$("#nome").keypress(Bloqueianumeros);
	$("#valor").keypress(verificaNumerosValor);

	$("#loga").click(function(){
		Login();
	});
	$("#valor").maskMoney({decimal:".", thousands:"", million:"." //MASCARA DE DINHEIRO
	});

	$("#deleta").click(function(){ //DELETA OS DADOS DEFINITIVAMENTE
		deletaItem();
	});

	$("#inativos").click(function(){//ABRE ITENS INATIVOS
		troca = 400;
		criaTabela();
	});

	$("#ativos").click(function(){//ABRE ITENS ATIVOS
		troca = 0;
		criaTabela();
	});

	$("#adiciona").click(function(){ //ABRE O MODAL
		alteranome = 0;
		tituloModal();
	});
	$('#confirma').click(function(){
		dadosModal();//PUXA DADOS DIGITADOS NO MODAL
		if(Nome=="" || Valor=="" || Estoque==""){//SE ESTIVER ALGUM CAMPO VAZIO DA O ALERTA E BLOQUEIA O SUBMIT
			$("#alertaCampoVazio").show();
			mostraAlerta();
		}else{
			for(var i=0;i<dados.length;i++){//FAZ VARREDURA PARA VERIFICAR EXISTENCIA DE NOME IGUAL
				if(dados[i].nome.toLowerCase()===Nome.toLowerCase()){naorepete=1;}//ACHANDO NOME IGUAL, VARIAVEL SETA PARA 1
			}
			nomeIgual();//CHAMA FUNÇÃO QUE VERIFICA NOME IGUAL
		}
	});
	$('#edita').click(function(){
		dadosModal();
		if(Nome=="" || Valor=="" || Estoque==""){// ALERTA DE CAMPO VAZIO
			$("#alertaCampoVazio").show();
			mostraAlerta();
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
				success: criaTabela
		});
		$('#modal').modal('hide');//FECHA MODAL
		$("#alertaItemEditado").show();//MENSAGEM DE EDIÇÃO CONCLUIDA
			mostraAlerta();
	   }
	});
	$("#adiciona").click(function(){ //CHAMA O MODAL INICIAL DE ADICIONAR ITEM
		$("#alertaCampoVazio").hide();
		$("#alertaProdutoExiste").hide();
		$("#modal").modal();
		$("#edita").hide();
		$("#deleta").hide();
		$("#confirma").show();
		$("#cancela").show();
		$("#corpoModal").show();
		limparcampo();//CHAMA O MODAL VAZIO

	});
	$("#nome, #valor, #estoque").on("drop, paste", function(e){
		e.preventDefault();
	});
}

$(document).ready(function(){//O QUE DEVE SER EXECUTADO AO INICIAR A PAGINA
	criaTabela();
	actions();
});