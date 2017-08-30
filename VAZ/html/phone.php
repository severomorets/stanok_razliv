
<!doctype html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">




    <link rel="stylesheet" href="/themes/style.min.css"/>

    <link rel="stylesheet" href="/css/jqmobile.css"/>
    <script src="/js/jquery.js"></script>
    <script src="/js/jquery.mobile.custom.js"></script>
    <script src="/js/socket.js"></script>

</head>
<body>


<div data-role="page" id="home">

    <div data-role="header">
        <h1>ВАЗ 2121</h1>
    </div>
    <div role="main" class="ui-content">
        <div><img id="statusConnect" src="/img/offline.jpg"></div>
        <div><img style="width: 100px" src="/img/niva.jpg"></div>
        <div>
            <div>Двигатель <span class="status_dvigatel"></span></div>
            <div>Сигнализация <span class="status_signalka"></span></div>
            <div>Температура салона <span class="status_temp_salon"></span></div>
            <div>Температура на улице <span class="status_temp_ulica"></span></div>
            <div>Фары: ближний свет <span class="status_svet_blizhniy"></span></div>
            <div>Фары: дальний свет  <span class="status_svet_dalniy"></span></div>
            <div>t <span class="status_temp_dvig">0</span></div>
            <div>Печка <span class="status_pechka"></span></div>
            <div>rm <span class="status_oborot">0</span></div>
            <div id="subscribe">

            </div>


        </div>

        <p><a href="#options"  class="ui-btn ui-shadow ui-corner-all ui-btn-b">Опции</a></p>
    </div>

    <div data-role="footer">...</div>

</div>

<div data-role="page" id="options" data-theme="a">
    <div data-role="header">
        <h1>Параметры</h1>
    </div>
    <div role="main" class="ui-content">
        <div data-demo-html="true">
            <ul data-role="listview" class="ui-listview">
                <li><a href="#dvigatel"     class="ui-btn ui-btn-icon-right ui-icon-carat-r">Двигатель</a></li>
                <li><a href="#upravlenie"   class="ui-btn ui-btn-icon-right ui-icon-carat-r">Управление</a></li>
                <li><a href="#parametr"     class="ui-btn ui-btn-icon-right ui-icon-carat-r">Параметры авто</a></li>
                <li><a href="#nastroyka"    class="ui-btn ui-btn-icon-right ui-icon-carat-r">настройка</a></li>
                <li><a href="#home"         class="ui-btn ui-btn-icon-right ui-icon-carat-r">home</a></li>
            </ul>
        </div>
    </div>
    <div data-role="footer">
        <h4>Page Footer</h4>
    </div>
</div>
<div data-role="page" id="upravlenie" data-theme="a">
    <div data-role="header">
        <h1>Управление</h1>
    </div>
    <div role="main" class="ui-content" >

            <div>
                <a id="zazhiganie" href="#" data-role="button" data-inline="true" id="zazhiganie" onclick='zazhiganie()'>zazhiganie</a>
                <a id="zapusk" href="#" data-role="button" data-inline="true" id="zapusk" onclick='zapusk()' >zapusk</a>
            </div>

            <a href="#" data-role="button" data-inline="true" id="fari_0" onclick='fari(0)'>fari 0</a>
            <a href="#" data-role="button" data-inline="true" id="fari_1" onclick='fari(1)'>fari 1</a>
            <a href="#" data-role="button" data-inline="true" id="fari_2" onclick='fari(2)'>fari 2</a>
            <a href="#" data-role="button" data-inline="true" id="povorot_0" onclick='povorot(0)'>povorot 0</a>
            <a href="#" data-role="button" data-inline="true" id="povorot_1" onclick='povorot(1)'>povorot 1</a>
            <a href="#" data-role="button" data-inline="true" id="pechka_0" onclick='pechka(0)'>pechka 0</a>
            <a href="#" data-role="button" data-inline="true" id="pechka_1" onclick='pechka(1)'>pechka 1</a>
            <a href="#" data-role="button" data-inline="true" id="dver_0" onclick='dver(0)' >dver 0</a>
            <a href="#" data-role="button" data-inline="true" id="dver_1" onclick='dver(1)'>dver 1</a>
            <a href="#" data-role="button" data-inline="true" id="protivotum" onclick='protivotum()'>protivotum</a>
            <a href="#" data-role="button" data-inline="true" id="signal" onclick='signal()'>signal</a>

        <a href="#home"  class="ui-btn ui-btn-icon-right ui-icon-carat-r">home</a>
    </div>
    <div data-role="footer">
        <h4>Page Footer</h4>
    </div>
</div>
<div data-role="page" id="dvigatel" data-theme="a">
    <div data-role="header">
        <h1>Двигатель</h1>
    </div>
    <div role="main" class="ui-content">
        <div>Температура <span class="status_temp_dvig">0</span></div>
        <div>Обороты <span class="status_oborot">0</span></div>
        <div>Обороты <span class="status_oborot">0</span></div>
    </div>
    <div data-role="footer">
        <h4>Page Footer</h4>
    </div>
</div>


</body>
</html>
