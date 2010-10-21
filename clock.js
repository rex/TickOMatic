// First, create our big interval variable
var clock_interval;
var background;
var bgRotate;
var hr = $("#clock_hour");
var mi = $("#clock_minute");
var se = $("#clock_second");

function init() {
	var hr = $("#clock_hour");
	var mi = $("#clock_minute");
	var se = $("#clock_second");
	console.log("Initializing timer...");
	var min = $("#total_minutes").text();
	console.log("Requested time: " + min + " minutes.");
	console.log("H/M/S - " + hr.text() + "/" + mi.text() + "/" + se.text());
	
	// Start the timer with the desired total time.
	var mil = minToSec(min);
	hr.text(time_format(Math.floor(mil / 3600)));
	mi.text(time_format(Math.floor((mil - (hr.text() * 3600)) / 60)));
	se.text("00");
	
	console.log("H/M/S - " + hr.text() + "/" + mi.text() + "/" + se.text());
	
	console.log("Setting clock interval...");
	setClockInterval();
	
	console.log("Setting background...");
	setBgInterval();
}

function setBgInterval() {
	
	console.log("Beginning the background interval change...");
	var bgInterval = $("#bg_interval").val();
	var curBg = $("#current_bg").text();
	var insetBgIntervalTime = $("#bg_interval_time").text();
	var bgRotateToggle = $("#bg_rotate");
	var bgIntervalSet = $("#bg_interval_set");
	
	console.log("bgInterval = " + bgInterval + " , inset = " + insetBgIntervalTime);
	if(bgRotateToggle.attr("checked")) {
		if(bgInterval != insetBgIntervalTime || bgIntervalSet.text() == "0") {	
			clearInterval(background);
			background = setInterval(function() {
				var newBgNum = Math.floor(Math.random() * 10);
				console.log(bgInterval + " - " + newBgNum);
				changeBg(newBgNum);
			},bgInterval * 1000);
			$("#bg_interval_time").text(bgInterval);
			bgIntervalSet.text("1");
		}
	}
}

function setClockInterval() {
	console.log("Initializing clock interval...");
	clock_interval = setInterval(function() {
	var hr = $("#clock_hour");
	var mi = $("#clock_minute");
	var se = $("#clock_second");
	var hours = hr.text();
	var minutes = mi.text();
	var seconds = se.text();
		console.log("Hours/Min/Sec = " + hours + "/" + minutes + "/" + seconds);
		if((hours == 'Hr') || (minutes == 'Min') || (seconds == 'Sec')) {
			console.log("Time is not a number right now, changing to initial time.");
			var mil = minToSec(min);
			hr.text(time_format(Math.floor(mil / 3600)));
			mi.text(time_format(Math.floor((mil - (hr.text() * 3600)) / 60)));
			se.text("00");
		} else {
			var h = parseFloat(hours);
			var m = parseFloat(minutes);
			var s = parseFloat(seconds);
			
			console.log(h + ":" + m + ":" + s);
			if(s == 0) {
				console.log("S = 0");
				if(m > 0) { // More minutes on the clock.
					mi.text(time_format(m - 1));
					se.text("59");
				} else if(h > 0) {  // Minutes out for the hour. Change hours into minutes, etc.
					hr.text(time_format(h - 1));
					mi.text("59");
					se.text("59");
				} else if(h == 0) { // Clock is out. Do something cool.
					//alert('clock is out!');
					timeUp();
					return;
				}
				updateTitle();
			} else {
				se.text(time_format(s - 1));
				updateTitle();
			}
		}
		setBgInterval();
	},1000);
}

function updateTitle() {
	var hour = $("#clock_hour").text();
	var min = $("#clock_minute").text();
	var sec = $("#clock_second").text();
	
	$("title").text(hour + ":" + min + ":" + sec + " - Ticking Clock");
}

function time_format(num) {
	if(num.toString().length == 1) {
		return "0" + num;
	} else {
		return num;
	}
}

function minToSec(min) {
	return min * 60;
}

function confirmTimeChange() {
	return confirm("Are you sure you want to change the time clock?");
}

function changeBg(num) {
	if( $("#bg_rotate").attr("checked") == true ) {
		bgRotate = true;
	} else {
		bgRotate = false;
	}
	console.log(bgRotate + " - " + $("#bg_rotate").attr("checked"));
	var overlaySet = $("#bg_overlay_set").text();
	if( bgRotate == true) {
		console.log("Changing Background Image to Image '" + num + ".jpg'.");
		console.log("OverlaySet = " + overlaySet);
		if(overlaySet == 0) {
			$("#bg_overlay_set").text(1);
			$("#bg_overlay").css("background","url('images/" + num + ".jpg') no-repeat center").fadeIn(2000);
		} else if(overlaySet == 1) {
			$("#bg_overlay_set").text(0);
			$("body").css("background","url('images/" + num + ".jpg') no-repeat center");
			$("#bg_overlay").fadeOut(2000);
		}
		/*$("#black_shade").css("width","100%").css("height","100%").fadeIn("slow",function() {
			$("body").css("background","url('images/" + num + ".jpg') no-repeat center");
		});
		$("#black_shade").fadeOut("slow");	*/
	}
}

function timeUp() {
	resetClock(false);
	// Do the cool stuff that we do when the clock dies.
	alert("Your time is up! Time to switch it up!");
	return true;
}

function resetClock(restart) {
	clearInterval(clock_interval);
	clearInterval(background);
	if(restart == true) {
		init();
	}
}

function exit() {
	//return confirm("Are you sure that you want to leave? Leaving will stop the timer!");
	return true;
}
