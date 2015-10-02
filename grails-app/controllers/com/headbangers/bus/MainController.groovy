package com.headbangers.bus

import grails.converters.JSON
import groovyx.net.http.*

class MainController {

    def index() {
        session['forceReload'] = 45
        render(view: "/index")
    }

    def crawl() {

        // si c'est le matin ou qu'un force refresh est en cours.
        Calendar calendar = Calendar.getInstance()
        calendar.set(Calendar.HOUR_OF_DAY, 8)
        calendar.set(Calendar.MINUTE, 30)
        Date first = calendar.getTime()
        calendar.set(Calendar.HOUR_OF_DAY, 9)
        calendar.set(Calendar.MINUTE, 15)
        Date end = calendar.getTime()

        Date now = new Date()

        if ((now.after(first) && now.before(end)) || (session['forceReload'])) {

            if (session['forceReload']) {
                session['forceReload'] = session['forceReload'] - 1;
            }
            try {
                // va chercher les horaires.
                def http = new HTTPBuilder("http://www.ratp.fr/horaires/fr/ratp/bus/prochains_passages/PP/B129/129_165_192/R");
                def html = http.get([:]);

                // trouve les données interessantes dans le HTML
                BusHours hours = new BusHours()
                def values = new ArrayList<String>()
                html."**".findAll { it.@class.toString().contains("bus") }.each { bnode ->
                    bnode."**".findAll { s -> s.name().equalsIgnoreCase("td") }.each { td ->
                        if (!td.text().contains("Montreuil")) {
                            values.add(td.text())
                        }
                    }
                }

                // vérifie et retourne
                if (values.size() == 2) {
                    hours.next = values.get(0)
                    hours.afterNext = values.get(1)

                    render hours as JSON
                } else {
                    render new BusHours([next: 'ERR', afterNext: 'ERR']) as JSON
                }
            } catch (groovyx.net.http.HttpResponseException ex) {
                ex.printStackTrace()
                render new BusHours([next: 'ERR', afterNext: 'ERR']) as JSON
            } catch (java.net.ConnectException ex) {
                ex.printStackTrace()
                render new BusHours([next: 'ERR', afterNext: 'ERR']) as JSON
            }
        }

        render new BusHours([next: '...', afterNext: '...']) as JSON
    }
}
