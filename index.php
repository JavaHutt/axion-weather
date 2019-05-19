<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/reset.min.css">
    <link rel="stylesheet" href="css/weather-icons.min.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="lib/axios.min.js"></script>
    <title>Аксион Погода</title>
</head>
<body class="body">
    <div id="deployment">
        <header class="header">
            <h1 class="header__text">Погода в Ижевске на <time id='time'></time></h1>
        </header>
        <main class="main">
            <div class="current">
                <section class="current__top">
                    <div class="current__top-icon"></div>
                    <p class="current__top-temp"><span id="temp">20</span>°</p>
                    <p class="current__top-measurement">С</p>
                </section>
                <p class="current__condition">Солнечно</p>
                <section class="current__bottom">
                    <p class="current__bottom-item">Ощущается как <span id="feelsLike">20</span>°</p>
                    <p class="current__bottom-item">Скорость ветра <span id="windSpeed">1.4</span>м/с</p>
                    <p class="current__bottom-item">Облачность <span id="cloudCover">10</span>%</p>
                    <p class="current__bottom-item">Давление <span id="pressure">600</span> мм рт.ст.</p>
                    <p class="current__bottom-item">Влажность <span id="humidity">80</span>%</p>
                    <p class="current__bottom-item">Направление ветра <span id="windDirection">СЗ</span></p>
                </section>
            </div>        
            <div class="forecast">
                <h2 class="forecast__header">Прогноз на 7 дней</h2>
                <div class="forecast__container">
                </div>
            </div>        
        </main>
        <footer class="footer">
            <p class="footer__text">АО «Ижевский мотозавод «Аксион-холдинг»</p>
        </footer>
    </div>
    <script src="api.js"></script>
    <script src="script.js"></script>
</body>
</html>