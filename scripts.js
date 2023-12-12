let chave = "cebcd482eda57fa9a6714c1c2ba91885"
let historico = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Brasília"]; // Exemplo de histórico de pesquisa

function colocarNaTela(dados){
    console.log(dados)
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML =  Math.floor(dados.main.temp) + "°C"
    document.querySelector(".descricao").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%"; // Exibir umidade
    document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png"
}

async function buscarCidade(cidade){
    let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
    cidade + 
    "&appid=" + 
    chave + 
    "&lang=pt_br" +
    "&units=metric"
    )
    .then(resposta => resposta.json())

    colocarNaTela(dados)

    // Adicionar a consulta ao histórico
    document.getElementById('historico').innerHTML += cidade + '<br>';

    // Atualizar a lista de opções de cidades
    historico.push(cidade);
    atualizarListaCidades();
}

function atualizarListaCidades() {
    let datalist = document.getElementById('cidades');
    datalist.innerHTML = '';
    historico.forEach(cidade => {
        let option = document.createElement('option');
        option.value = cidade;
        datalist.appendChild(option);
    });
}

function cliqueiNoBotao(){
   let cidade = document.querySelector(".input-cidade").value

   buscarCidade(cidade)
}