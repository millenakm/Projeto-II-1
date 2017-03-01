var servidor="http://192.168.1.172:3000/product/";
var dados;
var dele=0;
var naorepete=0;

function dadosModal(){//SALVA OS DADOS ESCRITOS NO MODAL
	Nome =  $('#nome').val();
	Valor = $('#valor').val();
	Estoque = $('#estoque').val();
	Status = $('#status').val();
}

function linhasTabela(id, nome, valor, estoque, status, i){
	var linhas = '<tr><td>'+id+'</td><td>'+nome+'</td><td>'+'R$ '+valor+' '+'</td><td><span class="glyphicon glyphicon-thumbs-'+status+'"></span></td><td>'+estoque+'</td><td>'+'<button type="button" onclick= "modalEditar('+i+')" data-toggle="modal" data-target="#modal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+ '</td><td>'+'<button type="button" onclick= "modalDeletar('+id+')" data-toggle="modal" data-target="#modal" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>' +'</td></tr>';
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
	var dados ={
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
	};return dados;	
}

function deletaItem(id){
	var dados = jsonAjax(id, 'DELETE', '', '', '', '');
	$.ajax(dados);
}
function modalDeletar(id){//FUNÇÃO QUE É CHAMADA
	$("#confirma, #edita, #alertaCampoVazio, #alertaProdutoExiste, #cancela, #corpoModal").hide();
	$("#deleta").show().data("id", id);
	tituloModal("  Tem certeza que deseja deletar?");
}


function modalEditar(o){//FUNÇÃO PARA EDITAR
	$("#confirma, #deleta, #alertaProdutoExiste, #alertaCampoVazio").hide();
	$("#edita, #cancela, #corpoModal").show();
	tituloModal("  Editar Itens");
	$('#nome').val(dados[o].nome);//PEGA AS INFORMAÇÕES EXISTENTES
	$('#valor').val(dados[o].valor);
	$('#status').val(dados[o].status);
	$('#estoque').val(dados[o].estoque);
	muda = dados[o].id;
}

function limparcampo(){//O MODAL INICIA VAZIO
	$('#nome').val("");
	$('#valor').val("");
	$('#estoque').val("");
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



	$("#alertaItemAdicionado, #alertaItemEditado").hide();



	$("#loga").click(function(){
		Login();
	});

	$("#adiciona").click(function(){ //ABRE O MODAL
		tituloModal("  Adicionar Itens");
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
		$("#alertaCampoVazio, #alertaProdutoExiste, #deleta, #edita").hide();
		$("#modal").modal();
		$("#confirma, #cancela, #corpoModal").show();
		limparcampo();//CHAMA O MODAL VAZIO
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