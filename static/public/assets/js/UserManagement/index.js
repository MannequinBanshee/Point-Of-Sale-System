async function GetAllUsers() {
    const result = await $.ajax({
        url: '/user/all',
        type: 'GET'
    });
    var html = result;
    if(!html.includes(`<form class="w3-container" action="/login" method="post">`)){
        document.getElementById('UserManagementTable').innerHTML = html;
        return true;
    }
    else{
        window.location.replace("/login");
    }
    return false;
}

async function DeleteUser(id) {
    const result = await $.ajax({
        url: `/user/${id}`,
        type: 'DELETE'
    });
    var success = result;
    if(success){
        await GetAllUsers();
    }
}

async function AddNewUser(form) {
    const result = await $.ajax({
        url: `/user`,
        type: 'POST',
        data: form.user
    });
    return result;
}

async function AddNewClient(form) {
    const result = await $.ajax({
        url: `/client`,
        type: 'POST',
        data: form.user
    });
    return result;
}

async function GetAdminRoles() {
    const result = await $.ajax({
        url: '/role/all/Administrator',
        type: 'GET'
    });
    var html = result;
    document.getElementById('NewAdminRoles').innerHTML = html;
}

async function GetStaffRoles() {
    const result = await $.ajax({
        url: '/role/all/Standard',
        type: 'GET'
    });
    var html = result;
    document.getElementById('NewStaffRoles').innerHTML = html;
}

async function GetRole(AuthorityLevel) {
    const SelectedRoleID = document.getElementById(`Selected${AuthorityLevel}Role`).value;
    if(SelectedRoleID != -1){
        const result = await $.ajax({
            url: `/role/${SelectedRoleID}`,
            type: 'GET',
            data: {'type':'newuser'}
        });
        var html = result;
        var RoleChips = document.getElementById(`Assigned${AuthorityLevel}Roles`);
        var RoleList = document.getElementById(`Assigned${AuthorityLevel}RolesList`);
        if(!RoleChips.innerHTML.includes(SelectedRoleID)){
            RoleChips.innerHTML += html;
            var newvalue = `${RoleList.value == ""? `{"roleids":[`: RoleList.value.replace(']}',',')}{"id":"${SelectedRoleID}"}]}`;
            RoleList.value = newvalue;
        }
    }
}


async function ValidateNewAdminForm() {
    var { username,firstname,lastname,email, password, confirmpassword,roles } = document.forms["RegisterNewAdminForm"]; 
    try{
        if(password.value == confirmpassword.value){
            if(firstname.value != "" && lastname.value != "" && username.value != ""){
                if(Array.from(roles.value).length >=1){

                    var success = await AddNewUser({
                        "user":{
                            "username":`${username.value}`,
                            "email": `${email.value}`,
                            "firstname":`${firstname.value}`,
                            "lastname":`${lastname.value}`,
                            "confirmpassword":`${confirmpassword.value}`,
                            "password":`${password.value}`,
                            "roles":`${roles.value}`
                        }});
                    if(success){
                        ToggleModal("NewAdminModal");
                        await GetAllUsers();
                        document.forms["RegisterNewAdminForm"].reset();
                        document.getElementById(`AssignedAdministratorRolesList`).value = "";
                        return true;
                    }
                    else{
                        return false
                    }
                }
            }
        }
    }
    catch{
        return false
    }
    return false;
}


async function ValidateNewStaffForm() {
    var { username,email,firstname,lastname, password, confirmpassword,roles } = document.forms["RegisterNewStaffForm"]; 
    try{
        if(password.value == confirmpassword.value){
            if(firstname.value != "" && lastname.value != "" && username.value != ""){
                if(Array.from(roles.value).length >=1){


                    var success = await AddNewUser({
                        "user":{
                            "username":`${username.value}`,
                            "email": `${email.value}`,
                            "firstname":`${firstname.value}`,
                            "lastname":`${lastname.value}`,
                            "password":`${password.value}`,
                            "confirmpassword":`${confirmpassword.value}`,
                            "roles":`${roles.value}`
                        }});
                    if(success){
                        ToggleModal("NewStaffModal");
                        await GetAllUsers();
                        document.forms["RegisterNewStaffForm"].reset();
                        document.getElementById(`AssignedStandardRolesList`).value = "";
                        return true;
                        
                    }
                    else{
                        return false
                    }
                }
            }
        }
    }
    catch{
        return false
    }
    return false;
}

async function AutoRefreshUsers(){

    setTimeout(async ()=>{
        var success = await GetAllUsers();
        if(success){
            var classname = document.getElementById('UserManagement-Bar').className
            if(classname.includes('w3-blue')){
                FilterSearch();
                AutoRefreshUsers();

            }
        }

    },1000)

}

function FilterSearch() {
    var input, filter, table, tr, i, txtValue;
    input = document.getElementById("UserSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("UserManagementTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      var username = tr[i].getElementsByTagName("td")[2];
      var firstname = tr[i].getElementsByTagName("td")[3];
      var lastname = tr[i].getElementsByTagName("td")[4];
      var date = tr[i].getElementsByTagName("td")[5];
      var authority = tr[i].getElementsByTagName("td")[6];

      if (authority && username && firstname && lastname && date) 
      {
        var authoritytext = authority.textContent.replace(" ","").toLocaleUpperCase() || authority.innerText.replace(" ","").toLocaleUpperCase();
        var usernametext = username.textContent.replace(" ","").toLocaleUpperCase() || username.innerText.replace(" ","").toLocaleUpperCase();
        var firstnametext = firstname.textContent.replace(" ","").toLocaleUpperCase() || firstname.innerText.replace(" ","").toLocaleUpperCase();
        var lastnametext = lastname.textContent.replace(" ","").toLocaleUpperCase() || lastname.innerText.replace(" ","").toLocaleUpperCase();
        var datetext = date.textContent.replace(" ","").toLocaleUpperCase() || date.innerText.replace(" ","").toLocaleUpperCase();

        if 
        (
            (authoritytext.indexOf(filter.toUpperCase()) > -1) || 
            (usernametext.indexOf(filter.toUpperCase()) > -1) ||
            (firstnametext.indexOf(filter.toUpperCase()) > -1) ||
            (lastnametext.indexOf(filter.toUpperCase()) > -1) ||
            (datetext.indexOf(filter.toUpperCase()) > -1) 
        ) 
        {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }