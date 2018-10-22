var dataAuthString = "";
var xmlHttp = new XMLHttpRequest();
xmlHttp.open("POST", "auth.php", true);
xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xmlHttp.addEventListener("load", function(event){
	var jsonData = JSON.parse(event.target.responseText);// parse the JSON into a JavaScript object
	if(jsonData.success){
		token = jsonData.token;
		$("#user_display").html("Hi, ");
		$("#user_display").append(jsonData.username);
		$("#login").hide();
		$("#logout").show();
		$("#addevent").show();
		updateCalendar();
	}else{
		$("#user_display").html("Hi, please log in");
		$("#login").show();
		$("#logout").hide();

		$("#addevent").hide();
		$("#shareEvents").hide();
	}
}, false);
xmlHttp.send(dataAuthString);


function loginAjax(event){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "login_ajax.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){//login successfully
			token = jsonData.token;
			$("#user_display").html("Hi ");
			$("#user_display").append(jsonData.username);
			$("#login").hide();
			$("#logout").show();
			$("#addevent").show();
			updateCalendar();
		}else{
			alert("Login falied.  "+jsonData.message);
		}
	}, false);
	xmlHttp.send(dataString);
}

document.getElementById("login_btn").addEventListener("click", loginAjax, false);

function registerAjax(event){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value; 
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "register_ajax.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){//register successfully
			token = jsonData.token;
			$("#user_display").html("Hello, ");
			$("#user_display").append(jsonData.username);
			$("#login").hide();
			$("#logout").show();
			$("#addevent").show();
			updateCalendar();
		}else{
			alert("Registration failed.  "+jsonData.message);
		}
	}, false);
	xmlHttp.send(dataString);
}
document.getElementById("register_btn").addEventListener("click", registerAjax, false); 

function logoutAjax(event){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "logout_ajax.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){//Logout successfully
			$("#user_display").html("Logging out successfully,now please log in");
			$("#login").show();
			$("#logout").hide();
			$(".events_display").html("");
			$("#addevent").hide();
			$('#token').val("");
		}else{
			alert("Logging out failed.  "+jsonData.message);
		}
	}, false);
	xmlHttp.send();
}
document.getElementById("logout_btn").addEventListener("click", logoutAjax, false); 


function addEventAjax(event){
	var date = document.getElementById("date").value;
	var month = date.toString().substring(0,2);
	var day = date.toString().substring(3,5);
	var year = date.toString().substring(6);
	
	var time = document.getElementById("time").value;
	var events = document.getElementById("events").value;
	var tag = document.getElementById("tagtag").value;
	var dataString = "events=" + encodeURIComponent(events) + "&time=" + encodeURIComponent(time) + "&day=" + encodeURIComponent(day) + "&month=" + encodeURIComponent(month) + "&year=" + encodeURIComponent(year)+"&tag="+encodeURIComponent(tag)+"&token="+encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "insert_ajax.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){	
			updateCalendar();
		}else{
			alert("Addition failed.  "+jsonData.message);
		}
	}, false);
	xmlHttp.send(dataString);
}
document.getElementById("add_btn").addEventListener("click", addEventAjax, false);

function addpublicEventAjax(event){
	var date = document.getElementById("date").value;
	var month = date.toString().substring(0,2);
	var day = date.toString().substring(3,5);
	var year = date.toString().substring(6);
	
	var time = document.getElementById("time").value;
	var events = document.getElementById("events").value;
	var tag = document.getElementById("tagtag").value;
	var dataString = "events=" + encodeURIComponent(events) + "&time=" + encodeURIComponent(time) + "&day=" + encodeURIComponent(day) + "&month=" + encodeURIComponent(month) + "&year=" + encodeURIComponent(year)+"&tag="+encodeURIComponent(tag)+"&token="+encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "insertPublic_ajax.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){	
			updateCalendar();
		}else{
			alert("Addition failed.  "+jsonData.message);
		}
	}, false);
	xmlHttp.send(dataString);
}
document.getElementById("addtopublic_btn").addEventListener("click", addpublicEventAjax, false);

function edit_event(event_id){
	var name = document.getElementById("edit_name"+event_id).value;
	var year = document.getElementById("edit_year"+event_id).value;
	var month = document.getElementById("edit_month"+event_id).value;
	var day = document.getElementById("edit_day"+event_id).value;
	var time = document.getElementById("edit_time"+event_id).value;
	var tag = document.getElementById("edit_tag"+event_id).value;
	var dataString = "event_id=" + encodeURIComponent(event_id) + "&year=" + encodeURIComponent(year)  + "&month=" + encodeURIComponent(month)+ "&day=" + encodeURIComponent(day)+ "&time=" + encodeURIComponent(time)+ "&tag=" + encodeURIComponent(tag)+ "&name=" + encodeURIComponent(name)+ "&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest();
	console.log(dataString);
	xmlHttp.open("POST", "edit_ajax.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){
			updateCalendar();
		}else{
			alert("Editting failed.  "+jsonData.message);
		}
	}, false);
	xmlHttp.send(dataString);
}

function delete_event(event_id){
	var dataString = "event_id=" + encodeURIComponent(event_id)+"&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "delete_ajax.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){
			updateCalendar();
		}else{
			alert("Failed to delete an event.  "+jsonData.message);
		}
	}, false);
	xmlHttp.send(dataString);
}




function share_event(event_id){
	var shared_user;
	if (document.getElementById("share_username"+event_id)){
		shared_user = document.getElementById("share_username"+event_id).value;
	}
	var dataString = "to=" + encodeURIComponent(shared_user) + "&id=" + encodeURIComponent(event_id)+ "&token=" + encodeURIComponent(token);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "share_ajax.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){
			alert("Share successfully!");
			updateCalendar();
		}else{
			alert("Failed to share events.  "+jsonData.message);
		}
	}, false);
	xmlHttp.send(dataString);
}



