/*!	SWFObject v2.2 <http://code.google.com/p/swfobject/>
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/

// Copyright: Hiroshi Ichikawa <http://gimite.net/en/>
// License: New BSD License
// Reference: http://dev.w3.org/html5/websockets/
// Reference: http://tools.ietf.org/html/rfc6455

/*
    json2.js
    See http://javascript.crockford.com/jsmin.html
*/

WEB_SOCKET_SWF_LOCATION = "WebSocketMain.swf";
var swfobject = function() {
    var D = "undefined",
    r = "object",
    S = "Shockwave Flash",
    W = "ShockwaveFlash.ShockwaveFlash",
    q = "application/x-shockwave-flash",
    R = "SWFObjectExprInst",
    x = "onreadystatechange",
    O = window,
    j = document,
    t = navigator,
    T = false,
    U = [h],
    o = [],
    N = [],
    I = [],
    l,
    Q,
    E,
    B,
    J = false,
    a = false,
    n,
    G,
    m = true,
    M = function() {
        var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D,
        ah = t.userAgent.toLowerCase(),
        Y = t.platform.toLowerCase(),
        ae = Y ? /win/.test(Y) : /win/.test(ah),
        ac = Y ? /mac/.test(Y) : /mac/.test(ah),
        af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
        X = !+"\v1",
        ag = [0, 0, 0],
        ab = null;
        if (typeof t.plugins != D && typeof t.plugins[S] == r) {
            ab = t.plugins[S].description;
            if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                T = true;
                X = false;
                ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
            }
        } else {
            if (typeof O.ActiveXObject != D) {
                try {
                    var ad = new ActiveXObject(W);
                    if (ad) {
                        ab = ad.GetVariable("$version");
                        if (ab) {
                            X = true;
                            ab = ab.split(" ")[1].split(",");
                            ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                        }
                    }
                } catch(Z) {}
            }
        }
        return {
            w3: aa,
            pv: ag,
            wk: af,
            ie: X,
            win: ae,
            mac: ac
        }
    } (),
    k = function() {
        if (!M.w3) {
            return
        }
        if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
            f()
        }
        if (!J) {
            if (typeof j.addEventListener != D) {
                j.addEventListener("DOMContentLoaded", f, false)
            }
            if (M.ie && M.win) {
                j.attachEvent(x,
                function() {
                    if (j.readyState == "complete") {
                        j.detachEvent(x, arguments.callee);
                        f()
                    }
                });
                if (O == top) { (function() {
                        if (J) {
                            return
                        }
                        try {
                            j.documentElement.doScroll("left")
                        } catch(X) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        f()
                    })()
                }
            }
            if (M.wk) { (function() {
                    if (J) {
                        return
                    }
                    if (!/loaded|complete/.test(j.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    f()
                })()
            }
            s(f)
        }
    } ();
    function f() {
        if (J) {
            return
        }
        try {
            var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
            Z.parentNode.removeChild(Z)
        } catch(aa) {
            return
        }
        J = true;
        var X = U.length;
        for (var Y = 0; Y < X; Y++) {
            U[Y]()
        }
    }
    function K(X) {
        if (J) {
            X()
        } else {
            U[U.length] = X
        }
    }
    function s(Y) {
        if (typeof O.addEventListener != D) {
            O.addEventListener("load", Y, false)
        } else {
            if (typeof j.addEventListener != D) {
                j.addEventListener("load", Y, false)
            } else {
                if (typeof O.attachEvent != D) {
                    i(O, "onload", Y)
                } else {
                    if (typeof O.onload == "function") {
                        var X = O.onload;
                        O.onload = function() {
                            X();
                            Y()
                        }
                    } else {
                        O.onload = Y
                    }
                }
            }
        }
    }
    function h() {
        if (T) {
            V()
        } else {
            H()
        }
    }
    function V() {
        var X = j.getElementsByTagName("body")[0];
        var aa = C(r);
        aa.setAttribute("type", q);
        var Z = X.appendChild(aa);
        if (Z) {
            var Y = 0; (function() {
                if (typeof Z.GetVariable != D) {
                    var ab = Z.GetVariable("$version");
                    if (ab) {
                        ab = ab.split(" ")[1].split(",");
                        M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                    }
                } else {
                    if (Y < 10) {
                        Y++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                X.removeChild(aa);
                Z = null;
                H()
            })()
        } else {
            H()
        }
    }
    function H() {
        var ag = o.length;
        if (ag > 0) {
            for (var af = 0; af < ag; af++) {
                var Y = o[af].id;
                var ab = o[af].callbackFn;
                var aa = {
                    success: false,
                    id: Y
                };
                if (M.pv[0] > 0) {
                    var ae = c(Y);
                    if (ae) {
                        if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                            w(Y, true);
                            if (ab) {
                                aa.success = true;
                                aa.ref = z(Y);
                                ab(aa)
                            }
                        } else {
                            if (o[af].expressInstall && A()) {
                                var ai = {};
                                ai.data = o[af].expressInstall;
                                ai.width = ae.getAttribute("width") || "0";
                                ai.height = ae.getAttribute("height") || "0";
                                if (ae.getAttribute("class")) {
                                    ai.styleclass = ae.getAttribute("class")
                                }
                                if (ae.getAttribute("align")) {
                                    ai.align = ae.getAttribute("align")
                                }
                                var ah = {};
                                var X = ae.getElementsByTagName("param");
                                var ac = X.length;
                                for (var ad = 0; ad < ac; ad++) {
                                    if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                        ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                    }
                                }
                                P(ai, ah, Y, ab)
                            } else {
                                p(ae);
                                if (ab) {
                                    ab(aa)
                                }
                            }
                        }
                    }
                } else {
                    w(Y, true);
                    if (ab) {
                        var Z = z(Y);
                        if (Z && typeof Z.SetVariable != D) {
                            aa.success = true;
                            aa.ref = Z
                        }
                        ab(aa)
                    }
                }
            }
        }
    }
    function z(aa) {
        var X = null;
        var Y = c(aa);
        if (Y && Y.nodeName == "OBJECT") {
            if (typeof Y.SetVariable != D) {
                X = Y
            } else {
                var Z = Y.getElementsByTagName(r)[0];
                if (Z) {
                    X = Z
                }
            }
        }
        return X
    }
    function A() {
        return ! a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
    }
    function P(aa, ab, X, Z) {
        a = true;
        E = Z || null;
        B = {
            success: false,
            id: X
        };
        var ae = c(X);
        if (ae) {
            if (ae.nodeName == "OBJECT") {
                l = g(ae);
                Q = null
            } else {
                l = ae;
                Q = X
            }
            aa.id = R;
            if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
                aa.width = "310"
            }
            if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
                aa.height = "137"
            }
            j.title = j.title.slice(0, 47) + " - Flash Player Installation";
            var ad = M.ie && M.win ? "ActiveX": "PlugIn",
            ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
            if (typeof ab.flashvars != D) {
                ab.flashvars += "&" + ac
            } else {
                ab.flashvars = ac
            }
            if (M.ie && M.win && ae.readyState != 4) {
                var Y = C("div");
                X += "SWFObjectNew";
                Y.setAttribute("id", X);
                ae.parentNode.insertBefore(Y, ae);
                ae.style.display = "none"; (function() {
                    if (ae.readyState == 4) {
                        ae.parentNode.removeChild(ae)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            u(aa, ab, X)
        }
    }
    function p(Y) {
        if (M.ie && M.win && Y.readyState != 4) {
            var X = C("div");
            Y.parentNode.insertBefore(X, Y);
            X.parentNode.replaceChild(g(Y), X);
            Y.style.display = "none"; (function() {
                if (Y.readyState == 4) {
                    Y.parentNode.removeChild(Y)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            Y.parentNode.replaceChild(g(Y), Y)
        }
    }
    function g(ab) {
        var aa = C("div");
        if (M.win && M.ie) {
            aa.innerHTML = ab.innerHTML
        } else {
            var Y = ab.getElementsByTagName(r)[0];
            if (Y) {
                var ad = Y.childNodes;
                if (ad) {
                    var X = ad.length;
                    for (var Z = 0; Z < X; Z++) {
                        if (! (ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                            aa.appendChild(ad[Z].cloneNode(true))
                        }
                    }
                }
            }
        }
        return aa
    }
    function u(ai, ag, Y) {
        var X, aa = c(Y);
        if (M.wk && M.wk < 312) {
            return X
        }
        if (aa) {
            if (typeof ai.id == D) {
                ai.id = Y
            }
            if (M.ie && M.win) {
                var ah = "";
                for (var ae in ai) {
                    if (ai[ae] != Object.prototype[ae]) {
                        if (ae.toLowerCase() == "data") {
                            ag.movie = ai[ae]
                        } else {
                            if (ae.toLowerCase() == "styleclass") {
                                ah += ' class="' + ai[ae] + '"'
                            } else {
                                if (ae.toLowerCase() != "classid") {
                                    ah += " " + ae + '="' + ai[ae] + '"'
                                }
                            }
                        }
                    }
                }
                var af = "";
                for (var ad in ag) {
                    if (ag[ad] != Object.prototype[ad]) {
                        af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                    }
                }
                aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                N[N.length] = ai.id;
                X = c(ai.id)
            } else {
                var Z = C(r);
                Z.setAttribute("type", q);
                for (var ac in ai) {
                    if (ai[ac] != Object.prototype[ac]) {
                        if (ac.toLowerCase() == "styleclass") {
                            Z.setAttribute("class", ai[ac])
                        } else {
                            if (ac.toLowerCase() != "classid") {
                                Z.setAttribute(ac, ai[ac])
                            }
                        }
                    }
                }
                for (var ab in ag) {
                    if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                        e(Z, ab, ag[ab])
                    }
                }
                aa.parentNode.replaceChild(Z, aa);
                X = Z
            }
        }
        return X
    }
    function e(Z, X, Y) {
        var aa = C("param");
        aa.setAttribute("name", X);
        aa.setAttribute("value", Y);
        Z.appendChild(aa)
    }
    function y(Y) {
        var X = c(Y);
        if (X && X.nodeName == "OBJECT") {
            if (M.ie && M.win) {
                X.style.display = "none"; (function() {
                    if (X.readyState == 4) {
                        b(Y)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                X.parentNode.removeChild(X)
            }
        }
    }
    function b(Z) {
        var Y = c(Z);
        if (Y) {
            for (var X in Y) {
                if (typeof Y[X] == "function") {
                    Y[X] = null
                }
            }
            Y.parentNode.removeChild(Y)
        }
    }
    function c(Z) {
        var X = null;
        try {
            X = j.getElementById(Z)
        } catch(Y) {}
        return X
    }
    function C(X) {
        return j.createElement(X)
    }
    function i(Z, X, Y) {
        Z.attachEvent(X, Y);
        I[I.length] = [Z, X, Y]
    }
    function F(Z) {
        var Y = M.pv,
        X = Z.split(".");
        X[0] = parseInt(X[0], 10);
        X[1] = parseInt(X[1], 10) || 0;
        X[2] = parseInt(X[2], 10) || 0;
        return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true: false
    }
    function v(ac, Y, ad, ab) {
        if (M.ie && M.mac) {
            return
        }
        var aa = j.getElementsByTagName("head")[0];
        if (!aa) {
            return
        }
        var X = (ad && typeof ad == "string") ? ad: "screen";
        if (ab) {
            n = null;
            G = null
        }
        if (!n || G != X) {
            var Z = C("style");
            Z.setAttribute("type", "text/css");
            Z.setAttribute("media", X);
            n = aa.appendChild(Z);
            if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                n = j.styleSheets[j.styleSheets.length - 1]
            }
            G = X
        }
        if (M.ie && M.win) {
            if (n && typeof n.addRule == r) {
                n.addRule(ac, Y)
            }
        } else {
            if (n && typeof j.createTextNode != D) {
                n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
            }
        }
    }
    function w(Z, X) {
        if (!m) {
            return
        }
        var Y = X ? "visible": "hidden";
        if (J && c(Z)) {
            c(Z).style.visibility = Y
        } else {
            v("#" + Z, "visibility:" + Y)
        }
    }
    function L(Y) {
        var Z = /[\\\"<>\.;]/;
        var X = Z.exec(Y) != null;
        return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
    }
    var d = function() {
        if (M.ie && M.win) {
            window.attachEvent("onunload",
            function() {
                var ac = I.length;
                for (var ab = 0; ab < ac; ab++) {
                    I[ab][0].detachEvent(I[ab][1], I[ab][2])
                }
                var Z = N.length;
                for (var aa = 0; aa < Z; aa++) {
                    y(N[aa])
                }
                for (var Y in M) {
                    M[Y] = null
                }
                M = null;
                for (var X in swfobject) {
                    swfobject[X] = null
                }
                swfobject = null
            })
        }
    } ();
    return {
        registerObject: function(ab, X, aa, Z) {
            if (M.w3 && ab && X) {
                var Y = {};
                Y.id = ab;
                Y.swfVersion = X;
                Y.expressInstall = aa;
                Y.callbackFn = Z;
                o[o.length] = Y;
                w(ab, false)
            } else {
                if (Z) {
                    Z({
                        success: false,
                        id: ab
                    })
                }
            }
        },
        getObjectById: function(X) {
            if (M.w3) {
                return z(X)
            }
        },
        embedSWF: function(ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
            var X = {
                success: false,
                id: ah
            };
            if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                w(ah, false);
                K(function() {
                    ae += "";
                    ag += "";
                    var aj = {};
                    if (af && typeof af === r) {
                        for (var al in af) {
                            aj[al] = af[al]
                        }
                    }
                    aj.data = ab;
                    aj.width = ae;
                    aj.height = ag;
                    var am = {};
                    if (ad && typeof ad === r) {
                        for (var ak in ad) {
                            am[ak] = ad[ak]
                        }
                    }
                    if (Z && typeof Z === r) {
                        for (var ai in Z) {
                            if (typeof am.flashvars != D) {
                                am.flashvars += "&" + ai + "=" + Z[ai]
                            } else {
                                am.flashvars = ai + "=" + Z[ai]
                            }
                        }
                    }
                    if (F(Y)) {
                        var an = u(aj, am, ah);
                        if (aj.id == ah) {
                            w(ah, true)
                        }
                        X.success = true;
                        X.ref = an
                    } else {
                        if (aa && A()) {
                            aj.data = aa;
                            P(aj, am, ah, ac);
                            return
                        } else {
                            w(ah, true)
                        }
                    }
                    if (ac) {
                        ac(X)
                    }
                })
            } else {
                if (ac) {
                    ac(X)
                }
            }
        },
        switchOffAutoHideShow: function() {
            m = false
        },
        ua: M,
        getFlashPlayerVersion: function() {
            return {
                major: M.pv[0],
                minor: M.pv[1],
                release: M.pv[2]
            }
        },
        hasFlashPlayerVersion: F,
        createSWF: function(Z, Y, X) {
            if (M.w3) {
                return u(Z, Y, X)
            } else {
                return undefined
            }
        },
        showExpressInstall: function(Z, aa, X, Y) {
            if (M.w3 && A()) {
                P(Z, aa, X, Y)
            }
        },
        removeSWF: function(X) {
            if (M.w3) {
                y(X)
            }
        },
        createCSS: function(aa, Z, Y, X) {
            if (M.w3) {
                v(aa, Z, Y, X)
            }
        },
        addDomLoadEvent: K,
        addLoadEvent: s,
        getQueryParamValue: function(aa) {
            var Z = j.location.search || j.location.hash;
            if (Z) {
                if (/\?/.test(Z)) {
                    Z = Z.split("?")[1]
                }
                if (aa == null) {
                    return L(Z)
                }
                var Y = Z.split("&");
                for (var X = 0; X < Y.length; X++) {
                    if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                        return L(Y[X].substring((Y[X].indexOf("=") + 1)))
                    }
                }
            }
            return ""
        },
        expressInstallCallback: function() {
            if (a) {
                var X = c(R);
                if (X && l) {
                    X.parentNode.replaceChild(l, X);
                    if (Q) {
                        w(Q, true);
                        if (M.ie && M.win) {
                            l.style.display = "block"
                        }
                    }
                    if (E) {
                        E(B)
                    }
                }
                a = false
            }
        }
    }
} (); (function() {
    if (window.WEB_SOCKET_FORCE_FLASH) {} else {
        if (window.WebSocket) {
            return
        } else {
            if (window.MozWebSocket) {
                window.WebSocket = MozWebSocket;
                return
            }
        }
    }
    var a;
    if (window.WEB_SOCKET_LOGGER) {
        a = WEB_SOCKET_LOGGER
    } else {
        if (window.console && window.console.log && window.console.error) {
            a = window.console
        } else {
            a = {
                log: function() {},
                error: function() {}
            }
        }
    }
    if (swfobject.getFlashPlayerVersion().major < 10) {
        a.error("Flash Player >= 10.0.0 is required.");
        return
    }
    if (location.protocol == "file:") {
        a.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://...")
    }
    window.WebSocket = function(d, e, c, g, f) {
        var b = this;
        b.__id = WebSocket.__nextId++;
        WebSocket.__instances[b.__id] = b;
        b.readyState = WebSocket.CONNECTING;
        b.bufferedAmount = 0;
        b.__events = {};
        if (!e) {
            e = []
        } else {
            if (typeof e == "string") {
                e = [e]
            }
        }
        b.__createTask = setTimeout(function() {
            WebSocket.__addTask(function() {
                b.__createTask = null;
                WebSocket.__flash.create(b.__id, d, e, c || null, g || 0, f || null)
            })
        },
        0)
    };
    WebSocket.prototype.send = function(c) {
        if (this.readyState == WebSocket.CONNECTING) {
            throw "INVALID_STATE_ERR: Web Socket connection has not been established"
        }
        var b = WebSocket.__flash.send(this.__id, encodeURIComponent(c));
        if (b < 0) {
            return true
        } else {
            this.bufferedAmount += b;
            return false
        }
    };
    WebSocket.prototype.close = function() {
        if (this.__createTask) {
            clearTimeout(this.__createTask);
            this.__createTask = null;
            this.readyState = WebSocket.CLOSED;
            return
        }
        if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) {
            return
        }
        this.readyState = WebSocket.CLOSING;
        WebSocket.__flash.close(this.__id)
    };
    WebSocket.prototype.addEventListener = function(c, d, b) {
        if (! (c in this.__events)) {
            this.__events[c] = []
        }
        this.__events[c].push(d)
    };
    WebSocket.prototype.removeEventListener = function(e, f, b) {
        if (! (e in this.__events)) {
            return
        }
        var d = this.__events[e];
        for (var c = d.length - 1; c >= 0; --c) {
            if (d[c] === f) {
                d.splice(c, 1);
                break
            }
        }
    };
    WebSocket.prototype.dispatchEvent = function(e) {
        var c = this.__events[e.type] || [];
        for (var b = 0; b < c.length; ++b) {
            c[b](e)
        }
        var d = this["on" + e.type];
        if (d) {
            d.apply(this, [e])
        }
    };
    WebSocket.prototype.__handleEvent = function(d) {
        if ("readyState" in d) {
            this.readyState = d.readyState
        }
        if ("protocol" in d) {
            this.protocol = d.protocol
        }
        var b;
        if (d.type == "open" || d.type == "error") {
            b = this.__createSimpleEvent(d.type)
        } else {
            if (d.type == "close") {
                b = this.__createSimpleEvent("close");
                b.wasClean = d.wasClean ? true: false;
                b.code = d.code;
                b.reason = d.reason
            } else {
                if (d.type == "message") {
                    var c = decodeURIComponent(d.message);
                    b = this.__createMessageEvent("message", c)
                } else {
                    throw "unknown event type: " + d.type
                }
            }
        }
        this.dispatchEvent(b)
    };
    WebSocket.prototype.__createSimpleEvent = function(b) {
        if (document.createEvent && window.Event) {
            var c = document.createEvent("Event");
            c.initEvent(b, false, false);
            return c
        } else {
            return {
                type: b,
                bubbles: false,
                cancelable: false
            }
        }
    };
    WebSocket.prototype.__createMessageEvent = function(b, d) {
        if (window.MessageEvent && typeof(MessageEvent) == "function" && !window.opera) {
            return new MessageEvent("message", {
                view: window,
                bubbles: false,
                cancelable: false,
                data: d
            })
        } else {
            if (document.createEvent && window.MessageEvent && !window.opera) {
                var c = document.createEvent("MessageEvent");
                c.initMessageEvent("message", false, false, d, null, null, window, null);
                return c
            } else {
                return {
                    type: b,
                    data: d,
                    bubbles: false,
                    cancelable: false
                }
            }
        }
    };
    WebSocket.CONNECTING = 0;
    WebSocket.OPEN = 1;
    WebSocket.CLOSING = 2;
    WebSocket.CLOSED = 3;
    WebSocket.__isFlashImplementation = true;
    WebSocket.__initialized = false;
    WebSocket.__flash = null;
    WebSocket.__instances = {};
    WebSocket.__tasks = [];
    WebSocket.__nextId = 0;
    WebSocket.loadFlashPolicyFile = function(b) {
        WebSocket.__addTask(function() {
            WebSocket.__flash.loadManualPolicyFile(b)
        })
    };
    WebSocket.__initialize = function() {
        if (WebSocket.__initialized) {
            return
        }
        WebSocket.__initialized = true;
        if (WebSocket.__swfLocation) {
            window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation
        }
        if (!window.WEB_SOCKET_SWF_LOCATION) {
            a.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
            return
        }
        if (!window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR && !WEB_SOCKET_SWF_LOCATION.match(/(^|\/)WebSocketMainInsecure\.swf(\?.*)?$/) && WEB_SOCKET_SWF_LOCATION.match(/^\w+:\/\/([^\/]+)/)) {
            var d = RegExp.$1;
            if (location.host != d) {
                a.error("[WebSocket] You must host HTML and WebSocketMain.swf in the same host ('" + location.host + "' != '" + d + "'). See also 'How to host HTML file and SWF file in different domains' section in README.md. If you use WebSocketMainInsecure.swf, you can suppress this message by WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR = true;")
            }
        }
        var b = document.createElement("div");
        b.id = "webSocketContainer";
        b.style.position = "absolute";
        if (WebSocket.__isFlashLite()) {
            b.style.left = "0px";
            b.style.top = "0px"
        } else {
            b.style.left = "-100px";
            b.style.top = "-100px"
        }
        var c = document.createElement("div");
        c.id = "webSocketFlash";
        b.appendChild(c);
        document.body.appendChild(b);
        swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
            hasPriority: true,
            swliveconnect: true,
            allowScriptAccess: "always"
        },
        null,
        function(f) {
            if (!f.success) {
                a.error("[WebSocket] swfobject.embedSWF failed")
            }
        })
    };
    WebSocket.__onFlashInitialized = function() {
        setTimeout(function() {
            WebSocket.__flash = document.getElementById("webSocketFlash");
            WebSocket.__flash.setCallerUrl(location.href);
            WebSocket.__flash.setDebug( !! window.WEB_SOCKET_DEBUG);
            for (var b = 0; b < WebSocket.__tasks.length; ++b) {
                WebSocket.__tasks[b]()
            }
            WebSocket.__tasks = []
        },
        0)
    };
    WebSocket.__onFlashEvent = function() {
        setTimeout(function() {
            try {
                var c = WebSocket.__flash.receiveEvents();
                for (var b = 0; b < c.length; ++b) {
                    WebSocket.__instances[c[b].webSocketId].__handleEvent(c[b])
                }
            } catch(d) {
                a.error(d)
            }
        },
        0);
        return true
    };
    WebSocket.__log = function(b) {
        a.log(decodeURIComponent(b))
    };
    WebSocket.__error = function(b) {
        a.error(decodeURIComponent(b))
    };
    WebSocket.__addTask = function(b) {
        if (WebSocket.__flash) {
            b()
        } else {
            WebSocket.__tasks.push(b)
        }
    };
    WebSocket.__isFlashLite = function() {
        if (!window.navigator || !window.navigator.mimeTypes) {
            return false
        }
        var b = window.navigator.mimeTypes["application/x-shockwave-flash"];
        if (!b || !b.enabledPlugin || !b.enabledPlugin.filename) {
            return false
        }
        return b.enabledPlugin.filename.match(/flashlite/i) ? true: false
    };
    if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) {
        swfobject.addDomLoadEvent(function() {
            WebSocket.__initialize()
        })
    }
})();
if (typeof JSON !== "object") {
    JSON = {}
} (function() {
    function f(n) {
        return n < 10 ? "0" + n: n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        }
    }
    var cx, escapable, gap, indent, meta, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable,
        function(a) {
            var c = meta[a];
            return typeof c === "string" ? c: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
        }) + '"': '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap,
        partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
        case "string":
            return quote(value);
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null"
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null"
                }
                v = partial.length === 0 ? "[]": gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]": "[" + partial.join(",") + "]";
                gap = mind;
                return v
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": ": ":") + v)
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": ": ":") + v)
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}": gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}": "{" + partial.join(",") + "}";
            gap = mind;
            return v
        }
    }
    if (typeof JSON.stringify !== "function") {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function(text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx,
                function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                },
                "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
} ());

