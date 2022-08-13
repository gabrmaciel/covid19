var declaracoes = {
    
    superdimensionado: {
        frase: "Covid é superdimensionado",
        data: "09/03/2020",
        fonte: "UOL",
        video: 'superdimensionado.mp4',
        casos: '25',
        mortes: '0',
    },

    gripezinha: {
        frase: "Não vai ser uma gripezinha que vai me derrubar",
        data: "20/03/2020",
        fonte: "O GLOBO",
        video: 'gripezinha.mp4',
        casos: '904',
        mortes: '11',
    },

    atleta: {
        frase: "Pelo meu histórico de atleta",
        data: "24/03/2020",
        fonte: "TV BRASIL",
        video: 'atleta.mp4',
        casos: '2.201',
        mortes: '46',
    },

    brasileiro: {
        frase: "O Brasileiro precisa ser estudado",
        data: "26/03/2020",
        fonte: "UOL",
        video: 'brasileiro.mp4',
        casos: '2.915',
        mortes: '77',
    },

    coveiro: {
        frase: "Não sou coveiro",
        data: "20/04/2020",
        fonte: "UOL",
        video: 'coveiro.mp4',
        casos: '40.581',
        mortes: '2.575',
    },

    edai: {
        frase: "E daí?",
        data: "28/04/2020",
        fonte: "SBT",
        video: 'edai.mp4',
        casos: '584.016',
        mortes: '5.017',
    },

    maricas: {
        frase: "Tem que deixar de ser um país de maricas",
        data: "10/11/2020",
        fonte: "TV Cultura",
        video: 'maricas.mp4',
        casos: '5.700.044',
        mortes: '162.829',
    },

    angustia: {
        frase: "Pra que essa angústia?",
        data: "16/12/2020",
        fonte: "UOL",
        video: 'angustia.mp4',
        casos: '7.042.695',
        mortes: '183.822',
    },

    diad: {
        frase: "Dia D e Hora H",
        data: "11/01/2021",
        fonte: "UOL",
        video: 'diad.mp4',
        casos: '8.133.833',
        mortes: '203.617',
    },

    asfixiado: {
        frase: "Assassino e filho da puta imita asfixiado",
        data: "18/03/2021",
        fonte: "PODER 360",
        video: 'asfixiado.mp4',
        casos: '11.787.600',
        mortes: '287.795',
    },

}

function SelecionarDeclaracao(id){

    var width = $(window).width();

    if(width > 600){
        quantscroll = 304
    }else{
        quantscroll = 204
    }

    quantpixel = quantscroll * parseInt(id),

    $("#CronogramaScroll").animate({ 
        scrollLeft: quantpixel
     });

     $(".Declaracao").css("transform", "scale(1)");
     $(".DeclaracaoBox").css("pointer-events", "auto");

     $("#Declaracao"+id).css("transform", "scale(1.5)");
     $("#DeclaracaoBox"+id).css("pointer-events", "none");

     $("#id").val(id)
}

function SelecionarVideo(id){

    var src = "video/"+ id +".mp4";
    $("video").attr("src", src);
    $("video")[0].play();

    declaracao = declaracoes[id];
    console.log(declaracao);

    var casosHoje = $("#GraficoCasosTotal").text();
    var mortesHoje = $("#GraficoMortesTotal").text();

    casosHoje = casosHoje.replace(/\./g, '');
    casosHoje = parseInt(casosHoje);

    mortesHoje = mortesHoje.replace(/\./g, '');
    mortesHoje = parseInt(mortesHoje);

    var declaracaoMortesString = declaracao.mortes.replace(/\./g, '');
    declaracaoMortesString = parseInt(declaracaoMortesString);
    
    var declaracaoCasosString = declaracao.casos.replace(/\./g, '');
    declaracaoCasosString = parseInt(declaracaoCasosString);

    var porcentagemMortes = declaracaoMortesString/mortesHoje;
    porcentagemMortes = porcentagemMortes*100;

    var porcentagemCasos = declaracaoCasosString/casosHoje;
    porcentagemCasos = porcentagemCasos*100;

    
    $("#GraficoLinhaLinhaCasos").css("width", porcentagemCasos+"%");
    $("#GraficoLinhaLinhaMortes").css("width", porcentagemMortes+"%");

    $("#GraficoCasos").html(declaracao.casos);
    $("#GraficoMortes").html(declaracao.mortes);

    
    if(porcentagemCasos > 60){
        $("#GraficoCasos").html("");
    }else if(porcentagemCasos > 5){
        $("#GraficoCasos").css("margin-left", porcentagemCasos+"%");
        $("#GraficoZeroCasos").html("0");
    }else{
        $("#GraficoCasos").css("margin-left", "12px");
        $("#GraficoZeroCasos").html("");
    }

    if(porcentagemMortes > 70){
        $("#GraficoMortes").html("");
    }else if(porcentagemMortes > 5){
        $("#GraficoMortes").css("margin-left", porcentagemMortes+"%")
        $("#GraficoZeroMortes").html("0");
    }else{
        $("#GraficoMortes").css("margin-left", "12px");
        $("#GraficoZeroMortes").html("");
    }

}

function RetornaCasosMortes(){
    $.ajax({
        url: "dados.php", 
        success: function(result){
           result = result.split("|");

           casos = result[0]
           mortes = result[1]

           //$("#GraficoCasosTotal").html(casos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
           //$("#GraficoMortesTotal").html(mortes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
        }
    });
}