

function log_to_console(message){console.log("ResetKiva: " + message);};


//this dictionary hardcoded devices to run against and needed to be sanitzed

var station_name_dictionary = {

    'station number':'hostname'
}

 function add_ssh_link(){

    for (var i=0; i<document.getElementsByClassName("summit-link-style").length ; i++){

        var stationnumber
        var stationid
        var username

        if((document.getElementsByClassName("summit-link-style")[i].innerText).match(/\[STL8-paKivaA0[0-9]\] - [0-9].*/)){
            stationnumber = (document.getElementsByClassName("summit-link-style")[i].innerText.match(/\[STL8-paKivaA0[0-9]\] - ([0-9]*).*/)[1]);
            stationid = "Station-" + stationnumber
            username = document.getElementsByName('user')[0].content + "@"
            document.getElementsByClassName("summit-link-style")[i].parentNode.innerHTML = document.getElementsByClassName("summit-link-style")[i].parentNode.innerHTML + "<a id=\"Station-" + stationnumber + "\" name=\"SSHbutton\" class=\"tt_button orange_button\" href=\"ssh://" + username + station_name_dictionary[stationid] + "\">Quick SSH</a>"

        }



    }

    for (var i=0; i<document.getElementsByName('SSHbutton').length; i++){


            document.getElementsByName('SSHbutton')[i].style.paddingTop = "3px"
            document.getElementsByName('SSHbutton')[i].style.paddingLeft = "10px"
            document.getElementsByName('SSHbutton')[i].style.paddingRight = "10px"
            document.getElementsByName('SSHbutton')[i].style.float = "right"
            document.getElementsByName('SSHbutton')[i].style.font = "normal normal bold 5px"
            document.getElementsByName('SSHbutton')[i].style.marginBottom = "5px"

    }


 }

 function add_button_event(){

    for(var i=0; i<document.getElementsByName('SSHbutton').length;i++){

        var stationid = document.getElementsByName('SSHbutton')[i].id
        document.getElementById(stationid).addEventListener('click', (e)=>{
                            e.preventDefault();
                            document.getElementById(stationid).parentElement.childNodes[1].click();
                            window.open("ssh://" + document.getElementsByName('user')[0].content + "@" + station_name_dictionary[stationid],"_self")})
        

}


 }


 function check_for_wip(callback){

    var get_element_interval = setInterval(function(){

        try{

            if(document.getElementById('action_bar').childNodes[1].childNodes[4] == null || document.getElementById('action_bar').childNodes[1].childNodes[4] === undefined){log_to_console("WIP doesnt exist");}
        else if (document.getElementById('action_bar').childNodes[1].childNodes[4]){log_to_console("WIP exists");

            if(!(document.getElementById('assigned_individual').value != 'stl8-it') && !(document.getElementById('resolution').value != "")){
                clearInterval(get_element_interval);
                callback();}
            else{throw new Exception()}
            
          }
        }
        catch{console.log("This page does not have the requirments to select WIP")}

        

    }, 1000);
}


add_ssh_link()
add_button_event()

/* try{
    if(document.getElementById('action_bar')){check_for_wip(function(){document.getElementById('action_bar').childNodes[1].childNodes[4].click()})}
     }
catch{console.log("cant find action bar")}

 */