
function log_to_console(message){console.log("TTticketTemplate: " + message);};

function create_selector_option(){

    
    var TTselector = document.createElement('div');
        TTselector.innerHTML = "\
        <label>Select a template</label><br>\
        <select id=\"TTtemplate\" style=\"display: block;\"></select>\
        _____________________________________\
        <br><br>";

        //TTselector.className = "dynamic_select_holder";
        TTselector.style.marginTop = "10px";
        TTselector.style.display = "block";
        
        


    var TTsubmit = document.createElement('div');
        TTsubmit.innerHTML = "<a id=\"TTsubmit\" class=\"tt_button orange_button \" type=\"button\"><span>Use Template</span></a>";
    
        TTsubmit.style.marginTop = "10px";
        
    

    var TTgettemp = document.createElement('div');
        TTgettemp.innerHTML = "<a id=\"TTgettemp\" class=\"tt_button orange_button \" type=\"button\"><span>Create Template</span></a>";
        

    var TTdeletetemplate = document.createElement('div');
        TTdeletetemplate.innerHTML = "<a id=\"TTdeletetemp\" class=\"tt_button orange_button \" type=\"button\"><span>Delete</span></a>";  
        

    var TTtempname = document.createElement('input');
        TTtempname.id = "TTtempname";
        TTtempname.type = "text";
        TTtempname.className = "gray_text";
        TTtempname.placeholder = "New Template Name";
        TTtempname.style.marginTop = "5px";
        

if(window.location.href != '  '){ 
    
    TTselector.style.marginLeft= "5px";
    TTsubmit.style.marginLeft = "5px";
    TTgettemp.style.marginLeft = "5px";
    TTdeletetemplate.style.marginLeft = "5px";
    TTtempname.style.marginLeft = "5px";

    document.getElementById('left_nav').childNodes[1].insertBefore(TTselector, document.getElementById('left_nav').childNodes[1].childNodes[1]);
    document.getElementById('left_nav').childNodes[1].insertBefore(TTgettemp, document.getElementById('left_nav').childNodes[1].childNodes[1]);
    document.getElementById('left_nav').childNodes[1].insertBefore(TTsubmit, document.getElementById('left_nav').childNodes[1].childNodes[1]); 
    document.getElementById('left_nav').childNodes[1].insertBefore(TTtempname, document.getElementById('left_nav').childNodes[1].childNodes[3]);
    document.getElementById('left_nav').childNodes[1].insertBefore(TTdeletetemplate, document.getElementById('TTtempname'));
}
else if(window.location.href == '  '){
    TTselector.style.marginLeft= "10px";
    TTsubmit.style.marginLeft = "10px";
    TTgettemp.style.marginLeft = "10px";
    TTdeletetemplate.style.marginLeft = "10px";
    TTtempname.style.marginLeft = "10px";

    document.getElementsByTagName('table')[0].parentElement.insertBefore(TTselector, document.getElementsByTagName('table')[0].parentElement.childNodes[5])
    document.getElementsByTagName('table')[0].parentElement.insertBefore(TTtempname, document.getElementsByTagName('table')[0].parentElement.childNodes[5])
    document.getElementsByTagName('table')[0].parentElement.insertBefore(TTdeletetemplate, document.getElementsByTagName('table')[0].parentElement.childNodes[5])
    document.getElementsByTagName('table')[0].parentElement.insertBefore(TTgettemp, document.getElementsByTagName('table')[0].parentElement.childNodes[5])
    document.getElementsByTagName('table')[0].parentElement.insertBefore(TTsubmit, document.getElementsByTagName('table')[0].parentElement.childNodes[5])
}
    

}

function check_template_exists(){

    if(!localStorage.getItem('TTtickettemplates')){localStorage.setItem('TTtickettemplates', JSON.stringify(new Array('self')));return false;}
    else{return true;}

}

