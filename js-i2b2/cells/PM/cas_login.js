/**
 * i2b2 login using a CAS ticket as the credential in place of a password.
 * 
 * @author: Dan Connolly <dconnolly@kumc.edu>
 *
 * umm... not sure what these mean...
 * @inherits    i2b2
 * @namespace           i2b2
 *
 * @todo: figure out what to do if PM:Login fails; maybe include a link
 *        back to the portal or something?
 */

/* see JSLint, The JavaScript Code Quality Tool http://www.jslint.com/ */
/*jslint browser: true, undef: true, strict: true */
/*global alert */
/*global i2b2, i2b2_scopedCallback */
"use strict";

if (undefined==i2b2) { var i2b2 = {}; }
if (undefined==i2b2.PM) { i2b2.PM = {}; }	

/**
 * doCASLogin gets ticket from cookie, looks up domain info, and calls PM:Login
 */
i2b2.PM.doCASLogin = function() {
    var domainname = i2b2.h.getJsonConfig('i2b2_config_data.js').casDomain
    var ticket = readCookie("CAS_ticket");

    var domain, domains = i2b2.PM.model.Domains;
    for (i = 0; i < domains.length; i++) {
	if (domains[i].domain == domainname) {
	    domain = domains[i];
	    break;
	}
    }
    if (!domain) {
        alert('login failed: no such domain in i2b2 config: ' + domainname);
        return;
    }

    var login_service = document.location + "cas_login.html?cas_server=" + encodeURIComponent(domain.CAS_server);

    if (!ticket) {
	document.location = login_service;
        return;
    }

    i2b2.PM.model.CAS_server = domain.CAS_server;
    i2b2.PM.model.url = domain.urlCellPM;
    i2b2.PM.model.allow_analysis = _flag(domain.allowAnalysis, true);
    i2b2.PM.model.login_debugging = _flag(domain.debug, true);

    i2b2.h.LoadingMask.show(); // GUI goes busy

    var callback = new i2b2_scopedCallback(i2b2.PM._processUserConfig, i2b2.PM);
    var parameters = {
        domain: domain.domain, 
        is_shrine: Boolean.parseTo(domain.isSHRINE),
        project: domain.project,
        username: login_service,
        password_text: ticket
    };
    var transportopts = {
        url: domain.urlCellPM,
        user: login_service,
        password: ticket,
        domain: domain.domain,
        project: domain.project
    };

    _make_dialog();
    i2b2.PM.ajax.getUserAuth("PM:Login", parameters, callback, transportopts);
};


function _flag(expr, fallback){
    if (expr != undefined) {
	return Boolean.parseTo(expr);
    } else {
	return fallback;
    }
}


/**
 * i2b2.PM._processUserConfig assumes the dialog exists, so...
 */
function _make_dialog() {
    if (!$("i2b2_login_modal_dialog")) {
	var htmlFrag = i2b2.PM.model.html.loginDialog;
	Element.insert(document.body,htmlFrag);

	if (!i2b2.PM.view.modal.login) {
	    i2b2.PM.view.modal.login = new YAHOO.widget.Panel("i2b2_login_modal_dialog", {
		    zindex: 700,
		    width: "501px",
		    fixedcenter: true,
		    constraintoviewport: true,
		    close: false,
		    draggable: true
		});
	    // connect the form to the PM controller
	    i2b2.PM.udlogin = {};
	    i2b2.PM.udlogin.inputUser = $('loginusr');
	    i2b2.PM.udlogin.inputPass = $('loginpass');
	    i2b2.PM.udlogin.inputDomain = $('logindomain');
	}
    }
}

/**
 * Exception: expected CAS ticket but didn't find one.
 */
i2b2.PM.CASTicketMissing = function() {
}

i2b2.PM.casGetQueryParameters = function(str) {
    return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = decodeURIComponent(n[1]),this}.bind({}))[0];
};

i2b2.PM.set_cas_ticket_cookie_from_url = function(){
    var match, i;
    var adr = location.href;
    match = /ticket=([^&#]*)/.exec(adr);
    var ticket = match ? match[1] : null;
    if (!ticket) {
	throw new i2b2.PM.CASTicketMissing();
    }

    createCookie("CAS_ticket", ticket, 1);
}

// all praise quirksmode. http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
    if (days) {
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
	var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1,c.length);
	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