/*
**************************************************************************
 sgcWebSocket component

 written by eSeGeCe
            copyright ?2016
            Email : info@esegece.com
            Web : http://www.esegece.com
**************************************************************************
*/

function GUID() {
    var a = function() {
        return Math.floor(Math.random() * 65536).toString(16)
    };
    return (a() + a() + a() + a() + a() + a() + a() + a())
}
function event(a) {
    this.name = a;
    this.eventAction = null;
    this.subscribe = function(b) {
        this.eventAction = b
    };
    this.fire = function(c, b) {
        if (this.eventAction != null) {
            this.eventAction(c, b)
        }
    }
}
function sgcStreamToString(b, c) {
    var a = new FileReader();
    a.readAsText(b);
    a.onload = function() {
        vResult = a.result;
        c(vResult)
    }
}
function sgcWSStreamRead(b, c) {
    var a = b.slice(0, 10);
    sgcStreamToString(a,
    function(f) {
        var e = parseInt(f);
        var d = b.slice(10, 10 + e);
        sgcStreamToString(d,
        function(h) {
            var g = h;
            var i = b.slice(10 + e, b.size);
            c(g, i)
        })
    })
}
function sgcWebSocket() {
    if (arguments.length == 0) {
        return
    }
    if (typeof arguments[0] == "object") {
        this.host = arguments[0]["host"];
        this.subprotocol = arguments[0]["subprotocol"];
        this.user = arguments[0]["user"];
        this.password = arguments[0]["password"];
        this.transport = arguments[0]["transport"]
    } else {
        if (typeof arguments[0] == "string") {
            this.host = arguments[0];
            this.subprotocol = arguments[1];
            this.transport = arguments[2]
        } else {
            return
        }
    }
    if (this.host == undefined) {
        this.host = "127.0.0.1"
    }
    if (this.subprotocol == undefined) {
        this.subprotocol = ""
    }
    if (this.transport == undefined) {
        this.transport = ["websocket", "sse"]
    }
    var a = new event("onopen");
    var c = new event("onclose");
    var f = new event("onmessage");
    var e = new event("onerror");
    if ((window.WebSocket) && (1)) {
        var d = new event("onstream");
        this.open = function() {
            if ((this.host !== "") && (this.user !== "") && (this.user !== undefined)) {
                if (this.password == undefined) {
                    this.password == ""
                }
                if ((this.subprotocol !== "") && (this.subprotocol !== undefined)) {
                    this.websocket = new WebSocket(this.host + "/sgc/auth/url/" + this.user + "/" + this.password, this.subprotocol)
                } else {
                    this.websocket = new WebSocket(this.host + "/sgc/auth/url/" + this.user + "/" + this.password)
                }
            } else {
                if ((this.host !== "") && (this.subprotocol !== "") && (this.subprotocol !== undefined)) {
                    this.websocket = new WebSocket(this.host, this.subprotocol)
                } else {
                    if (this.host !== "") {
                        this.websocket = new WebSocket(this.host)
                    }
                }
            }
            this.websocket.onopen = function() {
                a.fire({
                    name: "onopen",
                    message: ""
                })
            };
            this.websocket.onmessage = function(g) {
                if (typeof g.data === "object") {
                    d.fire({
                        name: "onstream",
                        stream: g.data
                    })
                } else {
                    f.fire({
                        name: "onmessage",
                        message: g.data
                    })
                }
            };
            this.websocket.onclose = function(g) {
                c.fire({
                    name: "onclose",
                    message: "",
                    code: g.code,
                    reason: g.reason,
                    clean: g.wasClean
                })
            };
            this.websocket.onerror = function(g) {
                e.fire({
                    name: "onerror",
                    message: g.data
                })
            }
        };
        if (this.websocket == undefined) {
            this.open()
        }
        this.send = function(g) {
            this.websocket.send(g)
        };
        this.close = function() {
            this.websocket.close()
        };
        this.state = function() {
            switch (this.websocket.readyState) {
            case 0:
                return "connecting";
                break;
            case 1:
                return "open";
                break;
            case 2:
                return "closing";
                break;
            case 3:
                return "closed";
                break;
            default:
                return "undefined";
                break
            }
        };
        this.on = function(g, h) {
            if (g == "open") {
                a.subscribe(h)
            } else {
                if (g == "close") {
                    c.subscribe(h)
                } else {
                    if (g == "message") {
                        f.subscribe(h)
                    } else {
                        if (g == "stream") {
                            d.subscribe(h)
                        } else {
                            if (g == "error") {
                                e.subscribe(h)
                            }
                        }
                    }
                }
            }
        }
    } else {
        if ((window.EventSource) && (1)) {
            var b = "";
            this.open = function() {
                if ((this.host !== "") && (this.user !== "") && (this.user !== undefined)) {
                    if (this.password == undefined) {
                        this.password == ""
                    }
                    if ((this.subprotocol !== "") && (this.subprotocol !== undefined)) {
                        this.EventSource = new EventSource(this.host.replace(/^[a-z]{2,3}\:\/{2}[a-z,0-9,.]{1,}\:[0-9]{1,4}.(.*)/, "$1") + "/sgc/auth/url/" + this.user + "/" + this.password + "/" + this.subprotocol)
                    } else {
                        this.EventSource = new EventSource(this.host.replace(/^[a-z]{2,3}\:\/{2}[a-z,0-9,.]{1,}\:[0-9]{1,4}.(.*)/, "$1") + "/sgc/auth/url/" + this.user + "/" + this.password)
                    }
                } else {
                    if ((this.host !== "") && (this.subprotocol !== "") && (this.subprotocol !== undefined)) {
                        this.EventSource = new EventSource(this.subprotocol)
                    } else {
                        if (this.host !== "") {
                            this.EventSource = new EventSource("/")
                        }
                    }
                }
                this.EventSource.onopen = function() {
                    a.fire({
                        name: "onopen",
                        message: ""
                    })
                };
                this.EventSource.onmessage = function(g) {
                    if (b == "") {
                        b = g.data
                    } else {
                        f.fire({
                            name: "onmessage",
                            message: g.data
                        })
                    }
                };
                this.EventSource.onerror = function(g) {
                    e.fire({
                        name: "onerror",
                        message: g.data
                    })
                }
            };
            if (this.EventSource == undefined) {
                this.open()
            }
            this.send = function(g) {
                if (b !== "") {
                    if (window.XMLHttpRequest) {
                        xhr = new XMLHttpRequest()
                    } else {
                        if (window.ActiveXObject) {
                            xhr = new ActiveXObject("Microsoft.XMLHTTP")
                        } else {
                            return
                        }
                    }
                    xhr.open("POST", "/sgc/xhr/" + b, true);
                    xhr.send(g)
                }
            };
            this.close = function() {
                this.EventSource.close();
                c.fire({
                    name: "onclose",
                    message: "",
                    code: 1000,
                    reason: "",
                    clean: true
                })
            };
            this.state = function() {
                switch (this.EventSource.readyState) {
                case 0:
                    return "connecting";
                    break;
                case 1:
                    return "open";
                    break;
                case 2:
                    return "closed";
                    break;
                default:
                    return "undefined";
                    break
                }
            };
            this.on = function(g, h) {
                if (g == "open") {
                    a.subscribe(h)
                } else {
                    if (g == "close") {
                        c.subscribe(h)
                    } else {
                        if (g == "message") {
                            f.subscribe(h)
                        } else {
                            if (g == "error") {
                                e.subscribe(h)
                            }
                        }
                    }
                }
            }
        } else {
            alert("WebSockets not supported by your Browser.")
        }
    }
};
