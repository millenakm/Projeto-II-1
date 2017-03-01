var servidor="http://192.168.1.172:3000/product/";
var dados;

function linhasTabela(id, nome, valor, estoque, status, i){
	var linhas = '<tr><td>'+id+'</td><td>'+nome+'</td><td>'+'R$ '+valor+' '+'</td><td><span class="glyphicon glyphicon-thumbs-'+status+'"></span></td><td>'+estoque+'</td><td>'+'<button type="button" onclick= "inputsModalEditar('+i+')" data-toggle="modal" data-target="#modal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+ '</td><td>'+'<button type="button" onclick= "modalDeletar('+id+')" data-toggle="modal" data-target="#modal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>' +'</td></tr>';
	return linhas;
}

function criaTabela(){//PRINTA E ARRUMA O VALOR
	var statusBotao = checaStatusPagina();
	$('#tabelaProdutos').empty(); //Limpando a tabela
	$.get(servidor, function(data) {
		dados = data;
		for(var i=0;i<dados.length;i++){
			var id= dados[i].id;
			var valor = valorTabela(dados[i].valor);
			var status = iconeStatus(data[i].status);
			if(dados[i].status == statusBotao){
				var linhas = linhasTabela(dados[i].id, dados[i].nome, valor, dados[i].estoque, status, i);
				$('#tabelaProdutos').append(linhas);
			}  
		}
	});
}

function iconeStatus(statusItem){
	switch(statusItem){
		case "A":
			var icone = 'up';
			break;
		case "I":
			var icone = 'down';
			break;
	}return icone;
}

function valorTabela(valorNum){
	var valorString = valorNum.toString();
	valorString = parseFloat(valorString).toFixed(2)
	valorString = valorString.replace(".", ",");
	return valorString;
}

function checaStatusPagina(){
	var statusBotao = $("#dropdownStatus").data("status");
	return statusBotao;
}

function jsonAjax(id, tipo, nome, valor, estoque, status){
	var dadosJson ={
		url : servidor+id,
		type : tipo,
		data : {
			nome: nome,
			valor: valor,
			estoque: estoque,
			status: status
		},
		success: function(){
			criaTabela();
			$('#modal').modal('hide');
		}
	};return dadosJson;	
}

function deletaItem(id){
	var dadosJson = jsonAjax(id, 'DELETE', '', '', '', '');
	$.ajax(dadosJson);
}
function modalDeletar(id){//FUNÇÃO QUE É CHAMADA
	$("#confirma, #edita, #alertaCampoVazio, #alertaProdutoExiste, #cancela, #corpoModal").hide();
	$("#deleta").show().data("id", id);
	tituloModal("  Tem certeza que deseja deletar?");
}

function dadosModal(id){//SALVA OS DADOS ESCRITOS NO MODAL
	var nome =  $('#nome').val();
	var valor = $('#valor').val();
	var estoque = $('#estoque').val();
	var status = $('#status').val();
	verificaInputs(id, nome, valor, estoque, status);
}

function verificaInputs(id, nome, valor, estoque, status){
	if(nome=="" || valor=="" || estoque==""){// ALERTA DE CAMPO VAZIO
		$("#alertaCampoVazio").show();
		mostraAlerta();
	}else{ //EDITA O ITEM SELECIONADO
		if(id=="adiciona"){
			adicionaItem(nome, valor, estoque, status);
		}
		else{
			editaItem(id, nome, valor, estoque, status);
		}
	}
}

function editaItem(id, nome, valor, estoque, status){
	var dadosJson = jsonAjax(id, 'PUT', nome, valor, estoque, status);
	$.ajax(dadosJson);
	$("#alertaItemEditado").show();//MENSAGEM DE EDIÇÃO CONCLUIDA
	mostraAlerta();
}

function inputsModalEditar(i){
	$('#nome').val(dados[i].nome);
	$('#valor').val(dados[i].valor);
	$('#status').val(dados[i].status);
	$('#estoque').val(dados[i].estoque);
	$("#edita").data("id", dados[i].id);
	modalEditar();
}

function modalEditar(){//FUNÇÃO PARA EDITAR
	$("#confirma, #deleta, #alertaProdutoExiste, #alertaCampoVazio").hide();
	$("#edita, #cancela, #corpoModal").show();
	tituloModal("  Editar Itens");
}

function modalAdicionar(){
	tituloModal("  Adicionar Itens");
	$("#alertaCampoVazio, #alertaProdutoExiste, #deleta, #edita").hide();
	$("#modal").modal();
	$("#confirma, #cancela, #corpoModal").show();
	inputsModalAdicionar();//CHAMA O MODAL VAZIO
}

function inputsModalAdicionar(){//O MODAL INICIA VAZIO
	$('#nome').val("");
	$('#valor').val("");
	$('#estoque').val("");
 }

function adicionaItem(nome, valor, estoque, status){
	var flagNome = checaNome(nome.toLowerCase());
	if(flagNome==0){
		var dadosJson = jsonAjax('', 'POST', nome, valor, estoque, status);
		$.ajax(dadosJson);
		$("#alertaItemAdicionado").show();//ALERTA DE CONCLUIDO
		mostraAlerta();
	}else{
		$("#alertaProdutoExiste").show();//ALERTA DE REPETIÇÃO
		mostraAlerta();
	}	
}

function checaNome(nomeInput){
	var flagNome = 0;
	for(var i=0;i<dados.length;i++){//FAZ VARREDURA PARA VERIFICAR EXISTENCIA DE NOME IGUAL
		var nome = dados[i].nome.toLowerCase();
		if(nome==nomeInput){
			flagNome = 1;
		}
	}
	console.log(flagNome);
	return flagNome;//CHAMA FUNÇÃO QUE VERIFICA NOME IGUAL
}

function tituloModal(titulo){//SELECIONA O tituloModal A PARTIR DO VALOR
	$('#tituloModal').html(titulo);
}

function bloqueiaLetras(e){ //BLOQUEIA LETRAS NO ESTOQUE
	if ((e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) || e.which ==32 )   {
		 return false;
	}
}

function bloqueiaNumeros(e){ //BLOQUEIA NUMEROS NO NOME
	if ((e.which != 8 && e.which != 0 && (e.which < 65 || e.which > 126)) || (e.which>=123 && e.which<=125) || e.which==20 ) {
		 return false;
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
	$("#valor").maskMoney({decimal:".", thousands:"", million:"."});
	$("#botaoAtivo, #botaoInativo").click(function(){//ABRE ITENS INATIVOS
		$("#dropdownStatus").data("status", $(this).data("status"));
		criaTabela();
	});
	$("#estoque").keypress(bloqueiaLetras);
	$("#nome").keypress(bloqueiaNumeros);
	$("#nome, #valor, #estoque").on("drop paste", function(e){
		e.preventDefault();
	});
	$("#deleta").click(function(){ //DELETA OS DADOS DEFINITIVAMENTE
		var id = $(this).data("id");
		deletaItem(id);
	});
	$('#edita').click(function(){
		var id = $(this).data("id");
		dadosModal(id);
	});
	$("#adiciona").click(function(){ //ABRE O MODAL
		modalAdicionar();
	});
	$('#confirma').click(function(){
		dadosModal("adiciona");//PUXA DADOS DIGITADOS NO MODAL
	});
	$("#alertaItemAdicionado, #alertaItemEditado").hide();
	$("#loga").click(function(){
		Login();
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

$(document).ready(function(){//O QUE DEVE SER EXECUTADO AO INICIAR A PAGINA
	criaTabela();
	actions();
});