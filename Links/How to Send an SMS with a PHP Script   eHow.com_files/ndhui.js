
var bd_nd_supervisor = true;
var bd_nd_issues_count = 0;
var bd_nd_untrusted = false;
var bd_nd_whitelist = false;
var bd_nd_statuses = new Array();
bd_nd_statuses["NetDefender.HTTP.Core"] = new Array();
bd_nd_statuses["NetDefender.HTTP.Core"]["NetDefender.Feature.HTTP.Core.Status"] = 1;
bd_nd_statuses["NetDefender.HTTP.Alert"] = new Array();
bd_nd_statuses["NetDefender.HTTP.AntiMalware"] = new Array();
bd_nd_statuses["NetDefender.HTTP.AntiMalware"]["NetDefender.Feature.HTTP.AntiMalware.ScanRequest"] = 1;
bd_nd_statuses["NetDefender.HTTP.AntiMalware"]["NetDefender.Feature.HTTP.AntiMalware.ScanResponse"] = 1;
bd_nd_statuses["NetDefender.HTTP.AntiMalware"]["NetDefender.Feature.HTTP.AntiMalware.ScanPOST"] = 1;
bd_nd_statuses["NetDefender.HTTP.AntiMalware"]["NetDefender.Feature.HTTP.AntiMalware.ScanIM"] = 1;
bd_nd_statuses["NetDefender.HTTP.AphParental"] = new Array();
bd_nd_statuses["NetDefender.HTTP.AphParental"]["NetDefender.Feature.HTTP.AphParental.Aph"] = 1;
bd_nd_statuses["NetDefender.HTTP.AphParental"]["NetDefender.Feature.HTTP.AphParental.Parental"] = 0;
bd_nd_statuses["NetDefender.HTTP.Chunked"] = new Array();
bd_nd_statuses["NetDefender.HTTP.Cloud"] = new Array();
bd_nd_statuses["NetDefender.HTTP.Cloud"]["NetDefender.Feature.HTTP.Cloud.Status"] = 1;
bd_nd_statuses["NetDefender.HTTP.Cloud"]["NetDefender.Feature.HTTP.Cloud.Default"] = 1;
bd_nd_statuses["NetDefender.HTTP.Cloud"]["NetDefender.Feature.HTTP.Cloud.Malware"] = 1;
bd_nd_statuses["NetDefender.HTTP.Cloud"]["NetDefender.Feature.HTTP.Cloud.Phishing"] = 1;
bd_nd_statuses["NetDefender.HTTP.Cloud"]["NetDefender.Feature.HTTP.Cloud.Fraud"] = 1;
bd_nd_statuses["NetDefender.HTTP.Cloud"]["NetDefender.Feature.HTTP.Cloud.Untrusted"] = 1;
bd_nd_statuses["NetDefender.HTTP.Deflate"] = new Array();
bd_nd_statuses["NetDefender.HTTP.GZip"] = new Array();
bd_nd_statuses["NetDefender.HTTP.HTMLExtractor"] = new Array();
bd_nd_statuses["NetDefender.HTTP.HUI"] = new Array();
bd_nd_statuses["NetDefender.HTTP.LinkScanner"] = new Array();
bd_nd_statuses["NetDefender.HTTP.LinkScanner"]["NetDefender.Feature.HTTP.LinkScanner.Status"] = 1;
bd_nd_statuses["NetDefender.HTTP.Privacy"] = new Array();
bd_nd_statuses["NetDefender.HTTP.Privacy"]["NetDefender.Feature.HTTP.Privacy.Status"] = 1;
bd_nd_statuses["NetDefender.HTTP.Resource"] = new Array();
bd_nd_statuses["NetDefender.HTTP.Settings"] = new Array();
bd_nd_statuses["NetDefender.HTTP.WBList"] = new Array();
bd_nd_statuses["NetDefender.HTTP.WBList"]["NetDefender.Feature.HTTP.WhitelistBlacklist.Status"] = 1;
bd_nd_statuses["NetDefender.HTTP.WordFiltering"] = new Array();
bd_nd_statuses["NetDefender.HTTP.WordFiltering"]["NetDefender.Feature.HTTP.WordFiltering.Status"] = 1;
bd_nd_statuses["NetDefender.HTTP.ZLib"] = new Array();
/*BEGIN_TRANSLATABLE_TEXT*/
var bd_nd_E893A5F3FE87409FB167F51A030D021C_strings = 
{
	settings_global_title : "",
	settings_global_desc : "Global",
	settings_adfilter_title : "Ad Filter",
	settings_adfilter_desc : "Removes annoying pop-up ads.",
	settings_aph_title : "Antiphishing Filter",
	settings_aph_desc : "Blocks pages that contain phishing.",
	settings_am_title : "Antimalware Filter",
	settings_am_desc : "Blocks pages that contain malware.",
	settings_ls_title : "Search advisor",
	settings_ls_desc : "Provides advanced warning of risky websites in your search results.",
	
	toolbar_status_ok : "This page <br/> is safe",
	toolbar_status_nok : "Page <br/>not safe",
	toolbar_status_err : "An error <br/> has ocurred",
	toolbar_status_disabled : "This page is <br/> not scanned",
	toolbar_status_untrusted : "Untrusted",
	toolbar_title : "Bitdefender Total Security 2012",

	tool_3_tooltip : "Sandbox",
    tool_3_tooltip_xp : "not supported in Windows XP",
	tool_settings_text : "Settings",
	tool_settings_tooltip : "Settings",

	tool_dragger : "Click to expand",

    fraud_link: "http://trafficlight.bitdefender.com/info?url={URL}&language=en_US"
};
  /*END_TRANSLATABLE_TEXT*/

