/*
 * URMET Sistemi S.p.A. 
 * i18nFlags.js
 *
 * Copyright (c) Urmet Sistemi S.p.A.
 * all rights reserved.
 *
 * THIS SOFTWARE IS OWNED BY URMET SISTEMI SPA.
 * THE PUBLICATION, REDISTRIBUTION OR MODIFY, COMPLETE OR PARTIAL OF CONTENTS, 
 * CAN BE MADE ONLY AFTER AUTHORIZATION BY THE AFOREMENTIONED COMPANIES 
 */

/*
 * USAGE:
 * put the following rows as needed:
 * 
 * 		<link rel="stylesheet" type="text/css" href="./css/flags.css" />
 * 
 * 
 */
(function($) {
	"use strict";
	$.i18nFlags = $.i18nFlags || {};
	
	var flagsArray = new Array(),
		allCountries = ['AF','AX','AL','DZ','AS','AD','AO','AI','AQ','AG','AR','AM','AW','AU','AT','AZ','BS',
	             'BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BA','BW','BV','BR','IO','BN','BG',
	             'BF','BI','KH','CM','CA','CV','KY','CF','TD','CL','CN','CX','CC','CO','KM','CG','CD',
	             'CK','CR','CI','HR','CU','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE',
	             'ET','FK','FO','FJ','FI','FR','GF','PF','TF','GA','GM','GE','DE','GH','GI','GR','GL',
	             'GD','GP','GU','GT','GG','GN','GW','GY','HT','HM','VA','HN','HK','HU','IS','IN','ID',
	             'IR','IQ','IE','IM','IL','IT','JM','JP','JE','JO','KZ','KE','KI','KP','KR','KW','KG',
	             'LA','LV','LB','LS','LR','LY','LI','LT','LU','MO','MK','MG','MW','MY','MV','ML','MT',
	             'MH','MQ','MR','MU','YT','MX','FM','MD','MC','MN','ME','MS','MA','MZ','MM','NA','NR',
	             'NP','NL','AN','NC','NZ','NI','NE','NG','NU','NF','MP','NO','OM','PK','PW','PS','PA',
	             'PG','PY','PE','PH','PN','PL','PT','PR','QA','RE','RO','RU','RW','SH','KN','LC','PM',
	             'VC','WS','SM','ST','SA','SN','RS','SC','SL','SG','SK','SI','SB','SO','ZA','GS','ES',
	             'LK','SD','SR','SJ','SZ','SE','CH','SY','TW','TJ','TZ','TH','TL','TG','TK','TO','TT',
	             'TN','TR','TM','TC','TV','UG','UA','AE','GB','US','UM','UY','UZ','VU','VE','VN','VG',
	             'VI','WF','EH','YE','ZM','ZW','EN'];
	
	$.extend($.i18nFlags,{
		version : "1.0.0",
		//
		//$.i18nFlags(options)
		//see directly below for possible 'options'
		i18nFlags: function (options) {
			
			// provide some reasonable defaults to any unspecified options below
			var settings = $.extend({
				//
				preparingMessageHtml : null,
			}, options);
			
//			if (this.tagName=='SELECT') {
//				this.empty();
//				for (i = 0; i < flagsArray.length; i++) { 
//				    var optionItem = "<option><img height='15' width='22' class='countryIcon country"+flagsArray[i]+"Icon'/>&nbsp;"+flagsArray[i]+"</option>";
//				    this.append(optionItem);
//				}
//			} 
		},
		getAccessor : function(obj, expr) {
			var ret,p,prm = [], i;
			if( typeof expr === 'function') { return expr(obj); }
			ret = obj[expr];
			if(ret===undefined) {
				try {
					if ( typeof expr === 'string' ) {
						prm = expr.split('.');
					}
					i = prm.length;
					if( i ) {
						ret = obj;
						while (ret && i--) {
							p = prm.shift();
							ret = ret[p];
						}
					}
				} catch (e) {}
			}
			return ret;
		},
		setFlag: function(ev) {
			var item = $("img.i18nFlagImg")
			item.each( function(i,f) {
				if ( ev.target.value.length==2)
					f.className="i18nFlagImg countryIcon country"+ev.target.value+"Icon";
				else
					f.className="i18nFlagImg";
			});
		},
		getMethod: function (name) {
	        return this.getAccessor($.fn.i18nFlags, name);
		},
		extend : function(methods) {
			$.extend($.fn.i18nFlags,methods);
			if (!this.no_legacy_api) {
				$.fn.extend(methods);
			}
		}
	});
	
	$.fn.i18nFlags = function( pin ) {
		if (typeof pin === 'string') {
			var fn = $.i18nFlags.getMethod(pin);
			if (!fn) {
				throw ("i18nFlags - No such method: " + pin);
			}
			var args = $.makeArray(arguments).slice(1);
			return fn.apply(this,args);
		}
		
		return this.each( function() {
							if(this.flags) {return;}
							
							// init default values
							var p = $.extend(true,{
								id: 'i18nFlag',
								size: 1,
								disabled: false,
								hidden: false,
								multiple: false,
								right: true,
								width: '70px',
								initValue: '',
								placeText: 'Select...',
								requestedCountry: '',
							}, $.i18nFlags.defaults, pin || {});
							
							var ts=this, flags= {
								// functions...
								setFlag: function(ev) {
									var item = $("img.i18nFlagImg");
									item.each( function(i,f) {
										if ( ev.target.value.length==2) {
											f.className="i18nFlagImg countryIcon country"+ev.target.value+"Icon";
											//$(f).show();
										} else {
											f.className="i18nFlagImg";
											//$(f).hide();
										}
									});
								},
								validateCountry: function() {									
									//to upper case..
									p.initValue = (p.initValue+"").toUpperCase();
									if (flagsArray.indexOf(p.initValue)==-1) {
										if ( p.initValue.length>0 ) {
											alert("No such country: ["+p.initValue+"] !")
										}
										p.initValue='';										
									}
								},
								updateFlag: function() {
									$("select.i18nFlags").val(p.initValue);
									var evData = {
										target: { value: p.initValue }
									};
									flags.setFlag(evData);
								}
								
							};
							
							if(this.tagName.toUpperCase()!='SELECT') 
							{
								alert("Element is not a select");
								return;
							}
							if(document.documentMode !== undefined ) { // IE only
								if(document.documentMode <= 5) {
									alert("i18nFlags can not be used in this ('quirks') mode!");
									return;
								}
							}

							// initialization...
							this.p = p;
							this.p.useProp = !!$.fn.prop;
							
							// setting the flagsArray
							var a = new Array();
							if (p.requestedCountry.length>0) {
								if ( typeof  p.requestedCountry === 'string' ) {
									a = p.requestedCountry.split(',');	
								} else {
									a = p.requestedCountry;
								}
								flagsArray.length=0;	// clean the array
								for ( var j=0; j<a.length; j++ )
								{
									if ( allCountries.indexOf(a[j])!=-1 ) {
										flagsArray.push( a[j] );	
									}
								}
							} else {
								flagsArray= allCountries;
							}
							
							//$(this).empty().attr("tabindex","0");
							// init the select item
							$(this).attr("width",p.width);
							$(this).addClass("i18nFlags");
							
							$(this).empty();
							
							// insert the first item
							if ( p.placeText.length>0 ) {
								$(this).append($("<option style='padding-left:0px;' value=''>"+p.placeText+"</option>")).attr('selected',true);
							}
							
							// validate the country code
							flags.validateCountry();
							
							// insert all the country
							for (var i = 0; i < flagsArray.length; i++) { 
								var selected=(p.initValue==flagsArray[i]);
								var optionItem = $("<option class='country"+flagsArray[i]+"Icon' value="+flagsArray[i]+">&nbsp;"+flagsArray[i]+"&nbsp;</option>").attr('selected',selected);
								$(this).append(optionItem[0]);
							}
							
							// sorting the country options..
							var my_options = $(this).find("option");
							my_options.sort(function(a,b) {
							    return a.value.localeCompare(b.value);
							});
							$(this).empty().append( my_options );
							
							// add an image tag for the flag
							$("img.i18nFlagImg").each( function(i){ $(this).remove(); } );
							//$(this).after("&nbsp;&nbsp;<img width='22' height='15' class='i18nFlagImg' id='i18nFlag'/>");
							if ( p.right ) {
								$(this).after("&nbsp;<img width='22' height='15' class='i18nFlagImg' id='"+p.id+"'/>");
							}
							else {
								$(this).before("<img width='22' height='15' class='i18nFlagImg' id='"+p.id+"'/>&nbsp;");	
							}
							
							// insert the event handler on change
							$(this).on("change", null, null, flags.setFlag);
							
							// select the default value
							var evData = {
								target: { value: p.initValue } 	
							};
							flags.setFlag(evData);
							
							// terminate initialization...
							this.flags = flags;
						});
	};
	
	$.i18nFlags.extend( {
		getParamValue: function(pName) {
			var $t = this[0];
			if (!$t || !$t.flags) {return;}
			if (!pName) { return $t.p; }
			return $t.p[pName] !== undefined ? $t.p[pName] : null;
		},
		setParamValue : function (newParams){
			return this.each(function(){
				if (this.flags && typeof newParams === 'object') {$.extend(true,this.p,newParams);}
			});
		},
		setFlagValue : function (newFlag){
			return this.each(function(){
				if (this.flags && typeof newFlag === 'string') {
					this.p.initValue = newFlag;
					this.flags.validateCountry();
					this.flags.updateFlag();
				}
			});
		},
		reset: function() {
			return this.each(function(){
				if (this.flags) { 
					this.p.initValue = '';
					this.flags.updateFlag();
				}
			});
		},
		showFlag: function(countryCode, options) {
			return this.each(function(){
				if (this.tagName.toUpperCase()=='IMG' 
					&& typeof countryCode === 'string' && countryCode.length==2) {
					// set the image of the flag
					this.width=22;
					this.height=15;
					this.className="i18nFlagImg countryIcon country"+countryCode.toUpperCase()+"Icon";
					if ( options ) {
						var p1 = $.extend(p1,{
							id: 'i18nLbl',
							labelEnabled: false,
							right: true,
							labelClass: '',
						}, $.i18nFlags.defaults, options || {});
						
						$(this).siblings("label#"+p1.id+".i18nFlagLbl").each( function(i){ this.remove(); } );
						if (p1.labelEnabled) {
							// add the label							
							if ( p1.right ) {
								$(this).after("&nbsp;<label class='i18nFlagLbl "+p1.labelClass+"' id='"+p1.id+"'>"+countryCode+"</label>");
							}
							else {
								$(this).before("<label class='i18nFlagLbl "+p1.labelClass+"' id='"+p1.id+"'>"+countryCode+"</label>&nbsp;");	
							}
						}
					}
					return;
				} else {
					alert("This method is allowed only to IMG html tag!");
				}
					
			});
		}
	})
	
	})(jQuery, this);