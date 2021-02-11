 const c = (el) =>{
 return document.querySelector(el);
}


let seuVotoPara = c('.d-1-1 span');
let cargo = c('.d-1-2');
let descricao = c('.d-1-4');
let aviso = c('.d-2');
let lateral = c('.d-1-right');
let numeros  = c('.d-1-3');
let votos = [];
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
const comecarEtapa = () =>{
	let etapa = etapas[etapaAtual];
	numero = '';
	votoBranco= false;
	let numeroHTML = '';
	for(let i = 0; i < etapa.numeros; i++){
		if(i === 0){
			numeroHTML += '<div class="numero pisca"></div>';
		}else{
		numeroHTML += '<div class="numero"></div>';
	}
	}
	seuVotoPara.style.display = "none";
	cargo.innerHTML = etapa.titulo;
	descricao.innerHTML = "";
	aviso.style.display="none";
	lateral.innerHTML = "";
	numeros.innerHTML = numeroHTML;
}
const atualizaInterface = ()=>{
	let etapa = etapas[etapaAtual];
	let candidato = etapa.candidatos.filter((item)=>{
		return (item.numero === numero) ?true:false
	})
if(candidato.length > 0){
	candidato = candidato[0];
	seuVotoPara.style.display = "block";
	aviso.style.display="block";
	descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido:${candidato.partido}`;
	let fotosHtml = '';
	for(let i in candidato.fotos){
		if(candidato.fotos[i].small){
		fotosHtml +=`<div class="d-1-image small"><img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
		}else{
		fotosHtml +=`<div class="d-1-image"><img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
	}}
	lateral.innerHTML = fotosHtml;
}else{
	seuVotoPara.style.display = "block";
	aviso.style.display="block";
	descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
}
}
const clicou = (n) =>{
let elNumero = c('.numero.pisca');
if(elNumero  !== null){
	elNumero.innerHTML = n;
	numero = `${numero}${n}`;

	elNumero.classList.remove('pisca');
	if(elNumero.nextElementSibling !== null){
	elNumero.nextElementSibling.classList.add('pisca');
    }else{
    	atualizaInterface()
    }
}
}
const branco = () =>{
numero ='';
votoBranco = true;
seuVotoPara.style.display = "block";
aviso.style.display="block";
numeros.innerHTML = '';
descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
lateral.innerHTML = '';
}
const corrige = () =>{
comecarEtapa();
}
const confirma = ()=>{
let etapa = etapas[etapaAtual];
let votoConfirmado = false;
if(votoBranco === true){
votoConfirmado = true;
votos.push({
	etapa: etapas[etapaAtual].titulo,
	voto:'branco'
})
}
if(numero.length === etapa.numeros){
votoConfirmado = true;
votos.push({
	etapa: etapas[etapaAtual].titulo,
	voto:numero
})
}
if(votoConfirmado){
	etapaAtual++;
	if(etapas[etapaAtual] !== undefined){
		comecarEtapa();
	}else{
		c('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
		console.log(votos);
	}
}
}
comecarEtapa();