var bd_nd_E893A5F3FE87409FB167F51A030D021C_body 			= document.getElementsByTagName("body");
var bd_nd_E893A5F3FE87409FB167F51A030D021C_isIE 			= (document.addEventListener) ? false : true;

var bd_nd_E893A5F3FE87409FB167F51A030D021C_settings = new function(bd_nd_statuses)
{
	this.bd_nd_hui_features	=	[	{	status: 0,
										title: bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.settings_global_title,
										description: bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.settings_global_desc,
										user:"",
										plugins:[
												  {	name: "NetDefender.HTTP.Core",
													features: [	"NetDefender.Feature.HTTP.Core.Status"]
												  }
												]
									},
									{	status: 0,
										title: bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.settings_aph_title,
										description: bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.settings_aph_desc,
										user: "%USER%",
										plugins:[
												  {	name: "NetDefender.HTTP.AphParental",
													features: [	"NetDefender.Feature.HTTP.AphParental.Aph"]
												  }
												]
									},
									{	status: 0,
										title: bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.settings_am_title,
										description: bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.settings_am_desc,
										user: "",
										plugins:[
												  {	name: "NetDefender.HTTP.AntiMalware",
													features: [	"NetDefender.Feature.HTTP.AntiMalware.ScanRequest",
																"NetDefender.Feature.HTTP.AntiMalware.ScanResponse",
																"NetDefender.Feature.HTTP.AntiMalware.ScanPOST",
																"NetDefender.Feature.HTTP.AntiMalware.ScanIM"
															  ]
												  }
												]
									},
									{	status: 0,
										title: bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.settings_ls_title,
										description: bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.settings_ls_desc,
										user: "%USER%",
										plugins:[
												  {	name: "NetDefender.HTTP.LinkScanner",
													features: [	"NetDefender.Feature.HTTP.LinkScanner.Status"
															  ]
												  }
												]
									}
								];

	this.init = function(statuses)
	{
		var i;
		var cFeatures = bd_nd_E893A5F3FE87409FB167F51A030D021C_settings.getFeaturesCount();
		var feature;
		for (i = 0; i < cFeatures; i++)
		{
			feature = bd_nd_E893A5F3FE87409FB167F51A030D021C_settings.getFeature(i);
			feature.status = this.resolveStatus(statuses, feature);
		}
	}

	this.resolveStatus = function(statuses, feature)
	{
		var i, j;
		var k = false;
		for (i = 0; i < feature.plugins.length; i++)
		{
			for (j = 0; j < feature.plugins[i].features.length; j++)
			{
				if (undefined != statuses[feature.plugins[i].name] && undefined != statuses[feature.plugins[i].name][feature.plugins[i].features[j]])
				{
					k = true;
					if (1 == statuses[feature.plugins[i].name][feature.plugins[i].features[j]])
					{
						return 1;
					}
				}
			}
		}
		if (false == k)
		{
			return -1;
		}
		return 0;
	}

	this.getFeaturesCount = function()
	{
		return this.bd_nd_hui_features.length;
	}

	this.getFeature = function(index)
	{
		return this.bd_nd_hui_features[index];
	}

	this.settingsCallback = function(responseText, responseStatus, responseXML, self)
	{
		var status;
		var root;
		if (undefined != responseXML)
		{
			root = responseXML.documentElement;
		}
		if (200 == responseStatus && undefined != root && root.tagName == "module" && root.hasChildNodes())
		{
			status = 0;
			for (var i = 0; i < root.childNodes.length; i++)
			{
				if (1 == root.childNodes[i].getAttribute("status"))
				{
					status = 1;
					break;
				}
			}
			self.feature.status = status;
			self.callback(self.index, status);
		}
		else
		{
			self.callback(-1, 10001);
		}
	}
	
	this.changeStatusByIndex = function(index, callback)
	{
		var feature = this.getFeature(index);
		var xmlhttp = new bd_nd_E893A5F3FE87409FB167F51A030D021C_ajax(this.settingsCallback);
		if(!xmlhttp)
		{
			callback(-1, 10000);
			return;
		}
		xmlhttp.index = index;
		xmlhttp.feature = feature;
		xmlhttp.callback = callback;

		var params = "status=" + encodeURIComponent("<module uid=\"NetDefender.HTTP.Core\">");
		var i, j;
		var new_status = (1 == feature.status ? 0 : 1);
		for (i = 0; i < feature.plugins.length; i++)
		{
			for (j = 0; j < feature.plugins[i].features.length; j++)
			{
				params += encodeURIComponent("<plugin uid=\"" + feature.plugins[i].name + "\" feature=\"" + feature.plugins[i].features[j] + "\" user=\"" + feature.user + "\" pid=\"%PID%\" status=\"" + new_status + "\" />");
			}
		}
		params += encodeURIComponent("</module>");
		
		xmlhttp.sendRequest(params);
	}
}

