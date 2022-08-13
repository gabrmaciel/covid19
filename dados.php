<?php
$html = file_get_contents("http://www.giscard.com.br/coronavirus/");

$html = strip_tags($html);

$html_texto = explode("window.estado",$html);
$html_texto = $html_texto[1];

$html_texto_explode = explode("window.regiao",$html_texto);
$html_texto_explode = $html_texto_explode[0];
$html_texto_explode = substr($html_texto_explode, 5, -12);
$html_texto_explode = explode('":"',$html_texto_explode);

$casos = $html_texto_explode[1];
$casos = explode('","',$casos);
$casos = $casos[0];

$mortes = $html_texto_explode[4];
$mortes = explode('","',$mortes);
$mortes = $mortes[0];

echo $casos."|".$mortes;