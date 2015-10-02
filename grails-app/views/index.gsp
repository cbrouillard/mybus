<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>My bus</title>
</head>

<body>
<g:link controller="main" action="index">
    <div id="title">Bus 129</div>

    <div id="heure"></div>

    <div id="next">
        <div id="nextvalue" class="">...</div>
    </div>

    <div id="afternext">
        <div id="afternextvalue" class="">...</div>
    </div>

    <div id="foot">
        <span class="legend ok">&nbsp;</span> Go !
        | <span class="legend maybe">&nbsp;</span> Bof...
        | <span class="legend late">&nbsp;</span> Nope.
    </div>
</g:link>
</body>
</html>
