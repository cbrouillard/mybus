// This is a manifest file that'll be compiled into application.js.
//
// Any JavaScript file within this directory can be referenced here using a relative path.
//
// You're free to add application-wide JavaScript to this file, but it's generally better 
// to create separate JavaScript files as needed.
//
//= require jquery
//= require_tree .
//= require_self

if (typeof jQuery !== 'undefined') {
    (function ($) {
        $('#spinner').ajaxStart(function () {
            $(this).fadeIn();
        }).ajaxStop(function () {
            $(this).fadeOut();
        });
    })(jQuery);
}

function heure(id) {
    date = new Date;
    annee = date.getFullYear();
    moi = date.getMonth();
    mois = new Array('Janvier', 'F&eacute;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao&ucirc;t', 'Septembre', 'Octobre', 'Novembre', 'D&eacute;cembre');
    j = date.getDate();
    jour = date.getDay();
    jours = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
    h = date.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    resultat = jours[jour] + ' ' + j + ' ' + mois[moi] + ' ' + annee + ' ' + h + ':' + m + ':' + s;
    $('#' + id).html(resultat);
    setTimeout('heure("' + id + '");', '1000');
    return true;
}

function crawl() {
    $.get("main/crawl", function (data) {
        var next = data.next;
        var afterNext = data.afterNext;

        $("#nextvalue").html(next);
        $("#afternextvalue").html(afterNext);

        // determine la couleur
        var nextCss = 'maybe';
        if (next == '...'){
            nextCss = 'none';
        } else if (next.indexOf("approche") >= 0 || next.indexOf("arret") >= 0) {
            nextCss = 'late'
        } else {
            var nextInt = parseInt(next.split(' ')[0]);
            if (nextInt <= 2) {
                nextCss = 'late';
            } else if (nextInt < 5) {
                nextCss = 'ok';
            }
        }
        $("#nextvalue").attr("class", nextCss);

        var afternextCss = 'maybe';
        if (afterNext == '...'){
            afternextCss = 'none';
        }else if (afterNext.indexOf("approche") >= 0 || afterNext.indexOf("arret") >= 0) {
            afternextCss = 'late'
        } else {
            nextInt = parseInt(afterNext.split(' ')[0]);
            if (nextInt <= 2) {
                afternextCss = 'late';
            } else if (nextInt < 5) {
                afternextCss = 'ok';
            }
        }
        $("#afternextvalue").attr("class", afternextCss);
    });

    setTimeout('crawl();', '60000');
}