function get_template(){

    if(window.location.href != '  '){

        let template = JSON.parse(localStorage.getItem('TTtickettemplates'));
        let templatename = document.getElementById('TTtempname').value;
    
        let status = document.getElementById('status').value;

        let closurecode = document.getElementById('closure_code').value;
        let pendingreason = document.getElementById('pending_reason').value;
        let impact = document.getElementById('impact').value;
        
        let rootcause = document.getElementById('root_cause').value;
        let rootcausedetails = document.getElementById('root_cause_details').value;

        let resolution = document.getElementById('resolution').value;

        let category = document.getElementById('category').value;
        let type = document.getElementById('type').value;
        let item = document.getElementById('item').value;
        let assignedgroup = document.getElementById('assigned_group').value;
        let assignedindividual = document.getElementById('assigned_individual').value;
        let sensitivecheck = document.getElementById('sensitive_checkbox').checked;
        let conversionconfirm = document.getElementById('ticket_conversion_confirmation').checked;
        let buildingid = document.getElementById('building_id').value;
        let case_type = document.getElementById('case_type').value;

        let correspondence = document.getElementById('correspondence').value;
        let worklog = document.getElementById('work_log').value;

        let newtemplate = new Array(templatename, status, closurecode, pendingreason, impact, rootcause, rootcausedetails, resolution, category, type, item, assignedgroup, assignedindividual, sensitivecheck, conversionconfirm, buildingid, case_type, correspondence, worklog);

        add_template(newtemplate, template);

    }else if(window.location.href == '  '){

        let template = JSON.parse(localStorage.getItem('TTtickettemplates'));
        let templatename = document.getElementById('TTtempname').value;

        let impact = document.querySelector('#impact').value

        let category = document.querySelector('#category').value;
        let type = document.querySelector('#type').value;
        let item = document.querySelector('#item').value;
        let assignedgroup = document.querySelector('#assigned_group').value;
        let assignedindividual = document.querySelector('#assigned_individual').value;
                
        let country = document.querySelector('#country').value;
        let buildingid = document.querySelector('#building_id').value;
        let problem_location = document.querySelector('#problem_location').value;
        let case_type = document.querySelector('#case_type').value;

        let short_description = document.querySelector('#short_description').value;
        let details_body = document.querySelector('#details').value;
        let cc_list = document.querySelector('#cc_list').value;
        let tags = document.querySelector('#tags').value;
        

        let newtemplate = new Array(templatename, impact, category, type, item, assignedgroup, assignedindividual, country, buildingid, problem_location, case_type, short_description, details_body, cc_list, tags);

        add_template(newtemplate, template);

    }

    

    function add_template(newtemplate, template){

        if(check_template_already_exists(newtemplate[0]) || newtemplate[0] == ""){alert("this already exists change the name, or is not filled in");}
        else{
            template.push(newtemplate);
            localStorage.setItem('TTtickettemplates', JSON.stringify(template));

            let alltemplates = JSON.parse(localStorage.getItem('TTtickettemplates'));
            let selectorelement= document.getElementById('TTtemplate');

        
            
            var newoption = document.createElement('option');
                newoption.text = alltemplates[alltemplates.length -1][0];
                newoption.value = alltemplates.length -1;
                selectorelement.add(newoption);

        };
        
        document.getElementById('TTtempname').value = "";

    }

}

function check_template_already_exists(newoptionname){
        
    let templatearray = Array.prototype.slice.call(document.getElementById('TTtemplate').options);
    let template_exists;

    for(i=0; i<templatearray.length; i++){

        if(newoptionname == templatearray[i].textContent){template_exists = true; 
                                              break;}
        else{template_exists = false}

    }

    return template_exists;

}

function add_templates_toselector(){

    let alltemplates = JSON.parse(localStorage.getItem('TTtickettemplates'));
    let selectorelement= document.getElementById('TTtemplate');

    for(i=1; i<alltemplates.length; i++){
        
        var newoption = document.createElement('option');
            newoption.text = alltemplates[i][0];
            newoption.value = i;
            selectorelement.add(newoption);

    }



}

