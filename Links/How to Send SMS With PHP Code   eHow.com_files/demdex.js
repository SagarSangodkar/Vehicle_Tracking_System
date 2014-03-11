//version:194
var Tim = {version:16, partner_specific:"dm", vid:"_VID_", partner:"dm", pid:1142, cid:268, dp_added:false, dp_enabled:true, tagList:[], bodyTags:{dom:[], load:[]}, tagCodes:{dom:[], load:[]}, bufStr:{dom:"", load:""}, counter:[], miscVar:[], aDiv:null, sDiv:null, nDiv:null, stagingPath:null, stagingFiles:null, stageAllFiles:false, isStaged:false, vars:{stuff:{}}, constants:{HEAD:1, BODY:2, ONLOAD:3, CURRENT_DATE:+new Date, isHTTPS:"https:" == document.location.protocol, isHTTP:"http:" == 
document.location.protocol, URL_NONSECURE:"cdn.demdex.net", URL_SECURE:"a248.e.akamai.net/demdex.download.akamai.com", XMLParser:{specialChars:/</, reverseChars:/&lt;/, scriptRegex:/<script[^>]*>([\s\S]*)<\/script>/}}, tags:{head:null, body:null, onload:null}, getProtoStr:function() {
  return Tim.constants.isHTTPS ? "https://" : "http://"
}, demdexSubmit:function(pixels) {
  if(!pixels) {
    return false
  }
  var data = pixels.data, extras = pixels.extras, reservedKeys = {pdata:true, logdata:true}, tempObj = {}, i, l, pair, key, value;
  delete pixels.data;
  delete pixels.extras;
  delete pixels.callback;
  this.helpers.extendObject(pixels, data, reservedKeys);
  if(extras instanceof Array && (l = extras.length)) {
    for(i = 0;i < l;i++) {
      pair = extras[i].split("=");
      key = pair[0];
      value = pair[1];
      if(typeof key != "undefined" && typeof value != "undefined") {
        tempObj[key] = value
      }
    }
  }
  this.helpers.extendObject(pixels, tempObj, reservedKeys);
  this.demdexEvent(pixels)
}, demdexEvent:function(events) {
  var partner_ref = this, e = partner_ref.destEvents, callback;
  if(!events) {
    return false
  }
  events.logdata = Tim.helpers.convertObjectToKeyValuePairs(events.logdata || {}, "=", true);
  events.logdata.push("containerid=" + partner_ref.cid);
  events.logdata.push("_ts=" + (new Date).getTime());
  callback = e.callbackPrefix + (new Date).getTime();
  e.callbackNames.push(callback);
  e.callbacks.push(callback);
  e.waiting.push({src:partner_ref.destEventsFunctions.makeDestEventSrc(events, e)});
  partner_ref.waitingController.registerFire("fireDestEvent")
}, pixelEvent:function(events) {
  this.demdexEvent(events)
}, dexGetQSVars:function(variableName) {
  var value = this.vars.stuff[variableName];
  if(!value && typeof value != "number") {
    value = this.getCookie(variableName);
    if(!value && typeof value != "number") {
      value = ""
    }
  }
  return value
}, waitingController:{firingQueue:[], fired:[], firing:false, registerFire:function(firingType) {
  if(typeof firingType == "string" && firingType == "fireDestEvent") {
    this.firingQueue.push(firingType)
  }
  if(!this.firing && this.firingQueue.length) {
    Tim.destEventsFunctions[this.firingQueue.shift()]()
  }
}}, destEvents:{waiting:[], fired:[], errored:[], callbackNames:[], callbacks:[], callbackPrefix:"demdexDestCallback", num_of_jsonp_responses:0, num_of_jsonp_errors:0}, dest2IframeHasLoaded:false, dest2Iframe:null, dest2IframeSrc:"", dest2MessageQueue:[], dest2MessageQueueIsFiring:false, dest2ProcessMessageQueue:function() {
  if(!this.dest2IframeHasLoaded || this.dest2MessageQueueIsFiring) {
    return
  }
  this.dest2MessageQueueIsFiring = true;
  var INTERVAL = window["postMessage"] ? 15 : 100, self = this, interval = setInterval(function() {
    if(self.dest2MessageQueue.length) {
      Tim.xdProps.xd.postMessage(self.dest2MessageQueue.shift(), self.dest2IframeSrc, self.dest2Iframe.contentWindow)
    }else {
      clearInterval(interval);
      self.dest2MessageQueueIsFiring = false
    }
  }, INTERVAL)
}, destEventsFunctions:{makeDestEventSrc:function(p, e) {
  p.pdata = Tim.helpers.removeNaNs(p.pdata || []);
  var f = Tim.helpers.encodeAndBuildRequest, pdata = f(p.pdata, "&d_px="), logdata = (p.logdata || []).join("&"), proto_str = Tim.constants.isHTTPS ? "https://" : "http://", others = function() {
    var a = [], key;
    for(key in p) {
      if(key != "pdata" && key != "logdata" && p.hasOwnProperty(key)) {
        try {
          var val = p[key] instanceof Array ? f(p[key], ",") : encodeURIComponent(p[key]);
          a.push(key + "=" + val)
        }catch(__TIM_Err__) {
        }
      }
    }
    return a.length ? "&" + a.join("&") : ""
  }();
  return(proto_str + Tim.partner + ".demdex.net/event?" + (pdata.length ? "d_px=" + pdata : "") + (logdata.length ? "&d_ld=" + encodeURIComponent(logdata) : "") + others + "&d_rtbd=json&d_dst=1&d_cts=1&d_cb=" + e.callbackNames.shift()).replace(/\?&/, "?").replace(/\?$/, "")
}, fireDestEvent:function() {
  var self = Tim, e = Tim.destEvents, first_script = null, script, current, src;
  if(!e.waiting.length || Tim.waitingController.firing) {
    return false
  }
  Tim.waitingController.firing = true;
  current = e.waiting.shift();
  src = current.src;
  window[e.callbacks.shift()] = function(json) {
    var dests, f, i, l, dest, a, stuff, stf, cn, cv, ttl, dmn, type;
    try {
      if(json) {
        if((stuff = json.stuff) && stuff instanceof Array && (l = stuff.length)) {
          for(i = 0;i < l;i++) {
            if((stf = stuff[i]) && typeof stf == "object") {
              cn = stf.cn;
              cv = stf.cv;
              ttl = stf.ttl || 0;
              type = stf.type;
              dmn = stf.dmn || "." + document.domain;
              if(cn && (cv || typeof cv == "number")) {
                if(type != "var") {
                  if((ttl = parseInt(ttl, 10)) && !isNaN(ttl)) {
                    self.setCookie(cn, cv, ttl * 24 * 60, "/", dmn, false)
                  }
                }
                self.vars.stuff[cn] = cv
              }
            }
          }
        }
        if((dests = json.dests) && dests instanceof Array && (l = dests.length)) {
          f = encodeURIComponent;
          for(i = 0;i < l;i++) {
            dest = dests[i];
            a = [f(dest.id), f(dest.y), f(dest.c)];
            self.dest2MessageQueue.push(a.join("|"))
          }
          self.dest2ProcessMessageQueue()
        }
      }
      self.waitingController.firing = false;
      e.fired.push(src);
      self.waitingController.fired.push(src);
      e.num_of_jsonp_responses++;
      self.waitingController.registerFire("fireDestEvent")
    }catch(__TIM_Err__) {
      if(typeof Tim != "undefined" && typeof Tim.error != "undefined" && typeof Tim.error.handleError == "function") {
        __TIM_Err__.filename = __TIM_Err__.filename || "demdex.js";
        Tim.error.handleError(__TIM_Err__)
      }else {
        (new Image(0, 0)).src = (document.location.protocol == "https:" ? "https://" : "http://") + "error.demdex.net/pixel/14137?logdata:Error handling not defined"
      }
    }
  };
  script = document.createElement("script");
  if(script.addEventListener) {
    script.addEventListener("error", function(event) {
      var __TIM_Err__ = {filename:"demdex.js", message:event.detail};
      if(typeof Tim != "undefined" && typeof Tim.error != "undefined" && typeof Tim.error.handleError == "function") {
        Tim.error.handleError(__TIM_Err__)
      }else {
        (new Image(0, 0)).src = (document.location.protocol == "https:" ? "https://" : "http://") + "error.demdex.net/pixel/14137?logdata:Error handling not defined"
      }
      self.waitingController.firing = false;
      e.errored.push(src);
      e.num_of_jsonp_errors++;
      self.waitingController.registerFire("fireDestEvent")
    }, false)
  }
  script.type = "text/javascript";
  script.src = src;
  first_script = document.getElementsByTagName("script")[0];
  first_script.parentNode.insertBefore(script, first_script)
}}, dp_makeUrl:function(partner) {
  var dpm_url = "", regex = /%%PARTNER%%/g;
  if(Tim.constants.isHTTP) {
    dpm_url = "http://fast.%%PARTNER%%.demdex.net/dest2.html"
  }else {
    if(Tim.constants.isHTTPS) {
      dpm_url = "https://%%PARTNER%%.demdex.net/dest2.html"
    }
  }
  if(!dpm_url) {
    return false
  }
  return dpm_url.replace(regex, partner)
}, helpers:{concatNodeLists:function() {
  var theLists = [].slice.call(arguments), list = null, i = 0, element = null, finalList = [];
  if(!theLists.length) {
    return finalList
  }
  list = theLists.pop();
  do {
    for(i = 0;element = list[i++];) {
      finalList.push(element)
    }
  }while(list = theLists.pop());
  return finalList
}, indexOf:function(arr, value) {
  if(!Array.prototype.indexOf) {
    Tim.helpers.indexOf = function(arr, value) {
      for(var i = 0, l = arr.length;i < l;i++) {
        if(arr[i] === value) {
          return i
        }
      }
      return-1
    }
  }else {
    Tim.helpers.indexOf = function(arr, value) {
      return arr.indexOf(value)
    }
  }
  Tim.helpers.indexOf(arr, value)
}, convertObjectToKeyValuePairs:function(obj, separator, encode) {
  var arr = [], separator = separator || "=", key, value;
  for(key in obj) {
    value = obj[key];
    if(typeof value != "undefined" && value != null) {
      arr.push(key + separator + (encode ? encodeURIComponent(value) : value))
    }
  }
  return arr
}, isArray:function(a) {
  return"[object Array]" == Object.prototype.toString.apply(a)
}, map:function(arr, fun) {
  if(!Array.prototype.map) {
    if(arr === void 0 || arr === null) {
      throw new TypeError;
    }
    var t = Object(arr);
    var len = t.length >>> 0;
    if(typeof fun !== "function") {
      throw new TypeError;
    }
    var res = new Array(len);
    var thisp = arguments[1];
    for(var i = 0;i < len;i++) {
      if(i in t) {
        res[i] = fun.call(thisp, t[i], i, t)
      }
    }
    return res
  }else {
    return arr.map(fun)
  }
}, removeNaNs:function(as) {
  var i = 0, l = as.length, a, newAs = [];
  for(i = 0;i < l;i++) {
    a = as[i];
    if(typeof a != "undefined" && a != null && !isNaN(a = parseInt(a, 10))) {
      newAs.push(a)
    }
  }
  return newAs
}, encodeAndBuildRequest:function(arr, character) {
  return Tim.helpers.map(arr, function(c) {
    return encodeURIComponent(c)
  }).join(character)
}, isEmptyObject:function(obj) {
  if(typeof obj != "object") {
    return true
  }
  var key;
  for(key in obj) {
    if(obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}, extendObject:function(a, b, keysToIgnore) {
  var key;
  if(typeof a == "object" && typeof b == "object") {
    for(key in b) {
      if(b.hasOwnProperty(key)) {
        if(!this.isEmptyObject(keysToIgnore) && key in keysToIgnore) {
          continue
        }
        a[key] = b[key]
      }
    }
    return true
  }
  return false
}}, getTags:function(posvar) {
  var tagStr = "", tags = [], dest = "", exclusion = "", code = null, pos = null, expires = null, scope = null, rgxExcl = null, rgxDest = null, url = document.location.href;
  for(var i = 0;i < this.tagList.length;i++) {
    pos = this.tagList[i]["pos"];
    expires = this.tagList[i]["expires"];
    if(pos != posvar || expires != null && expires < this.constants.CURRENT_DATE) {
      continue
    }
    scope = this.tagList[i]["scope"];
    code = this.constants.isHTTPS ? this.tagList[i]["scode"] : this.tagList[i]["code"];
    dest = this.tagList[i]["dest"];
    if(scope == 1) {
      if(posvar == 1) {
        tagStr += code
      }else {
        tags[tags.length] = this.tagList[i]
      }
      continue
    }
    if(scope == 2) {
      exclusion = this.tagList[i]["exclusion"];
      rgxExcl = new RegExp(exclusion, "ig");
      if(url.indexOf(dest) >= 0 && (exclusion == null || exclusion == "" || !rgxExcl.test(url))) {
        if(posvar == 1) {
          tagStr += code
        }else {
          tags[tags.length] = this.tagList[i]
        }
      }
    }
    if(scope == 3) {
      if(document.location.href.toString() == dest.toString()) {
        if(posvar == 1) {
          tagStr += code
        }else {
          tags[tags.length] = this.tagList[i]
        }
      }
    }
    if(scope == 4) {
      try {
        rgxDest = new RegExp(dest, "i");
        exclusion = this.tagList[i]["exclusion"];
        rgxExcl = new RegExp(exclusion, "ig");
        if(rgxDest.test(url) && (exclusion == null || exclusion == "" || !rgxExcl.test(url))) {
          if(posvar == 1) {
            tagStr += code
          }else {
            tags[tags.length] = this.tagList[i]
          }
        }
      }catch(__TIM_Err__) {
        if(typeof Tim != "undefined" && typeof Tim.error != "undefined" && typeof Tim.error.handleError == "function") {
          __TIM_Err__.partner = Tim.partner || "no_partner";
          __TIM_Err__.filename = __TIM_Err__.filename || "demdex.js";
          Tim.error.handleError(__TIM_Err__)
        }else {
          (new Image(0, 0)).src = (document.location.protocol == "https:" ? "https://" : "http://") + "error.demdex.net/pixel/14137?logdata:Error handling not defined"
        }
      }
    }
  }
  return posvar == 1 ? tagStr : tags
}, getHeadTags:function() {
  return Tim.tags.head
}, getBodyTags:function() {
  return Tim.tags.body
}, getOnloadTags:function() {
  return Tim.tags.onload
}, checkLoaded:function(viter, type) {
  try {
    if(Tim.counter.length >= Tim.bodyTags[type].length || viter >= 10) {
      Tim.aDiv.innerHTML += Tim.bufStr[type];
      for(var i = 0;i < Tim.tagCodes[type].length;i++) {
        eval(Tim.tagCodes[type][i])
      }
    }else {
      viter++;
      setTimeout("Tim.checkLoaded(" + viter + ',"' + type + '")', 400)
    }
  }catch(__TIM_Err__) {
    if(typeof Tim != "undefined" && typeof Tim.error != "undefined" && typeof Tim.error.handleError == "function") {
      __TIM_Err__.partner = Tim.partner || "no_partner";
      __TIM_Err__.filename = __TIM_Err__.filename || "demdex.js";
      Tim.error.handleError(__TIM_Err__)
    }else {
      (new Image(0, 0)).src = (document.location.protocol == "https:" ? "https://" : "http://") + "error.demdex.net/pixel/14137?logdata:Error handling not defined"
    }
  }
}, domReady:function(tags, type) {
  var code = "";
  Tim.sDiv.appendChild(Tim.aDiv);
  Tim.sDiv.appendChild(Tim.nDiv);
  document.body.appendChild(Tim.sDiv);
  for(var i = 0;i < tags.length;i++) {
    code = Tim.constants.isHTTPS ? tags[i].scode : tags[i].code;
    if(code.toLowerCase().indexOf("iframe") != -1) {
      var str = code.replace(/&/g, "&amp;");
      var xmlDoc;
      if(document.implementation.createDocument) {
        var parser = new DOMParser;
        xmlDoc = parser.parseFromString(str, "text/xml")
      }else {
        if(window.ActiveXObject) {
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = "false";
          xmlDoc.loadXML(str)
        }
      }
      var m = Tim.helpers.concatNodeLists(xmlDoc.getElementsByTagName("IFRAME"), xmlDoc.getElementsByTagName("iframe"));
      if(m.length != 0) {
        var src;
        if(m[0].getAttribute("src")) {
          src = m[0].getAttribute("src")
        }else {
          if(m[i].getAttribute("SRC")) {
            src = m[0].getAttribute("SRC")
          }
        }
        var iframe = document.createElement("IFRAME");
        iframe.setAttribute("style", "display:none");
        iframe.setAttribute("width", "0");
        iframe.setAttribute("height", "0");
        iframe.setAttribute("id", "ddiframe");
        iframe.setAttribute("src", src);
        document.body.appendChild(iframe)
      }
    }else {
      if(code.toLowerCase().indexOf("<\/script") != -1) {
        Tim.reparse(code.replace(/&/g, "&amp;"), type)
      }else {
        Tim.nDiv.innerHTML += code
      }
    }
  }
  var loaded = false, tsrcFile = null;
  for(var j = 0;j < Tim.bodyTags[type].length;j++) {
    var tsrc = false;
    var tbody = "";
    if(typeof Tim.bodyTags[type][j] != "undefined") {
      tsrc = Tim.bodyTags[type][j].src;
      tbody = Tim.bodyTags[type][j].body
    }
    if(tsrc) {
      if(Tim.stagingPath) {
        tsrcFile = tsrc.split("/").pop();
        if(Tim.stageAllFiles || Tim.stagingFiles.indexOf(tsrcFile) > -1) {
          tsrc = Tim.stagingPath + tsrcFile;
          Tim.isStaged = true
        }
      }
      var script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", tsrc);
      script.onload = script.onreadystatechange = function() {
        Tim.counter[Tim.counter.length] = 1
      };
      Tim.sDiv.appendChild(script)
    }else {
      Tim.counter[Tim.counter.length] = 1
    }
    Tim.bufStr[type] += "<br/>" + "<SCR" + 'IPT type="text/javascript">' + tbody + "</" + "SCRIPT>";
    Tim.tagCodes[type][Tim.tagCodes[type].length] = tbody
  }
  setTimeout('Tim.checkLoaded(1, "' + type + '")', 500)
}, windowReady:function() {
  var self = this, iframe, src, proto_url, url, params = "", fld, fireDestEvents;
  if(!Tim.dp_added && Tim.partner) {
    for(var i = 0;i < Tim.miscVar.length;i++) {
      fld = Tim.constants.isHTTP ? "miscVarTagCode" : "miscVarSecureTagCode";
      params = params + Tim.miscVar[i][fld] + "&"
    }
    iframe = document.createElement("iframe");
    url = Tim.dp_makeUrl(Tim.partner);
    if(!url) {
      return
    }
    if(params) {
      url += "?" + params.replace(/&$/, "")
    }
    url += "#" + encodeURIComponent(document.location.href);
    iframe.style.cssText = "display:none;width:0px;height:0px;";
    iframe.width = 0;
    iframe.height = 0;
    iframe.id = "dpiframe";
    iframe.src = url;
    this.dest2Iframe = iframe;
    this.dest2IframeSrc = url;
    fireDestEvents = function() {
      self.dest2IframeHasLoaded = true;
      self.dest2ProcessMessageQueue()
    };
    if(iframe.addEventListener) {
      iframe.addEventListener("load", fireDestEvents, false)
    }else {
      if(iframe.attachEvent) {
        iframe.attachEvent("onload", fireDestEvents)
      }
    }
    Tim.dp_added = !!document.body.appendChild(iframe)
  }
}, getText:function(node) {
  var buffer = "";
  var cnodes = node.childNodes;
  if(cnodes) {
    for(var i = 0;i < cnodes.length;i++) {
      buffer = buffer + this.getText(cnodes[i])
    }
  }
  if(node.data) {
    buffer += node.data
  }
  return buffer
}, xmlSpecialCharsParser:function() {
  function parse(text) {
    var div = document.createElement("div");
    div.innerHTML = "<br />" + text;
    return div.getElementsByTagName("script")
  }
  function santize(scripts) {
    var i = 0, st = "", script = null, tcx = Tim.constants.XMLParser;
    for(i = 0;script = scripts[i++];) {
      st = script.text;
      script.customText = tcx.specialChars.test(st) ? st.replace(tcx.specialChars, "&lt;") : st
    }
    return scripts
  }
  function combine(scripts) {
    var i = 0, script = null, src = "", buffer = "";
    for(i = 0;script = scripts[i++];) {
      src = script.src || script.SRC;
      buffer += src ? '<script type="text/javascript" src="' + src + '"><\/script>' : '<script type="text/javascript">' + script.customText + "<\/script>"
    }
    return buffer
  }
  return function(text) {
    var tcx = Tim.constants.XMLParser, contents = tcx.scriptRegex.exec(text);
    return contents && tcx.specialChars.test(contents[1]) ? combine(santize(parse(text))) : text
  }
}(), reparse:function(parm, type) {
  var tagscript = {};
  parm = Tim.xmlSpecialCharsParser(parm);
  var str = "<div>" + parm + "</div>";
  var strBuf = "";
  var docStr = "";
  var xDoc = null;
  document._originalWrite = document.write;
  document.write = function(t) {
    docStr += t
  };
  var xmlDoc;
  if(document.implementation.createDocument) {
    var parser = new DOMParser;
    xmlDoc = parser.parseFromString(str, "text/xml")
  }else {
    if(window.ActiveXObject) {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = "false";
      xmlDoc.loadXML(str)
    }
  }
  var m = Tim.helpers.concatNodeLists(xmlDoc.getElementsByTagName("SCRIPT"), xmlDoc.getElementsByTagName("script"));
  for(var i = 0;i < m.length;i++) {
    if(m[i].getAttribute("src")) {
      tagscript["src"] = m[i].getAttribute("src")
    }else {
      if(m[i].getAttribute("SRC")) {
        tagscript["src"] = m[i].getAttribute("SRC")
      }
    }
    var tagbody = Tim.getText(m[i]);
    tagbody = tagbody.replace(Tim.constants.XMLParser.reverseChars, "<");
    if(tagbody.indexOf("document.write") == -1) {
      if(tagscript["body"]) {
        tagscript["body"] = tagscript["body"] + tagbody
      }else {
        tagscript["body"] = tagbody
      }
    }else {
      eval(tagbody);
      if(document.implementation.createDocument) {
        xDoc = parser.parseFromString("<div>" + docStr + "</div>", "text/xml")
      }else {
        if(window.ActiveXObject) {
          xDoc = new ActiveXObject("Microsoft.XMLDOM");
          xDoc.async = "false";
          xDoc.loadXML("<div>" + docStr + "</div>")
        }
      }
      var n = Tim.helpers.concatNodeLists(xDoc.getElementsByTagName("SCRIPT"), xDoc.getElementsByTagName("script"));
      for(var j = 0;j < n.length;j++) {
        var ts = n[j].getAttribute("src");
        var tb = Tim.getText(n[j]);
        tagscript["src"] = ts;
        if(tagscript["body"]) {
          tagscript["body"] = tagscript["body"] + tb
        }else {
          tagscript["body"] = tb
        }
      }
    }
    docStr = ""
  }
  Tim.bodyTags[type][Tim.bodyTags[type].length] = tagscript;
  document.write = document._originalWrite;
  return strBuf
}, getCookie:function(name) {
  var dc = document.cookie, cname = name + "=", end = 0, begin = 0;
  if(dc.length > 0) {
    begin = dc.indexOf(cname);
    if(begin != -1) {
      begin += cname.length;
      end = dc.indexOf(";", begin);
      if(end == -1) {
        return unescape(dc.substring(begin))
      }else {
        return unescape(dc.substring(begin, end))
      }
    }
  }
  return null
}, setCookie:function(name, value, expires, path, domain, secure) {
  var today = new Date;
  if(expires) {
    expires = expires * 1E3 * 60
  }
  document.cookie = name + "=" + value + (expires ? ";expires=" + (new Date(today.getTime() + expires)).toGMTString() : "") + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "")
}, events:{domready:{isDOMReady:false, isDOMEventBound:false}, onload:{isOnloadEventBound:false}, attachEvent:function(type) {
  var response = false;
  switch(type) {
    case "dom":
      response = !!Tim.tags.body.length;
      break;
    case "load":
      response = Tim.events.domready.isDOMEventBound || !!Tim.tags.onload.length || Tim.dp_enabled;
      break;
    default:
      break
  }
  return response
}, fireDomEvent:function() {
  if(!Tim.tags.body.length || Tim.events.domready.isDOMReady) {
    return
  }
  if(!document.body) {
    return setTimeout(Tim.events.fireDomEvent, 13)
  }
  Tim.events.domready.isDOMReady = true;
  Tim.domReady(Tim.getBodyTags(), "dom");
  if("removeEventListener" in document && Tim.events.domready.isDOMEventBound) {
    document.removeEventListener("DOMContentLoaded", Tim.events.fireDomEvent, false)
  }else {
    if("detachEvent" in document && Tim.events.domready.isDOMEventBound && document.readyState == "complete") {
      document.detachEvent("onreadystatechange", Tim.events.fireDomEvent)
    }
  }
  Tim.events.domready.isDOMEventBound = false
}, fireLoadEvent:function() {
  Tim.events.domready.isDOMEventBound && Tim.events.fireDomEvent();
  Tim.tags.onload.length && Tim.domReady(Tim.getOnloadTags(), "load");
  Tim.windowReady()
}, bindEvents:function() {
  if(Tim.events.domready.isDOMEventBound || Tim.events.onload.isOnloadEventBound) {
    return
  }
  if(document.readyState == "complete") {
    return setTimeout(function() {
      Tim.events.fireDomEvent();
      Tim.events.fireLoadEvent()
    }, 13)
  }
  if("addEventListener" in document) {
    if(Tim.events.attachEvent("dom")) {
      Tim.events.domready.isDOMEventBound = true;
      document.addEventListener("DOMContentLoaded", Tim.events.fireDomEvent, false)
    }
    if(Tim.events.attachEvent("load")) {
      Tim.events.onload.isOnloadEventBound = true;
      window.addEventListener("load", Tim.events.fireLoadEvent, false)
    }
  }else {
    if("attachEvent" in document) {
      var toplevel = false;
      if(Tim.events.attachEvent("dom")) {
        Tim.events.domready.isDOMEventBound = true;
        document.attachEvent("onreadystatechange", Tim.events.fireDomEvent)
      }
      if(Tim.events.attachEvent("load")) {
        Tim.events.onload.isOnloadEventBound = true;
        window.attachEvent("onload", Tim.events.fireLoadEvent)
      }
      try {
        toplevel = window.frameElement = null
      }catch(e) {
      }
      if(document.documentElement.doScroll && toplevel) {
        Tim.doScrollCheck()
      }
    }else {
      var oldOnload = window.onload || function() {
      };
      if(Tim.events.attachEvent("load")) {
        Tim.events.onload.isOnloadEventBound = true;
        window.onload = function(e) {
          oldOnload(e);
          window[Tim.domReady](e)
        }
      }
    }
  }
}, doScrollCheck:function() {
  if(Tim.events.domready.isDOMReady) {
    return
  }
  try {
    document.documentElement.doScroll("left")
  }catch(error) {
    setTimeout(Tim.doScrollCheck, 13);
    return
  }
  Tim.events.fireDomEvent()
}}, main:function(mv, tl) {
  if(mv && mv.length) {
    Tim.miscVar = Tim.miscVar.concat(mv)
  }
  if(tl && tl.length) {
    Tim.tagList = Tim.tagList.concat(tl)
  }
  if(this.magicCookie()) {
    return
  }
  Tim.tags.head = Tim.getTags(Tim.constants.HEAD);
  Tim.tags.body = Tim.getTags(Tim.constants.BODY);
  Tim.tags.onload = Tim.getTags(Tim.constants.ONLOAD);
  if(Tim.tags.head) {
    document.write(Tim.tags.head)
  }
  Tim.aDiv = document.createElement("div");
  Tim.aDiv.style.display = "none";
  Tim.sDiv = document.createElement("div");
  Tim.sDiv.style.display = "none";
  Tim.nDiv = document.createElement("div");
  Tim.nDiv.style.display = "none";
  Tim.aDiv.innerHTML = "";
  Tim.events.bindEvents()
}};
typeof Tim != "undefined" && (Tim.error = function() {
  var config = {pixelMap:{harvestererror:14138, destpuberror:14139, dpmerror:14140, generalerror:14137, error:14137, noerrortypedefined:15021, evalerror:15016, rangeerror:15017, referenceerror:15018, typeerror:15019, urierror:15020}, domain:"error.demdex.net/pixel/"}, src = "";
  function getRequest() {
    return src
  }
  function firePixel(src) {
    (new Image(0, 0)).src = (document.location.protocol == "https:" ? "https://" : "http://") + config.domain + src
  }
  function handleError(args) {
    var pixel = 0, name = args.name ? String(args.name).toLowerCase() : false, filename = args.filename ? String(args.filename) : false, partner = args.partner ? String(args.partner) : typeof Tim != undefined && Tim.partner ? String(Tim.partner) : "no_partner", site = args.site ? args.site : document.location.href, filename = args.filename ? String(args.filename) : false, message = args.message ? String(args.message) : false;
    pixel = name in config.pixelMap ? config.pixelMap[name] : config.pixelMap.noerrortypedefined;
    src = pixel + "?logdata:" + (message ? "message=" + message.replace(",", " ") + "," : "") + (site ? "site=" + site.replace(",", " ") + "," : "") + (partner ? "partner=" + partner.replace(",", " ") + "," : "") + (filename ? "filename=" + filename + "," : "");
    src = src.replace(/,$/, "");
    firePixel(src)
  }
  return{handleError:handleError, pixelMap:config.pixelMap, getErrorRequest:getRequest}
}());
typeof Tim != "undefined" && (Tim.magicCookie = function(testCookie) {
  var ck = testCookie || this.getCookie("demdex-staging"), src = null, script = null, script0 = null, ckArray = [], STAGING_SCRIPT_ID = "demdex_staging_replacement_script";
  if(ck) {
    ckArray = ck.split("|");
    this.stagingPath = ckArray[document.location.protocol == "https:" ? 1 : 2];
    this.stagingFiles = ckArray[3] || "";
    if(!this.stagingFiles) {
      this.stageAllFiles = true
    }
    if(!this.stagingPath || this.stagingFiles && this.stagingFiles.indexOf("demdex.js") < 0) {
      return false
    }
    this.isStaged = true;
    if(!document.getElementById(STAGING_SCRIPT_ID)) {
      src = this.stagingPath + "demdex.js";
      if(parseInt(ckArray[0], 10)) {
        script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        script.id = STAGING_SCRIPT_ID;
        script0 = document.getElementsByTagName("script")[0];
        script0.parentNode.insertBefore(script, script0)
      }else {
        document.write("<scr" + 'ipt type="text/javascript" id="' + STAGING_SCRIPT_ID + '" src ="' + src + '"></scr' + "ipt>")
      }
      return true
    }
  }
  return false
});
typeof Tim != "undefined" && (Tim.getSearchReferrer = function(arg) {
  var arg = arg || {}, site = arg.site ? arg.site : document.referrer, extensions = arg.extensions ? arg.extensions : false, aElement = function(ref) {
    var a = document.createElement("a");
    a.href = ("" + ref).toLowerCase();
    return a
  }(site), searchEngines = {"bing.":{name:"bing.com", pagePattern:/.*/, keywordPattern:/[&\?]q=([^&]+)/, delimiter:"+"}, "google.":{name:"google.com", pagePattern:/.*/, keywordPattern:/[&\?]q=([^&]+)/, delimiter:"+"}, "yahoo.":{name:"yahoo.com", pagePattern:/.*/, keywordPattern:/[&\?]p=([^&]+)/, delimiter:"+"}, "ask.":{name:"ask.com", pagePattern:/.*/, keywordPattern:/[&\?]q=([^&]+)/, delimiter:"+"}, "aol.":{name:"aol.com", pagePattern:/.*/, keywordPattern:/[&\?]q=([^&]+)/, delimiter:"+"}}, re = 
  [], keywordPattern = null, pagePattern = null, se = null, new_site = "", domain = null, es = null, host = "", keywords = "", customSite = null, valid = null, se_regex = null, delimiter = null, searchEngine = null;
  function santizeRE(str) {
    return str.replace(/\./g, "\\.")
  }
  function sanitizeURL(site) {
    site = site.split(".");
    return(site[0] == "www" ? site[1] : site[0]) + "."
  }
  function replaceAndDecode(str, delim, newDelim) {
    return decodeURIComponent(str.split(delim).join(newDelim))
  }
  function parseKeywords() {
    var query = null, pageTest = null, keywordMatch = "", terms = "", retVal = "";
    query = aElement.search || aElement.pathname.toString().replace(/^\/|\/$/g, "");
    if(!query) {
      return retVal
    }
    pageTest = searchEngine.pagePattern.test(aElement.pathname);
    if(Tim.helpers.isArray(searchEngine.keywordPattern)) {
      for(var i = 0;!keywordMatch && i < searchEngine.keywordPattern.length;i++) {
        keywordMatch = query.match(searchEngine.keywordPattern[i])
      }
    }else {
      keywordMatch = query.match(searchEngine.keywordPattern)
    }
    terms = keywordMatch && keywordMatch[1] || "";
    if(searchEngine.name == "google.com" && aElement.pathname == "/url") {
      terms = terms.replace(/%20/g, "+")
    }
    return!!(pageTest && terms) ? replaceAndDecode(terms, searchEngine.delimiter, "%20") : ""
  }
  function parseDomain() {
    return searchEngine.name
  }
  function makeKeywordRegex(word, folder, domain) {
    if(word == "/") {
      return RegExp("^" + folder + "/(.+)", "i")
    }
    return RegExp("[&?]" + santizeRE(word) + "=([^&]+)", "i")
  }
  if(extensions) {
    es = extensions.sites;
    for(customSite in es) {
      if(!es.hasOwnProperty(customSite)) {
        continue
      }
      new_site = es[customSite].match_all_extensions ? sanitizeURL(new_site) : customSite;
      pagePattern = es[customSite].search_page ? es[customSite].search_page : ".*";
      keywordPattern = es[customSite].search_param ? es[customSite].search_param : "q";
      delimiter = es[customSite].search_delim ? es[customSite].search_delim : "+";
      keywordPattern = Tim.helpers.isArray(keywordPattern) ? Tim.helpers.map(keywordPattern, makeKeywordRegex) : makeKeywordRegex(keywordPattern, pagePattern, customSite);
      searchEngines[new_site] = {name:customSite, pagePattern:RegExp(santizeRE(pagePattern)), keywordPattern:keywordPattern, delimiter:delimiter, matchExtensions:!!es[customSite].match_all_extensions}
    }
  }
  for(se in searchEngines) {
    searchEngines.hasOwnProperty(se) && re.push(se)
  }
  se_regex = RegExp(santizeRE(re.join("|")) + ".*?");
  domain = "hostname" in aElement ? aElement.hostname.match(se_regex) : "";
  searchEngine = domain in searchEngines ? searchEngines[domain] : "";
  valid = !!(domain && "search" in aElement && searchEngine);
  retVal = {name:valid ? parseDomain() : "", keywords:valid ? parseKeywords() : ""};
  retVal["valid"] = valid && retVal.name.length && retVal.keywords.length;
  return retVal
});
var Tim;
Tim.genericRequest = function() {
  var props, func_def, prop;
  props = {type:false, url:false, after:function() {
  }, before:function() {
  }, error:function() {
  }};
  func_def = function(p) {
    return function(val) {
      var _prop = "_" + p;
      if(val) {
        this[_prop] = val;
        return this
      }
      return this[_prop] ? this[_prop] : props[_prop]
    }
  };
  for(prop in props) {
    if(props.hasOwnProperty(prop)) {
      this[prop] = func_def(prop);
      this["_" + prop] = props[prop]
    }
  }
};
var Tim;
Tim.executeGenericScript = function(args) {
  var script = document.createElement("script"), first_script = document.getElementsByTagName("script")[0];
  args.before()();
  if(script.readystate) {
    script.onreadystatechange = function(event) {
      if(script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        args.after()(event)
      }
    }
  }else {
    script.onload = function(event) {
      args.after()(event)
    }
  }
  if(script.addEventListener) {
    script.addEventListener("error", function(event) {
      var __TIM_Err__ = {filename:"demdex.js", message:event.detail};
      if(typeof Tim != "undefined" && typeof Tim.error != "undefined" && typeof Tim.error.handleError == "function") {
        Tim.error.handleError(__TIM_Err__)
      }else {
        (new Image(0, 0)).src = (document.location.protocol == "https:" ? "https://" : "http://") + "error.demdex.net/pixel/14137?logdata:Error handling not defined"
      }
      args.error()(event)
    }, false)
  }
  script.src = args.url();
  return!!first_script.parentNode.insertBefore(script, first_script)
};
var Tim;
Tim.Provider = function(partner) {
  var instance;
  if(instance = Tim.Provider.data_store.get(partner)) {
    return instance
  }
  if(!(this instanceof Tim.Provider)) {
    return new Tim.Provider(partner)
  }
  this._partner = partner;
  return this
};
Tim.Provider.prototype = {valid:function() {
  return!!this._url
}, save:function() {
  return Tim.Provider.data_store.add(this._partner, this)
}, execute:function() {
  var strategies = {script:Tim.executeGenericScript};
  if(!this.valid()) {
    return false
  }
  return strategies[this.type()] ? strategies[this.type()](this) : false
}};
Tim.Provider.data_store = {data:{}, add:function(k, v) {
  this.data[k] = v;
  return true
}, get:function(p) {
  return this.data[p]
}};
Tim.genericRequest.call(Tim.Provider.prototype);
typeof Tim != "undefined" && (Tim.xdProps = {xd:function() {
  var interval_id, last_hash, cache_bust = 1, attached_callback;
  return{postMessage:function(message, target_url, target) {
    if(!target_url) {
      return
    }
    target = target || parent;
    if(window["postMessage"]) {
      target["postMessage"](message, target_url.replace(/([^:]+:\/\/[^\/]+).*/, "$1"))
    }else {
      if(target_url) {
        target.location = target_url.replace(/#.*$/, "") + "#" + +new Date + cache_bust++ + "&" + message
      }
    }
  }, receiveMessage:function(callback, source_origin) {
    if(window["postMessage"]) {
      if(callback) {
        attached_callback = function(e) {
          if(typeof source_origin === "string" && e.origin !== source_origin || Object.prototype.toString.call(source_origin) === "[object Function]" && source_origin(e.origin) === !1) {
            return!1
          }
          callback(e)
        }
      }
      if(window["addEventListener"]) {
        window[callback ? "addEventListener" : "removeEventListener"]("message", attached_callback, !1)
      }else {
        window[callback ? "attachEvent" : "detachEvent"]("onmessage", attached_callback)
      }
    }else {
      interval_id && clearInterval(interval_id);
      interval_id = null;
      if(callback) {
        interval_id = setInterval(function() {
          var hash = document.location.hash, re = /^#?\d+&/;
          if(hash !== last_hash && re.test(hash)) {
            last_hash = hash;
            callback({data:hash.replace(re, "")})
          }
        }, 100)
      }
    }
  }}
}()});
(function() {
  var CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  Math.uuid = function(len, radix) {
    var chars = CHARS, uuid = [];
    radix = radix || chars.length;
    if(len) {
      for(var i = 0;i < len;i++) {
        uuid[i] = chars[0 | Math.random() * radix]
      }
    }else {
      var r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for(var i = 0;i < 36;i++) {
        if(!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r]
        }
      }
    }
    return uuid.join("")
  }
})();
Tim.dm_qdata = [];
var dm_hr1 = {validTag:"META", validScheme:"DMINSTR2", validNames:["category", "subcategory", "subsubcat"], get_dfpkv:function(pid) {
  return Tim.helpers.indexOf(Tim.pidkeyvar, pid) != -1 ? "dx=" + pid : null
}, getMeta:function() {
  var cat = "", scat = "", sscat = "", artid = "";
  var _dte = document.getElementsByTagName(dm_hr1.validTag);
  for(var x = 0;x < _dte.length;x++) {
    if(_dte[x].name) {
      if(_dte[x].scheme && _dte[x].scheme == "DMINSTR2") {
        if(_dte[x].name == "category") {
          cat = _dte[x].content
        }else {
          if(_dte[x].name == "subcategory") {
            scat = _dte[x].content
          }else {
            if(_dte[x].name == "subsubcat") {
              sscat = _dte[x].content
            }else {
              if(_dte[x].name == "subsubcategory") {
                sscat = _dte[x].content
              }
            }
          }
        }
      }else {
        if(_dte[x].name == "articleid") {
          artid = _dte[x].content
        }
      }
    }
  }
  var arr = [cat, scat, sscat, artid];
  for(var x = 0;x < arr.length;x++) {
    arr[x] = arr[x].replace(/[^a-zA-Z0-9]+/g, "").toLowerCase()
  }
  return arr
}, validateElement:function(obj) {
  var validateObj = function() {
    return obj !== undefined && obj !== null && "name" in obj && "content" in obj && "scheme" in obj
  }(), validateName = function() {
    var oName = obj.name, len = dm_hr1.validNames.length;
    while(len--) {
      if(oName === dm_hr1.validNames[len]) {
        return true
      }
    }
    return false
  }, validateScheme = function() {
    return obj.scheme === dm_hr1.validScheme
  };
  return validateObj && validateName() && validateScheme()
}, doDemdex:function() {
  try {
    var pmeta = dm_hr1.getMeta();
    var uuid = Tim.getCookie("uuid");
    if(!uuid) {
      uuid = Math.uuid();
      Tim.setCookie("uuid", uuid, 1440 * 365, "/", document.domain.substring(document.domain.indexOf(".")), false)
    }
    Tim.uStr = ";u=cat-" + pmeta[0] + "_scat-" + pmeta[1] + "_sscat-" + pmeta[2] + "_art-" + pmeta[3] + "_dmd-" + uuid;
    window.dexQS = Tim.dm_qdata.join(";") + Tim.uStr;
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "//dm.demdex.net/event?d_cts=1&d_rtbd=json&d_cb=dm_hr1.cb&d_ld=" + encodeURIComponent(Tim.uStr.substring(1));
    var h = document.getElementsByTagName("script")[0];
    h.parentNode.insertBefore(s, h)
  }catch(Err) {
  }
}, cb:function(json) {
  try {
    Tim.uStr = Tim.uStr + "_dcs-y";
    var tc = 0;
    for(var i = 0;i < json.traits.length;i++) {
      var sid = json.traits[i];
      var sidIndex = Tim.helpers.indexOf(Tim.sidkeyvar, parseInt(sid, 10));
      if(sidIndex > -1) {
        var dx = "dx=" + Tim.pidkeyvar[sidIndex];
        if(Tim.helpers.indexOf(Tim.dm_qdata, dx) == -1) {
          tc = tc + 1;
          Tim.dm_qdata.push(dx)
        }
      }
    }
    for(i = 0;i < json.segments.length;i++) {
      var sid = json.segments[i];
      var sidIndex = Tim.helpers.indexOf(Tim.segments, parseInt(sid, 10));
      if(sidIndex > -1) {
        var dx = "dx=" + Tim.segments[sidIndex];
        if(Tim.helpers.indexOf(Tim.dm_qdata, dx) == -1) {
          tc = tc + 1;
          Tim.dm_qdata.push(dx)
        }
      }
    }
    Tim.uStr = Tim.uStr + tc;
    window.dexQS = Tim.dm_qdata.join(";") + Tim.uStr
  }catch(Err) {
  }
}};
try {
  Tim.main([{'miscVarTagCode':'nexac=1&nexacvalidttl=14400', 'miscVarSecureTagCode':'nexac=1&nexacvalidttl=14400', 'miscVarTagType':2}],
[{ 'scope':1, 'pos':3, 'dest':'All available destinations', 'code': '<scr'+'ipt type=\"text/javascript\">\nvar s = document.getElementsByTagName(\'script\')[0]; \nvar script = document.createElement(\'script\');\nscript.onload = function() {\n      metaCol = document.getElementsByTagName(\'meta\'); \n      var _dmcat = \"\";\n      var _found = 1;\n      for (_i=0;_i<metaCol.length;_i++) {\n            if ((metaCol[_i].name == \"category\") && (_found == 1)) { \n                  _dmcat = metaCol[_i].content; \n                  _found++;\n            }\n      }\n      if (_dmcat != null) {\n            DM_cat(_dmcat);\n      }\n      DM_tag();\n}\nscript.src = \"http://js.revsci.net/gateway/gw.js?csid=F08747\";\ns.parentNode.insertBefore(script, s);\n</script>', 'scode':'', 'expires':null, 'exclusion':''},{ 'scope':4, 'pos':2, 'dest':'ehow.com/print/', 'code': '<scr'+'ipt type=\"text/javascript\">\nTim.demdexSubmit({pdata:[19703]});\n</script>', 'scode':'', 'expires':null, 'exclusion':''},{ 'scope':1, 'pos':3, 'dest':'All available destinations', 'code': '<scr'+'ipt>\n(function() {\n	var yes_pixel = 20298;\n	var no_pixel = 20299;\n	var count = 0;\n	var max_count = 100;\n	var handleError = function() {\n		if (typeof Tim.error != \"undefined\" && typeof Tim.error.handleError == \"function\") {\n			Tim.error.handleError({\n				name : \"HarvesterError\",\n				message : \"Code yes/no harvest in tag did not function correctly\",\n				site : \"demand\",\n				filename : \"scheduled_tag\",\n				partner : \"demand\"\n			});\n		}\n		else {\n			(new Image(0,0)).src = (document.location.protocol == \"https:\" ? \"https://\" : \"http://\") + \"error.demdex.net/pixel/14137?logdata:Code yes/no harvest in tag did not function correctly\";\n		}\n		\n		return false;\n	};	\n\n	setTimeout(function() {\n		var elem_no = document.getElementById(\'no\');\n		var elem_yes = document.getElementById(\'yes\');\n		var func = function(pixels) {			\n			return function(e) {\n				if (Tim.demdexSubmit || Tim.demdexEvent) {\n					if (Tim.demdexSubmit) {\n						Tim.demdexSubmit({pdata:[pixels]});\n					}\n					else {\n						Tim.demdexEvent({pdata:[pixels]});\n					}\n					\n					if (document.removeEventListener) {\n					   elem_no.removeEventListener(\'click\', no_request);\n					   elem_yes.removeEventListener(\'click\', yes_request);\n					   return true;\n					}\n					else if (document.detachEvent) {\n						elem_no.detachEvent(\"onclick\", no_request);        \n						elem_yes.detachEvent(\"onclick\", yes_request);\n						return true;\n					}\n				}\n				\n				handleError();\n			}\n		}\n		\n		if (!elem_no || !elem_yes) {\n			return count++ < max_count  ? setTimeout(arguments.callee, 100) : false;\n		}\n		\n		var yes_request = func(yes_pixel);\n		var no_request = func(no_pixel);\n		\n		if (elem_no && elem_yes) {\n			if (document.addEventListener) {\n				elem_no.addEventListener(\"click\", no_request, false);\n				elem_yes.addEventListener(\"click\", yes_request, false);\n				return true;\n			}\n			else if (document.attachEvent) {\n				elem_no.attachEvent(\"onclick\", no_request);        \n				elem_yes.attachEvent(\"onclick\", yes_request);\n				return true;\n			}\n			\n			handleError();\n		}\n	}, 100);\n}());\n</script>', 'scode':'', 'expires':null, 'exclusion':''},{ 'scope':1, 'pos':2, 'dest':'All available destinations', 'code': '<scr'+'ipt type=\"text/javascript\">\n\nvar search = Tim.getSearchReferrer();\nif(search.valid && search.keywords){\n    Tim.demdexEvent({\n        c_se: search.name,\n        c_st: search.keywords\n    });\n}\n\n</script>', 'scode':'', 'expires':null, 'exclusion':''},{ 'scope':1, 'pos':1, 'dest':'All available destinations', 'code': '<scr'+'ipt>\nTim.Provider(\'chango\')\n  .type(\'script\')\n  .url(\"http://p.chango.com/p.js\")\n  .before(function() {\n    window.__changoPartnerId = \"demand-ehow\";\n  })\n  .save();\n</script>', 'scode':'', 'expires':null, 'exclusion':''},{ 'scope':1, 'pos':2, 'dest':'All available destinations', 'code': '<scr'+'ipt>\n(function(w, d, args) {\n    function setCookie(name, value, expires, path, domain, secure) {\n        var today = new Date();\n		if (expires) {\n			expires = expires * 1000 * 60;\n		}\n		document.cookie = name + \'=\' + value + ((expires) ? \';expires=\' + new Date(today.getTime() + expires).toUTCString() : \'\') + ((path) ? \';path=\' + path : \'\') + ((domain) ? \';domain=\' + domain : \'\') + ((secure) ? \';secure\' : \'\');\n    }\n\n    var cookie = {\n        name : args.cookie_name || \"aam_did\",\n        days : args.cookie_days || 100,\n		domain : args.cookie_domain || \".\" + document.domain\n    };\n	var cb = args.callback_func || function(arg) {\n		if (arg && arg.uuid) {\n			setCookie(cookie.name, arg.uuid, cookie.days * 24 * 60, \'/\', cookie.domain, false);\n		}\n	};\n    var callback = {\n        name : args.callback_name || \"_aam_cb\",\n        remove : function() {\n            try {\n                delete window[callback.name];\n            }\n            catch(e) {\n                window[callback.name] = null;\n            }\n        },  \n        func : function(arg) {\n            cb(arg);\n            callback.remove()\n        }\n    };\n    var script = d.createElement(\'script\');\n    var first_script = document.getElementsByTagName(\'script\')[0];\n    var done = false;\n\n    w[callback.name] = callback.func;\n    script.onload = script.onreadystatechange = function() {\n        if (!done && (!this.readyState || script.readyState == \"loaded\" || script.readyState == \"complete\")) {\n            done = true;\n            script.onload = script.onreadystatechange = null;\n\n            if (script && script.parentNode) {\n                script.parentNode.removeChild(script);\n            }\n        }\n    };\n    script.src = \"http://\" + args.subdomain + \".demdex.net/event?d_rtbd=json&d_cb=\" + callback.name;\n    first_script.parentNode.insertBefore(script, first_script);\n}(window, document, {\n        subdomain : \"dm\",\n	cookie_name : \"aam_did\",\n	cookie_days : 2,\n	cookie_domain : document.domain,\n	callback_name : \"_aam_cb\"\n}));\n</script>', 'scode':'', 'expires':null, 'exclusion':''},{ 'scope':1, 'pos':1, 'dest':'All available destinations', 'code': '<scr'+'ipt type=\"text/javascript\"> \nTim.targus = 1;\nTim.pidkeyvar = [10403, 10406, 10408, 10410, 10412, 10413, 10414, 10417, 10422, 10423, 10427, 10444, 10446, 10481, 10558, 10562, 10563, 11415, 15174, 15207, 15234, 15242, 15244, 15265, 15294, 15297, 15298, 15300, 15301, 15302, 15303, 15304, 15307, 15308, 15309, 15324, 15344, 15352, 15355, 15420, 18569, 38997, 179126, 27130];\n\nTim.sidkeyvar = [10971, 10974, 10976, 10978, 10980, 10981, 10982, 10985, 10990, 10991, 10995, 11012, 11014, 11049, 11126, 11130, 11131, 11983, 15742, 15775, 15802, 15810, 15812, 15833, 15862, 15865, 15866, 15868, 15869, 15870, 15871, 15872, 15875, 15876, 15877, 15892, 15912, 15920, 15923, 15988, 63224, 86288, 257425, 73052];\n\nif (typeof window.aamObject == \'undefined\') {\n	window.aamObject = {};\n}\n\nwindow.aamObject.ehowFilter = {\n	pageName: 0,\n	cat: 1,\n	scat: 1,\n	sscat: 1,\n	expert: 1,\n        chan: 1,\n        schan: 1,\n        article: 0,\n        blog: 1,\n        tyn: 1\n};\n\nvar dexBaseURL = ((\"https:\" == document.location.protocol) ? \"https://a248.e.akamai.net/demdex.download.akamai.com/dm/\" : \"http://akcdn.demdex.net/dm/\");\ndocument.write(unescape(\"%3Cscript src=\'\" + dexBaseURL + \"dm_allv4.js\' type=\'text/javascript\' %3E%3C/script%3E\"));\n</script>', 'scode':'', 'expires':null, 'exclusion':''}])
}catch(__TIM_Err__) {
  if(typeof Tim != "undefined" && typeof Tim.error != "undefined" && typeof Tim.error.handleError == "function") {
    __TIM_Err__.filename = __TIM_Err__.filename || "demdex.js";
    Tim.error.handleError(__TIM_Err__)
  }else {
    (new Image(0, 0)).src = (document.location.protocol == "https:" ? "https://" : "http://") + "error.demdex.net/pixel/14137?logdata:Error handling not defined"
  }
}