function bd_nd_E893A5F3FE87409FB167F51A030D021C_ajax(callback)
{
	var that = this;
	this.bd_nd_E893A5F3FE87409FB167F51A030D021C_ajaxCallback = callback || function() { };
	(window.ActiveXObject) ? this.ajax = new ActiveXObject("Microsoft.XMLHTTP") : this.ajax = new XMLHttpRequest();

	this.sendRequest = function(params)
	{
		that.ajax.onreadystatechange = function()
		{
			if (that.ajax.readyState == 4)
			{
				that.bd_nd_E893A5F3FE87409FB167F51A030D021C_ajaxCallback(that.ajax.responseText, that.ajax.status, that.ajax.responseXML, that);
			}
		} 
		this.ajax.open("POST", window.location + Math.random(), true);
		this.ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		this.ajax.setRequestHeader("BDNDSS_B67EA559F21B487F861FDA8A44F01C50", "10000000aebb8b5d51447e16514474a2aebb8b5dd86defa6052ce0dcb82a6d3bc5db84274acbc771");
		this.ajax.send(params);
	}
}

function bd_nd_E893A5F3FE87409FB167F51A030D021C_webEvt()
{
	this.params = "";
	
	this.addEvent = function(action, value, source)
	{
		this.params = this.params + "<event><action><![" + "CDATA" + "[" + action + "]" + "]></action><source><![" + "CDATA" + "[" + source + "]" + "]></source><value><![" + "CDATA" + "[" + value + "]" + "]></value></event>";
	}
	
	this.getEventData = function()
	{
		this.params = "<module uid=\"NetDefender.HTTP.Core\">" + this.params + "</module>";
		this.params = "event=" + encodeURIComponent(this.params);

		return this.params;
	}
	
	this.sendEvents = function()
	{
		var ajax = new bd_nd_E893A5F3FE87409FB167F51A030D021C_ajax();
		ajax.sendRequest(this.getEventData());
	}
}

var		  bd_nd_E893A5F3FE87409FB167F51A030D021C_evt = new function()
{    
    this.add = function(sEvent, fSubject, oElTarget)
	{
		oElTarget = oElTarget || window,
		sEvent = sEvent.toLowerCase();

		if(bd_nd_E893A5F3FE87409FB167F51A030D021C_isIE)
		{
			//IE specific exceptions:
			if(oElTarget == window && sEvent == 'onmousemove') oElTarget = document.getElementsByTagName('BODY')[0];
			if(oElTarget == document && sEvent == 'onmouseout'){ oElTarget = document.getElementsByTagName('HTML')[0]; sEvent = 'onmouseleave'; }

			oElTarget.attachEvent(sEvent, fSubject);
		}else
		{
			sEvent = sEvent.substr(2);
			oElTarget.addEventListener(sEvent, fSubject, false);
		}
    }

    this.del = function(sEvent, fSubject, oElTarget)
	{
		oElTarget = oElTarget || window;
		sEvent = sEvent.toLowerCase();

		if(bd_nd_E893A5F3FE87409FB167F51A030D021C_isIE)
		{
			//IE specific exceptions:
			if(oElTarget == window && sEvent == 'onmousemove') oElTarget = document.getElementsByTagName('BODY')[0];
			if(oElTarget == document && sEvent == 'onmouseout'){ oElTarget = document.getElementsByTagName('HTML')[0]; sEvent = 'onmouseleave'; }
			oElTarget.detachEvent(sEvent, fSubject);
		}else
		{
			sEvent = sEvent.substr(2);
			oElTarget.removeEventListener(sEvent, fSubject, false);
		}
    }
	this.getEventTarget = function(e)
	{
		if(!e)
			e = window.event;
		if(e.target)
			return e.target;
		return e.srcElement;
	}	
}
var 	  bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM = new function()
{
    //gElm is an object which has the structure {'name': nodeName, 'attributes' : [{'name': attrName, 'valule': 'attrValue'}, ...]}
    this.create = function(gElm)
	{
		var attrName = null;
		var     node = document.createElement(gElm.name);

		for(attrName in gElm.attributes)
		{
			if ('className' == attrName)
			{
				node.className = gElm.attributes[attrName];
			}
			else
			if ('innerHTML' == attrName)
			{
				node.innerHTML = gElm.attributes[attrName];
			}
			else
			{
				node.setAttribute(attrName, gElm.attributes[attrName]);
			}
		}
		return node;
    }
    
    //gElm is an DOM object referrence
    this.destroy = function(gElm)
	{
		return gElm.parentNode.removeChild(gElm);
    }
}

