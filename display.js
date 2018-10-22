function displayEvent() {
  var year = currentMonth.year;
  var month = currentMonth.month+1;
  var dataString = "month=" + encodeURIComponent(month) + "&year=" + encodeURIComponent(year)+ "&token=" + encodeURIComponent(token);
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "event_ajax.php", true);
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttp.addEventListener("load", function(event){
    var jsonData = JSON.parse(event.target.responseText);
      var numOfEvents = jsonData.length;
      if (numOfEvents !== 0) {
        jsonData.forEach(function(dis_event){
          var disEvent=dis_event;
          var event_id = disEvent.id;
          var eventcontent = disEvent.name;
          var day = disEvent.day;
          var time = disEvent.time;
          var day_id = "day"+day;
          var tag = disEvent.tag;
          var color;
          switch (tag){
            case "B":
              color = "success";
              break;
            case "F":
              color = "warning";
              break;
            case "S":
              color = "primary";
              break;
            case "N":
              color = "dark";
              break;
            default:
              break;
          }
          var showcontent = "<div class='events_display'><div class='btn-group'>";
          showcontent += "<button type='button' class='btn btn-"+ color +"' id='event"+event_id+"'>"+eventcontent+"</button>";
          showcontent += "<button type='button' class='btn btn-"+ color + " dropdown-toggle dropdown-toggle-split' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><span class='sr-only'>Toggle Dropdown</span></button>";
          showcontent += "<div class='dropdown-menu'><a class='dropdown-item'><button id='edit"+event_id+"' onClick='edit_event("+event_id+")'>Edit</button><div class='edit_input'><input type='text' size='15' name='name' id='edit_name" + event_id + "' placeholder='name' value='" + eventcontent + "' required/><input type='number' max='9999' min='1' size='10' id='edit_year"+ event_id + "' name='year' value='"+ year+ "' placeholder='year' required/><input type='number' max='12' min='1' size='10' id='edit_month"+ event_id + "' name='month' value='"+ month+ "' placeholder='month' required/><input type='number' max='31' min='1' size='10' id='edit_day"+ event_id + "' name='day' value='"+ day+ "' placeholder='day' required/><input type='time' id='edit_time"+ event_id + "' name='time' value='"+ time+ "' placeholder='time' required/><select name='tag' id='edit_tag"+ event_id +"'><option value='N'>None</option><option value='B'>Business</option><option value='F'>Family</option><option value='S'>School</option></select></div></a>";
		  
          showcontent += "<a class='dropdown-item'><button id='delete"+event_id+"' onClick='delete_event("+event_id+")'>Delete</button></a><div class='dropdown-divider'></div>";
          showcontent += "<a class='dropdown-item'><button id='share"+event_id+"' onClick='share_event("+event_id+")'>share to</button><input type='text' size='15' name='share_username' id='share_username" + event_id + "' placeholder='username' required/><div class='dropdown-divider'></div></a>";
		  
          showcontent += "<a class='dropdown-item'>Time for this event: "+time+" </a>";
          showcontent += "</div></div></div>";
		  $('.dropdown-menu select').click(function(e){
			e.stopPropagation();
		  });
          if (document.getElementById(day_id)){
            document.getElementById(day_id).innerHTML += showcontent;
          }
        });
      }
  }, false);
  xmlHttp.send(dataString);
} 

//<select name="tag" id="tag"><option value="N">None</option><option value="B">Business</option><option value="F">Family</option><option value="S">School</option></select>
//<input type='text' size='15' name='to' id='share_username" + event_id + "' placeholder='username' required/>