function submit_template(){

    let alltemplates = Array.prototype.slice.call(JSON.parse(localStorage.getItem('TTtickettemplates')));
    let current_selection = alltemplates[document.getElementById('TTtemplate').selectedIndex +1];

    if(window.location.href != '  '){
    document.getElementById('status').value = current_selection[1];
    document.getElementById('status').dispatchEvent(new Event('change'));
    document.dispatchEvent(new Event('change'));

    wait_for_condition(document.querySelector('#closure_code').length != 0, current_selection, ()=>{document.getElementById('closure_code').value = current_selection[2];}, 250, 1)
    wait_for_condition(document.querySelector('#pending_reason').length != 0, current_selection,  ()=>{document.getElementById('pending_reason').value = current_selection[3];}, 250, 1)
    wait_for_condition(document.querySelector('#root_cause').length != 0, current_selection, ()=>{document.getElementById('root_cause').value = current_selection[5];}, 250, 1)
    
    document.getElementById('impact').value = current_selection[4];
    
    
    document.getElementById('root_cause_details').value = current_selection[6];
    document.getElementById('resolution').value = current_selection[7];

    document.getElementById('category').value = current_selection[8];
    document.getElementById('type').value = current_selection[9];
    document.getElementById('item').value = current_selection[10];
    document.getElementById('assigned_group').value = current_selection[11];
    document.getElementById('assigned_individual').value = current_selection[12];

    if((current_selection[13] == 'true') && (current_selection[14] == 'true')){document.getElementById('sensitive_checkbox').click();document.getElementById('ticket_conversion_confirmation').click()}

    
    document.getElementById('building_id').value = current_selection[15];
    document.getElementById('building_id').dispatchEvent(new Event('change'))
    document.getElementById('case_type').value = current_selection[16];

    document.getElementById('correspondence').value = current_selection[17];
    document.getElementById('work_log').value = current_selection[18];


    }else if(window.location.href == '  '){
    
    
        document.querySelector('#impact').value = current_selection[1];
        document.querySelector('#category').value = current_selection[2];
        document.querySelector('#category').dispatchEvent(new Event('change'));
        document.querySelector('#building_id').value = current_selection[8];       
        document.querySelector('#building_id').dispatchEvent(new Event('change'));       
        
        //unable to use wait for condition here, for unknown reason the logic is broken.
        //no syntax errors, but the condition is never met within the if statent, if i log the condition it appears 
        //false/true but never triggers the event like above.
        //tested by rewriting, testing with several conditions true ones work, other conditions that should change dont triger event
        //created new html and on change event to append options to select box but it also was not triggered in clean environment.
        //

        wait_for_change('#type', ()=>{document.querySelector('#type').value = current_selection[3];document.querySelector('#type').dispatchEvent(new Event('change'));}, 500, 1);
        wait_for_change('#item', ()=>{document.querySelector('#item').value = current_selection[4];document.querySelector('#item').dispatchEvent(new Event('change'));}, 500, 1);
        
    
        
        document.querySelector('#item').value = current_selection[4];
        document.querySelector('#assigned_group').value = current_selection[5];
        document.querySelector('#assigned_individual').value = current_selection[6];
                
        document.querySelector('#country').value = current_selection[7];
        
        document.querySelector('#problem_location').value = current_selection[9];
        document.querySelector('#case_type').value = current_selection[10];

        document.querySelector('#short_description').value = current_selection[11];
        document.querySelector('#details').value = current_selection[12];
        document.querySelector('#cc_list').value = current_selection[13];
        document.querySelector('#tags').value = current_selection[14];
        



    }
    

}

function delete_template(){



    var current_templates = JSON.parse(localStorage.getItem('TTtickettemplates'));

    if(current_templates.length > 1){

    current_templates.splice(document.getElementById('TTtemplate').selectedIndex +1, 1);
    localStorage.setItem('TTtickettemplates', JSON.stringify(current_templates));
    document.getElementById('TTtemplate').remove(document.getElementById('TTtemplate').selectedIndex);
    }

    

    


}

function wait_for_change(selector, action, iterationms, timeoutminutes){
    let now = new Date();
    let newinterval = setInterval((selector)=>{

        if(document.querySelector(selector).options.length != 1){
            action();
            clearInterval(newinterval);}

        if((new Date()).getMinutes() >= now.getMinutes() + timeoutminutes){clearInterval(newinterval);}

    },iterationms, selector);



}

function wait_for_condition(condition, args, action, iterationms, timeoutminutes){
    let now = new Date();
    let newinterval = setInterval((timeoutminutes)=>{
        
        if(condition){
            action();
            clearInterval(newinterval);}
        else{console.log("condition not met.")}

        if((new Date()).getMinutes() >= now.getMinutes() + timeoutminutes){clearInterval(newinterval);}
        
    },iterationms, timeoutminutes);

}

create_selector_option();
check_template_exists();
document.getElementsByTagName('tbody')[1].click();
document.getElementById('cti-manually-assign').click();
document.getElementById('TTsubmit').addEventListener('click', submit_template);
document.getElementById('TTgettemp').addEventListener('click', get_template);
document.getElementById('TTdeletetemp').addEventListener('click', delete_template);
add_templates_toselector();