//hui object
var bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI = new function () {
    var that = this;
    var no_pos_fixed = false;
    var hui_container = null;
    var PREFIX = "nd_e506252a6b7649eb9640b54befbe7519";
    var STATUS_OK = 1;
    var STATUS_NOK = 2;
    var STATUS_ERR = 3;
    var STATUS_DISABLED = 4;
    var STATUS_UNTRUSTED = 5;

    var STR_STATUS_OK = bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.toolbar_status_ok;
    var STR_STATUS_NOK = bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.toolbar_status_nok;
    var STR_STATUS_ERR = bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.toolbar_status_err;
    var STR_STATUS_DISABLED = bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.toolbar_status_disabled;
    var STR_TITLE = bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.toolbar_title;
    var STR_STATUS_UNTRUSTED = bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.toolbar_status_untrusted;

    var hui_visible;
    var isUntrustedSite = false;
    var settings_visible;
    var isAlertPage = false;
    var isProductOn = false;
    var status;
    var title;
    var onoff;
    var dragger;
    var settingsPage;
    var settingsPageContent;

    this.GetID = function (id) {
        return PREFIX + "_" + id;
    }
    this.StripID = function (id) {
        return id.substr(PREFIX.length + 1);
    }

    this.CreateStatus = function (state) {
        var status_style;
        var status_html;

        status = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
            name: 'div',
            attributes:
			{
			    id: this.GetID('status'),
			    className: this.GetID('status')
			}
        });

        switch (state) {
            case STATUS_OK:
                {
                    status.style.backgroundPosition = "0px 0px";
                    status.innerHTML = "<label id='labelstatus'>" + STR_STATUS_OK + "</label>";
                } break;
            case STATUS_NOK:
                {
                    var fraud_link = bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.fraud_link;
                    var window_location = escape(window.location);
                    var newlink = fraud_link.replace("{URL}", window_location);
                    status.style.backgroundPosition = "-122px 0px";
                    status.innerHTML = "<label id='labelstatus'>" + STR_STATUS_NOK + "</label><a href='" + newlink + "' id='fraudlink_nok' target='_blank'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>";
                } break;
            case STATUS_ERR:
                {
                    status.style.backgroundPosition = "-244px 0px";
                    status.innerHTML = "<label id='labelstatus'>" + STR_STATUS_ERR + "</label>";
                } break;
            case STATUS_UNTRUSTED:
                {
                    var fraud_link = bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.fraud_link;
                    var window_location = escape(window.location);
                    var newlink = fraud_link.replace("{URL}", window_location);
                    status.style.backgroundPosition = "-244px 0px";
                    status.innerHTML = "<label id='labelstatus'>" + STR_STATUS_UNTRUSTED + "</label><a href='" + newlink + "' id='fraudlink' target='_blank'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>";
                } break;
            case STATUS_DISABLED:
                {
                    status.style.backgroundPosition = "-366px 0px";
                    status.innerHTML = "<label id='labelstatus'>" + STR_STATUS_DISABLED + "</label>";
                } break;
            default:
                {
                    status.style.backgroundPosition = "-366px 0px";
                    status.innerHTML = "<label id='labelstatus'>" + STR_STATUS_DISABLED + "</label>";
                } break;
        }
        hui_container.appendChild(status);
    }

    this.CreateTitle = function () {
        title = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
            name: 'div',
            attributes:
			{
			    id: this.GetID('title'),
			    className: this.GetID('title'),
			    innerHTML : "<span class='notranslate'><label id='labeltitle'>"+STR_TITLE+"</label></span>"
			}
        });
        hui_container.appendChild(title);
    }

    this.CreateSeparator = function () {
        var separator;

        separator = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
            name: 'div',
            attributes:
			{
			    className: this.GetID('separator')
			}
        });
        hui_container.appendChild(separator);
    }

    this.CreateTool = function (id, html, tt, ev, enabled) {
        var tool;

        tool = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
            name: 'a',
            attributes:
			{
			    id: this.GetID(id),
			    className: this.GetID('tool'),
			    innerHTML: html,
			    title: tt,
			    style: "width:auto"
			}
        });

        if (enabled) {
            bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onmouseup", ev, tool);
            bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onmouseover", this.OnMouseOver, tool);
            bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onmouseout", this.OnMouseOut, tool);
        }
        else {
            tool.style.cursor = 'default'; //setAttribute("cursor", "none");
        }

        hui_container.appendChild(tool);

        return tool;
    }

    this.CreateOnOff = function (state, tt) {
        onoff = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
            name: 'a',
            attributes:
			{
			    id: this.GetID('onoff'),
			    className: this.GetID('onoff') + " " + (state ? this.GetID('onoff_on') : this.GetID('onoff_off')) + (bd_nd_supervisor ? "" : "_unavailable"),
			    title: tt
			}
        });
        bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onmouseup", this.OnOnOffClick, onoff);
        bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onmouseover", this.OnMouseOver, onoff);
        bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onmouseout", this.OnMouseOut, onoff);
        hui_container.appendChild(onoff);
    }

    this.CreateDragger = function (tt) {
        dragger = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
            name: 'a',
            attributes:
			{
			    id: this.GetID('dragger'),
			    className: this.GetID('dragger'),
			    title: tt
			}
        });
        bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onmouseup", this.OnDraggerClick, dragger);
        bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onmouseover", this.OnMouseOver, dragger);
        bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onmouseout", this.OnMouseOut, dragger);
        hui_container.appendChild(dragger);
    }

    this.OnMouseOut = function (e) {
        sender = bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.getEventTarget(e);
        sender = bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.getEventTarget(e);
        if (sender.className == '' || sender.nodeName.toLowerCase() == 'label') {
            sender = sender.parentNode;
        }
        classes = sender.className.split(' ');

        if (classes.length) {
            var lastClassName = classes.pop();
            var newClassName = '';
            if (classes.length) {
                newClassName = classes.join(' ');
            }
            newClassName += ' ';

            var pos = lastClassName.lastIndexOf('_hover');
            if (-1 != pos) {
                newClassName += lastClassName.substr(0, pos);
                sender.className = newClassName;
                return false;
            }
        }
    }
    this.OnMouseOver = function (e) {
        sender = bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.getEventTarget(e);
        if (sender.className == '' || sender.nodeName.toLowerCase() == 'label') {
            sender = sender.parentNode;
        }
        classes = sender.className.split(' ');

        if (classes.length) {
            var lastClassName = classes.pop();
            var newClassName = '';
            if (classes.length) {
                newClassName = classes.join(' ');
            }
            newClassName += ' ';

            var pos = lastClassName.lastIndexOf('_hover');
            if (-1 == pos) {
                //we have hover strip it down
                newClassName += lastClassName;
                newClassName += '_hover';
                sender.className = newClassName;
                return false;
            }
        }
    }
    this.OnDraggerClick = function (e) {
        if (false == isAlertPage)//colapse hui only if this not an alert page
        {
            if (hui_visible) {
                hui_visible = false;
                hui_container.style.top = '-47px';
                dragger.style.top = '0px';
                if (settings_visible) {
                    settingsPage.style.display = "none";
                    settings_visible = false;
                }
            }
            else {
                hui_visible = true;
                hui_container.style.top = '0px';
                dragger.style.top = '47px';
            }
            e.cancelBubble = true;
        }
    }

    this.CreateSettingsPage = function () {
        settingsPage = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
            name: 'div',
            attributes:
			{
			    className: this.GetID('settings_page')
			}
        });
        var settingsPageTop = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
            name: 'div',
            attributes:
			{
			    className: this.GetID('settings_page_top')
			}
        });
        var settingsPageBottom = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
            name: 'div',
            attributes:
			{
			    className: this.GetID('settings_page_bottom')
			}
        });
        var settingsPageUpBtn = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
            name: 'a',
            attributes:
			{
			    className: this.GetID('settings_page_upbtn')
			}
        });
        bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onclick", this.OnTool4Click, settingsPageUpBtn);

        settingsPageContent = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
            name: 'div',
            attributes:
			{
			    className: this.GetID('settings_page_content')
			}
        });

        this.PopulateSettings(settingsPageContent);

        settingsPage.appendChild(settingsPageTop);
        settingsPage.appendChild(settingsPageContent);
        settingsPageBottom.appendChild(settingsPageUpBtn);
        settingsPage.appendChild(settingsPageBottom);
        hui_container.appendChild(settingsPage);
		if (bd_nd_supervisor)
		{
			this.updateStatuses(bd_nd_E893A5F3FE87409FB167F51A030D021C_settings.getFeature(0).status);
		}
    }

    this.PopulateSettings = function (settingsPage) {
        var paragraph = null;
        var btnStatus = null;
        var featureSpacer = null;
        var count = bd_nd_E893A5F3FE87409FB167F51A030D021C_settings.getFeaturesCount();
		var feature = null;

        for (var i = 1; i < count; i++) {
            feature = bd_nd_E893A5F3FE87409FB167F51A030D021C_settings.getFeature(i);
            paragraph = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
                name: 'p',
                attributes:
			{
			    className: this.GetID('settings_feature')
			}
            });

            btnStatus = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
                name: 'a',
                attributes:
			{
			    id: this.GetID(i)
			}
            });
            if (1 == feature.status) {
                btnStatus.className = this.GetID('settings_btn_status') + " " + (bd_nd_supervisor ? this.GetID('settings_btn_status_on') : this.GetID('settings_btn_status_on_unavailable'));
            } else {
                btnStatus.className = this.GetID('settings_btn_status') + " " + (bd_nd_supervisor ? this.GetID('settings_btn_status_off') : this.GetID('settings_btn_status_off_unavailable'));
            }

            bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onclick", this.btnStatusClick, btnStatus);
            bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onmouseover", this.OnMouseOver, btnStatus);
            bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onmouseout", this.OnMouseOut, btnStatus);

            paragraph.innerHTML = "<label class='labelstatustxt' ><strong>" + feature.title + "</strong><br/>" + feature.description + '</label>';
            paragraph.appendChild(btnStatus);

            if (i < count - 1) {
                featureSpacer = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
                    name: 'div',
                    attributes:
				{
				    className: this.GetID('settings_feature_spacer')
				}
                });
                paragraph.appendChild(featureSpacer);
            }
            settingsPage.appendChild(paragraph);
        }
    }
	
	this.updateStatuses = function(status)
	{
		var count = bd_nd_E893A5F3FE87409FB167F51A030D021C_settings.getFeaturesCount();
		for (var i = 1; i < count; i++)
		{
			var feature = bd_nd_E893A5F3FE87409FB167F51A030D021C_settings.getFeature(i);
			var buton = document.getElementById(this.GetID(i));
			buton.className = this.GetID('settings_btn_status') + " " + this.GetID('settings_btn_status') + (feature.status == -1 ? '_off_unavailable' : (feature.status == 1 ? '_on' : '_off') + (status == 1 ? '' : '_unavailable'));
		}
	}
	
    this.btnStatusClick = function (e) {
        //check if the product is off
        if (bd_nd_supervisor && bd_nd_E893A5F3FE87409FB167F51A030D021C_settings.getFeature(0).status) {
            var sender = bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.getEventTarget(e);
			var feature = null;
            if ('' == sender.id) {
                feature = bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.StripID(sender.parentNode.id);
            } else {
                feature = bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.StripID(sender.id);
            }
            if (null != feature && -1 != bd_nd_E893A5F3FE87409FB167F51A030D021C_settings.getFeature(feature).status) {
                bd_nd_E893A5F3FE87409FB167F51A030D021C_settings.changeStatusByIndex(feature, bd_nd_E893A5F3FE87409FB167F51A030D021C_statusChanged);
            }
        }
        e.cancelBubble = true;
        return false;
    }
    this.OnOnOffClick = function (e) {
        if (bd_nd_supervisor) {
            bd_nd_E893A5F3FE87409FB167F51A030D021C_settings.changeStatusByIndex(0, bd_nd_E893A5F3FE87409FB167F51A030D021C_onOffChanged);
            e.cancelBubble = true;
        }
    }

    this.OnTool0Click = function (e) {
        alert("TOOL0");
        e.cancelBubble = true;
    }

    this.OnTool1Click = function (e) {
        alert("TOOL1");
        e.cancelBubble = true;
    }

    this.OnTool2Click = function (e) {
        var webEvt = new bd_nd_E893A5F3FE87409FB167F51A030D021C_webEvt();
        var obj = bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.getEventTarget(e);
        if (obj.nodeName.toLowerCase() == "img") {
            obj = obj.parentNode;
        }
        webEvt.addEvent("click", "", obj.id);
        webEvt.sendEvents();
        e.cancelBubble = true;
    }

    this.IsSandBoxAvailable = function () {
        var OSName = "Win7";
        var OS = navigator.appVersion;


        if (navigator.appName != 'Microsoft Internet Explorer') {
            OS = navigator.userAgent;
        }

        if (OS.indexOf("Win") != -1) {
            if ((OS.indexOf("Windows NT 7.0") != -1) || (OS.indexOf("Windows NT 6.1") != -1)) {
                //win7
                return true;
            }
            else if ((OS.indexOf("Windows NT 6.0") != -1)) {
                // cica-i vista...
                return true;
            }

        }
        return false;
    }

    this.OnTool3Click = function (e) {
        var webEvt = new bd_nd_E893A5F3FE87409FB167F51A030D021C_webEvt();
        var obj = bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.getEventTarget(e);
        if (obj.nodeName.toLowerCase() == "img") {
            obj = obj.parentNode;
        }
        webEvt.addEvent("click", window.location, "clicksandbox");
        webEvt.sendEvents();
        e.cancelBubble = true;
    }

    this.OnTool4Click = function (e) {
        if (settings_visible) {
            settingsPage.style.display = "none";
            settings_visible = false;
        } else {
            settingsPage.style.display = "block";
            settings_visible = true;
        }
        e.cancelBubble = true;
    }

    this.getIEVersion = function () {
        var rv = -1;
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) {
            rv = parseFloat(RegExp.$1);
        }
        return rv;
    }

    this.canEmbed = function () {
        var rv = -1;

        if (navigator.appName != 'Microsoft Internet Explorer') {
            return true;
        }

        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) {
            rv = parseFloat(RegExp.$1);
        }
        if (rv >= 8.0) {
            return true;
        }

        return false;
    }

    this.IsHuiVisible = function () {
        if (isAlertPage) {
            return true;
        }
        return hui_visible;
    }

    this.GetDocHeight = function () {
        var D = document;
        return Math.max(Math.max(D.body.scrollHeight, D.documentElement.scrollHeight), Math.max(D.body.offsetHeight, D.documentElement.offsetHeight), Math.max(D.body.clientHeight, D.documentElement.clientHeight));
    }

    this.Init = function () {
        // document (not window) height must be at least hui height and window must have history (toolbars history len is always 0)
        if (that.GetDocHeight() < 62 && window.history.length == 0) {
            return 2;
        }
        //create statuses init
        bd_nd_E893A5F3FE87409FB167F51A030D021C_settings.init(bd_nd_statuses);
        //check if I am in a frame
        if (typeof (window.top) != 'object') {
            if (window.parent != window) {
                //we are in a frame
                return 1;
            }
        }
        else
            if (window.top != window) {
                return 1;
            }

        //if another load still slips by, this ensures out toolbar is unique
        if (null != document.getElementById('tf_hui_container')) {
            return;
        }
        //check if this is IE8 or above. IF IE 7 than position fixed is not useful
        if (navigator.appName == "Microsoft Internet Explorer") {
            if (typeof (document.documentMode) == 'undefined' || document.documentMode < 8) {
                no_pos_fixed = true;
            }
        }
        //create hui container div
        if (no_pos_fixed == false) {
            hui_container = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
                name: 'div',
                attributes:
				{
				    id: 'tf_hui_container',
				    dir: 'ltr',
				    onselectstart: 'return false;'
				}
            });
            hui_container.style.position = "fixed";
        } else {
            hui_container = bd_nd_E893A5F3FE87409FB167F51A030D021C_DOM.create({
                name: 'div',
                attributes:
				{
				    id: 'tf_hui_container',
				    dir: 'ltr',
				    onselectstart: 'return false;'
				}
            });
        }
        hui_visible = false;
        isUntrustedSite = false;
        settings_visible = false;
        //check if this is an alert page
        if (typeof (bd_nd_issues_count) != "undefined") {
            isAlertPage = bd_nd_issues_count > 0 ? true : false;
        }
        isProductOn = (1 == bd_nd_E893A5F3FE87409FB167F51A030D021C_settings.getFeature(0).status ? true : false);

        if (typeof (bd_nd_untrusted) != "undefined" && bd_nd_untrusted) {
            isUntrustedSite = true;
        }
        if (isAlertPage || isUntrustedSite || bd_nd_whitelist) {
            hui_container.style.top = '0px';
            hui_visible = true;
        }

        document.body.appendChild(hui_container);
        if (isProductOn) {
            that.CreateStatus(isAlertPage ? STATUS_NOK : (isUntrustedSite ? STATUS_UNTRUSTED : (bd_nd_whitelist ? STATUS_NOK : STATUS_OK)));
        } else {
            that.CreateStatus(STATUS_DISABLED);
        }
        that.CreateTitle();
        that.CreateSeparator();

        var sandbox_available = that.IsSandBoxAvailable();
        var sandbox_tooltip = bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.tool_3_tooltip_xp;
        if (sandbox_available) {
            sandbox_tooltip = bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.tool_3_tooltip;
        }

        that.CreateTool("tooltip_sandbox", "<div id='nd_e506252a6b7649eb9640b54befbe7519_tooltip_sandbox_img'/>", sandbox_tooltip, that.OnTool3Click, sandbox_available);
        that.CreateSeparator();
        that.CreateTool("tooltip_settings", "<div id='nd_e506252a6b7649eb9640b54befbe7519_tooltip_settings_img'/>", bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.tool_settings_tooltip, that.OnTool4Click, true);
        that.CreateSeparator();

        that.CreateOnOff(isProductOn, "ON/OFF");
        that.CreateDragger(bd_nd_E893A5F3FE87409FB167F51A030D021C_strings.tool_dragger);
        that.CreateSettingsPage();
        //add click event for document to close hui on outside click
        bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onclick", bd_nd_E893A5F3FE87409FB167F51A030D021C_click_outside, document);

    } //end init
}

