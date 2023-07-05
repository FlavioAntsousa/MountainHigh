/*
 *
 * Converter coordenadas Google Maps para DMS
 * 2014 - www.marnoto.com
 *
*/

// Váriáveis necessárias
var map;
var infoWindow;

// A variável markersData guarda a informação necessária a cada marcador
// Para utilizar este código basta alterar a informação contida nesta variável
var markersData = [
   {
      lat: -3.083575,
      lng: -60.027033,

    },
   {
      lat: -3.807225,
      lng: -38.523560,

   },
   {
      lat: -5.826406,
      lng: -35.211375,
    },
   {
      lat: -8.040688,
      lng: -35.007269,

    },
   {
      lat: -12.978083,
      lng: -38.503389,

    },
   {
      lat: -15.784834,
      lng: -47.897410,

  },

];


function initialize() {
   var mapOptions = {
      zoom: 9,
      mapTypeId: 'roadmap',
   };

   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

   // cria a nova Info Window com referência à variável infowindow
   // o conteúdo da Info Window será atribuído mais tarde
   infoWindow = new google.maps.InfoWindow();

   // evento que fecha a infoWindow com click no mapa
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Chamada para a função que vai percorrer a informação
   // contida na variável markersData e criar os marcadores a mostrar no mapa
   displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);

// Esta função vai percorrer a informação contida na variável markersData
// e cria os marcadores através da função createMarker
function displayMarkers(){

   // esta variável vai definir a área de mapa a abranger e o nível do zoom
   // de acordo com as posições dos marcadores
   var bounds = new google.maps.LatLngBounds();
   
   // Loop que vai estruturar a informação contida em markersData
   // para que a função createMarker possa criar os marcadores 
   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      var nome = markersData[i].nome;
      var local = markersData[i].local;
      var www = markersData[i].www;


      createMarker(latlng, nome, local, www);

      // Os valores de latitude e longitude do marcador são adicionados à
      // variável bounds
      bounds.extend(latlng);  
   }

   // Depois de criados todos os marcadores
   // a API através da sua função fitBounds vai redefinir o nível do zoom
   // e consequentemente a área do mapa abrangida.
   map.fitBounds(bounds);
}

// Função que cria os marcadores e define o conteúdo de cada Info Window.
function createMarker(latlng, nome, local, www){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: nome
   });

   // Evento que dá instrução à API para estar alerta ao click no marcador.
   // Define o conteúdo e abre a Info Window.
   google.maps.event.addListener(marker, 'click', function() {
      
      // Chamada à função ddToDms(lat, lng) para construir a string das coordenadas.
      // O resultado será guardado na variável dmsCoords.
      var dmsCoords = ddToDms(latlng.lat(), latlng.lng());

      // Variável que define a estrutura do HTML a inserir na Info Window.
      var iwContent = '<div id="iw_container">' +
         '<div class="iw_title">' + nome + '</div>' +
         '<div class="iw_content">' + local + '<br>' +
         '<a href="' + www + '" target="_blank">www.fifa.com/' + nome + '</a><br>' +
         'GPS: ' + dmsCoords + '</div></div>'; // Incluir as coordenadas na Info Window.
      
      // O conteúdo da variável iwContent é inserido na Info Window.
      infoWindow.setContent(iwContent);

      // A Info Window é aberta.
      infoWindow.open(map, marker);
   });
}

// Função que constrói a string de conversão de coordenadas em DD para DMS.
function ddToDms(lat, lng) {

   var lat = lat;
   var lng = lng;
   var latResult, lngResult, dmsResult;

   // Certificar que estamos a trabalhar com números.
   // Isto é importante para o caso de estarmos a trabalhar com valores
   // retirados de inputs de texto no html.
   lat = parseFloat(lat);  
   lng = parseFloat(lng);

   // Verificar a correspondência das coordenadas para a latitude: Norte ou Sul.
   latResult = (lat >= 0)? 'N' : 'S';

   // Chamada à função getDms(lat) para as coordenadas da Latitude em DMS.
   // O resultado será adicionado à variável latResult.
   latResult += getDms(lat);

   // Verificar a correspôndência das coordenadas para a longitude: Este ou Oeste.
   lngResult = (lng >= 0)? 'E' : 'W';

   // Chamada à função getDms(lng) para as coordenadas da Longitude em DMS.
   // O resultado será adicionado à variável lngResult.
   lngResult += getDms(lng);

   // Agora é só juntar as duas variáveis e separá-las com um espaço.
   dmsResult = latResult + ' ' + lngResult;

   // Devolver o resultado para inclusão na Info Window. 
   return dmsResult;
}

// Função que converte DD para DMS.
// Tendo como exemplo o valor -40.601203.
function getDms(val) {

   // Variáveis necessárias à conversão
   var valDeg, valMin, valSec, result;

   // Aqui convertemos o valor recebido no parâmetro para um valor absoluto.
   // Ou seja, convertemos o valor negativo para positivo.
   // Neste passo não interessa se é Norte, Sul, Este ou Oeste, essa verificação foi efetuada anteriormente.
   val = Math.abs(val); // -40.601203 = 40.601203

   // ---- Graus ----
   // Retirar o valor inteiro de DD para obter o valor Degrees em DMS
   valDeg = Math.floor(val); // 40.601203 = 40
   
   // Adicionar o valor graus ao resultado, adicionando o símbolo graus 'º'.   
   result = valDeg + "º"; // 40º

   // ---- Minutos ----
   // Retirar ao valor inicial o valor Degrees para ficar só com a parte decimal.
   // Multiplicar a parte decimal por 60, Math.floor retorna somente o valor inteiro.
   // ((40.601203 - 40 = 0.601203) * 60 = 36.07218) = 36
   valMin = Math.floor((val - valDeg) * 60); // 36.07218 = 36

   // Adicionar o valor minutos ao resultado, adicionando o símbolo minutos '''.
   result += valMin + "'"; // 40º36'

   // ---- Segundos ----
   // Para obter o valor em segundos é necessário:
   // 1º - retirar o valor em graus ao valor inicial: 40 - 40.601203 = 0.601203;
   // 2º - converter o valor minutos (36) em decimal ( valMin/60 = 0.6) para
   // o podermos subtrair ao valor anterior: 0.601203 - 0.6 = 0.001203;
   // 3º - agora que já temos o valor dos segundos em decimal, precisamos de o converter em segundos de grau.
   // Para isso multiplicamos esse valor (0.001203) por 3600, que é
   // o número de segundos existente num grau.
   // Obtemos 0.001203 * 3600 = 4.3308
   // Como estamos a utilizar a função Math.round(),
   // que arredonda o valor à unidade seguinte,
   // podemos controlar o número de casas decimais através da
   // multiplicação por 1000 antes de Math.round
   // e consequente divisão por 1000 após a função Math.round.
   // Obtemos 4.3308 * 1000 = 4330.8 -> Math.round = 4331 -> 4331 / 1000 = 4.331
   // Neste caso o valor final terá 3 casas decimais.
   // Se quisermos somente duas casas decimais basta
   // substituir o valor 1000 por 100.
   valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000; // 40.601203 = 4.331

   // Adicionar o valor segundos ao resultado,
   // adicionando o símbolo segundos '"'.
   result += valSec + '"'; // 40º36'4.331"

   // Devolve a string resultante.
   return result;
}