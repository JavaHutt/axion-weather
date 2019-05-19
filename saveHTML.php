<?php
    $html = $_POST['html'];
    #echo json_encode($_POST); die();

    $file = fopen('deployment.html', 'w');
    fwrite($file, '<!DOCTYPE html>
                    <html lang="ru">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <link rel="stylesheet" href="css/reset.min.css">
                        <link rel="stylesheet" href="css/weather-icons.min.css">
                        <link rel="stylesheet" href="css/style.css">
                        <title>Аксион Погода</title>
                    </head>
                    <body class="body">
                        ');
    fwrite($file, $html);
    fwrite($file, '</body></html>');
    fclose($file);
