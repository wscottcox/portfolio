// HPWEB JAVASCRIPT hpweb_utilities.js VERSION 1.0

// Files and directory structures

// The cssDir variable is provided externally, using the snfBase setting
// var cssDir = "country/us/eng/styles/";

var stylePrefix = "";
var typeof_is_printable = new String(typeof(is_printable));
if (typeof_is_printable.indexOf("undefined") == -1 && is_printable==true)
{
	stylePrefix = "print_";
}
	var NS4CSS = "hpweb_styles_ns4.css";
	var winIECSS = "hpweb_styles_win_ie.css";
	var winIE6CSS = "hpweb_styles_win_ie6.css";
	var strdCSS = "hpweb_styles_strd.css";

	// *************************************************************
	//  CLIENT_SIDE SNIFFER CODE
	// *************************************************************
	// convert all characters to lowercase to simplify testing
	var agt=navigator.userAgent.toLowerCase();

	// *** BROWSER VERSION ***
	// Note: On IE5, these return 4, so use is_ie5up to detect IE5.
	var is_major = parseInt(navigator.appVersion);
	var is_minor = parseFloat(navigator.appVersion);

	// *** BROWSER TYPE ***
	var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
	            && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
	            && (agt.indexOf('webtv')==-1));
	var is_nav4 = (is_nav && (is_major == 4));
	var is_nav5 = (is_nav && (is_major == 5));
	var is_nav5up = (is_nav && (is_major >= 5));
	var is_nav6 = (is_nav && (is_major == 6));
	var is_nav4up = (is_nav && (is_major >= 4));
	var is_nav6up = (is_nav && (is_major >= 6));
	var is_ie   = (agt.indexOf("msie") != -1);
	var is_ie3  = (is_ie && (is_major < 4));
	var is_ie4  = (is_ie && (is_major <= 4) && (agt.indexOf("msie 5.0")==-1) );
	var is_ie5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) );
	var is_ie5up  = (is_ie  && !is_ie3 && !is_ie4);
	var is_ie6    = (is_ie && (is_major == 4) && (agt.indexOf("msie 6.")!=-1) );
	var is_opera = (agt.indexOf("opera") != -1);

	// *** PLATFORM ***
	var is_win   = ( (agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1) );
	var is_mac    = (agt.indexOf("mac")!=-1);
	var is_sun   = (agt.indexOf("sunos")!=-1);
	var is_irix  = (agt.indexOf("irix") !=-1);    // SGI
	var is_hpux  = (agt.indexOf("hp-ux")!=-1);
	var is_aix   = (agt.indexOf("aix") !=-1);      // IBM
	var is_linux = (agt.indexOf("inux")!=-1);
	var is_sco   = (agt.indexOf("sco")!=-1) || (agt.indexOf("unix_sv")!=-1);
	var is_unixware = (agt.indexOf("unix_system_v")!=-1);
	var is_mpras    = (agt.indexOf("ncr")!=-1);
	var is_reliant  = (agt.indexOf("reliantunix")!=-1);
	var is_dec   = ((agt.indexOf("dec")!=-1) || (agt.indexOf("osf1")!=-1) ||
	       (agt.indexOf("dec_alpha")!=-1) || (agt.indexOf("alphaserver")!=-1) ||
	       (agt.indexOf("ultrix")!=-1) || (agt.indexOf("alphastation")!=-1));
	var is_sinix = (agt.indexOf("sinix")!=-1);
	var is_freebsd = (agt.indexOf("freebsd")!=-1);
	var is_bsd = (agt.indexOf("bsd")!=-1);
	var is_unix  = ((agt.indexOf("x11")!=-1) || is_irix || is_sco ||
	is_unixware || is_mpras || is_reliant ||
	             is_dec || is_sinix || is_aix || is_bsd || is_freebsd);

	// Load stylesheet
	ChooseStyleSheet();

// Handle Navigator 4 window resizing
if (is_nav4up && !is_nav5up) {
   var initWidth, initHeight;
   initWidth = window.innerWidth;
   initHeight = window.innerHeight;
   window.captureEvents(Event.RESIZE);
   window.onresize = handleResize;
}


// *********************************************************************
//  UTILITY FUNCTIONS
// *********************************************************************
// Function to handle window resizing on Navigator 4
function handleResize() {
   if (((initWidth != window.innerWidth) || (initHeight != window.innerHeight)) && (typeof disableReload == "undefined")) {
     location.reload();
   }
   return false;
}

// Function to choose the style sheet for use based on the platform
	// and browser version
	function ChooseStyleSheet() {
	  var fileHead = cssDir;
	  var styles;
	  if (is_win) {
		if (is_nav4) {
	      styles = fileHead + NS4CSS;
		} else if (is_ie6) {
		  styles = fileHead + winIE6CSS;		  
		} else if (is_nav5up) {
		  styles = fileHead + strdCSS;		  
		} else if (is_opera) {
		  styles = fileHead + strdCSS;		  
		} else {
		  styles = fileHead + winIECSS;
		}
	  } else if (is_mac) {
	      if (is_nav) {
	        styles = fileHead + strdCSS;
		  } else {
		    styles = fileHead + strdCSS;
		  }
	  } else if (is_linux) {
	      if (is_nav4) {
            styles = fileHead + NS4CSS;
		  } else if (is_nav) {
            styles = fileHead + strdCSS;
		  } else {
		    styles = fileHead + strdCSS;
		  }
	  } else if (is_hpux) {
	      if (is_nav4) {
            styles = fileHead + NS4CSS;
		  } else if (is_ie5) {
	        styles = fileHead + winIECSS;
		  } else {
		    styles = fileHead + strdCSS;
		  }
	  } else if (is_sun) {
	      if (is_nav4) {
	        styles = fileHead + NS4CSS;
		  } else {
		    styles = fileHead + strdCSS;
		  }
	  }  else {
		styles = fileHead + strdCSS;
	  }
	  document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + styles + "\">");
	  return true;
	}

	// Function to jump to a URL in a <select> menu
	//  In this case, the name of the array containing the URLs
	//  is determined based on the name of the pulldown menu.
	function jumpToURL(formName,menuName) {
	 var obj = eval("document." + formName + "." + menuName);
	 var index = obj.selectedIndex;
	 var url = eval(menuName + "_URLs[" + index + "]");
	 if (url != "") {
	   location.href=url;
	 }
	}
