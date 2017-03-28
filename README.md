# Js-i18nFlags
i18n plugin in javascript to integrate flags and internalization control

# 28 march 2017

INSTALL
The plugin is made of 3 files and they must be put in the following sub tree:

  js/i18nFlags.js
  css/flags.css
  css/images/flags.png

CONFIGURATION
Before use them, you must include the jquery script files (jquery-ui-1.8.custom.css,jquery-ui-1.10.0.custom.css,jquery-1.11.3.min.js, jquery-migrate-1.2.1.min.js, jquery-ui.min.js, ...).


EXAMPLES
There are some cases of use in the following text.

Example 1: the select control

After the following HTML code:

	<select id="flagsSelector" class="text ui-widget-content ui-corner-all"></select>

you can write in javascript block:

	<script type="text/javascript">
		var countryCode = 'it';
		$("#flagsSelector").i18nFlags({
      placeText: "Seleziona...", 
      requestedCountry: jQuery.i18n.prop("application.languages")
      })
		.i18nFlags("setFlagValue", countryCode)
		.on("change", function() { 
 			changeLang(this.value,'3'); 
 			// must reload all!!
 			//TODO : because the menu must be reloaded also with the led and user panel
 			location.reload(); 
      });   		
	</script>

Example 2: the flag image

After the following HTML code:

	<img id="countryUser" />

you can write in javascript block:

	<script type="text/javascript">
	  $("#countryUser").i18nFlags("showFlag", 'it', {labelEnabled: true});
	</script>

   