function bd_nd_E893A5F3FE87409FB167F51A030D021C_onOffChanged(index, status)
{
	var currentFeature = document.getElementById(bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.GetID('onoff'));
	if (null != currentFeature)
	{
		//update sender according to the new status
		if (1 == status)
		{
			currentFeature.className = bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.GetID('onoff') + " " + bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.GetID('onoff_on') + (bd_nd_supervisor ? "" : "_unavailable");
			bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.updateStatuses(status);
		}
		else
		if (0 == status)
		{
			currentFeature.className = bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.GetID('onoff') + " " + bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.GetID('onoff_off') + (bd_nd_supervisor ? "" : "_unavailable");
			bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.updateStatuses(status);
		}
	}
}

function bd_nd_E893A5F3FE87409FB167F51A030D021C_statusChanged(index, status)
{
	currentFeature = document.getElementById(bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.GetID(index));
	if (null != currentFeature) {
		//update sender according to the new status
		if (1 == status)
		{
			currentFeature.className = bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.GetID('settings_btn_status') + " " + bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.GetID('settings_btn_status_on');	
		}else
		if (0 == status)
		{
			currentFeature.className = bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.GetID('settings_btn_status') + " " + bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.GetID('settings_btn_status_off');
		}else
		{
			//error shit happend
		}
    }
}
function bd_nd_E893A5F3FE87409FB167F51A030D021C_click_outside(e)
{
	if (false == bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.IsHuiVisible())
	{
		//hui is not visible
		return;
	}
	var bd_nd_E893A5F3FE87409FB167F51A030D021C_target = bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.getEventTarget(e); 									
	var bd_nd_E893A5F3FE87409FB167F51A030D021C_id = bd_nd_E893A5F3FE87409FB167F51A030D021C_target.id;       
  
    if(bd_nd_E893A5F3FE87409FB167F51A030D021C_id.indexOf('tf_hui_container') != -1)
    {
		//the user clicked on HUI
		return;
    }

	while(typeof(bd_nd_E893A5F3FE87409FB167F51A030D021C_target.parentNode) != 'undefined' && bd_nd_E893A5F3FE87409FB167F51A030D021C_target.parentNode != null)
	{
		bd_nd_E893A5F3FE87409FB167F51A030D021C_target = bd_nd_E893A5F3FE87409FB167F51A030D021C_target.parentNode;
		bd_nd_E893A5F3FE87409FB167F51A030D021C_id = bd_nd_E893A5F3FE87409FB167F51A030D021C_target.id;
		
		if (bd_nd_E893A5F3FE87409FB167F51A030D021C_id != 'undefined' && bd_nd_E893A5F3FE87409FB167F51A030D021C_id != null)
		{			
			if(typeof(bd_nd_E893A5F3FE87409FB167F51A030D021C_id) == 'string' && bd_nd_E893A5F3FE87409FB167F51A030D021C_id.indexOf('tf_hui_container') != -1)
			{
				//the user clicked on a HUI child
				return;
			}			
		}
	}//end while
	//call on dragger click to close hui
	bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.OnDraggerClick(e);
}

if (!window.rwctrd)
{
	/*if (bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.getIEVersion() == -1)
	{
		bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.Init();
	}
	else
	{
		window.attachEvent("onload", bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.Init);
	}*/
	bd_nd_E893A5F3FE87409FB167F51A030D021C_evt.add("onload", bd_nd_E893A5F3FE87409FB167F51A030D021C_tfHUI.Init, window);
}