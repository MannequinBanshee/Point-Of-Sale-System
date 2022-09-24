async function GetAllClients() {
    const result = await $.ajax({
        url: '/client/all',
        type: 'GET'
    });
    var html = result;
    if(!html.includes(`<form class="w3-container" action="/login" method="post">`)){
        document.getElementById('ClientManagementTableContent').innerHTML = html;
        return true;
    }
    else{
        window.location.replace("/login");
    }
    return false;
}


async function ValidateNewClientForm() {
    var {firstname,lastname,email,balance,barcode,cellnumber,idnumber} = document.forms["RegisterNewClientForm"]; 
    try{

            if(firstname.value != "" && lastname.value != ""){

                var success = await AddNewClient({
                    "user":{
                        "firstname":`${firstname.value}`,
                        "lastname":`${lastname.value}`,
                        "email": `${email.value}`,
                        "cellnumber": `${cellnumber.value}`,
                        "idnumber": `${idnumber.value}`,
                        "balance": `${balance.value}`,
                        "barcodename": `${barcode.value}`,
                    }});
                if(success){
                    ToggleModal("NewClientModal");
                    document.forms["RegisterNewClientForm"].reset();
                    return true;  
                }
                
            }
    }
    catch(e){
        return false
    }
    return false;
}

async function AutoRefreshClients(){

    setTimeout(async ()=>{
        var success = await GetAllUsers();
        if(success){
            var classname = document.getElementById('Accounts-Bar').className
            if(classname.includes('w3-blue')){
                FilterClientSearch();
                AutoRefreshClients();

            }
        }

    },1000)

}

function FilterClientSearch() {
    var input, filter, table, tr, i, txtValue;
    input = document.getElementById("ClientSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("ClientManagementTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      var barcodename = tr[i].getElementsByTagName("td")[1];
      var firstname = tr[i].getElementsByTagName("td")[3];
      var lastname = tr[i].getElementsByTagName("td")[4];
      var balance = tr[i].getElementsByTagName("td")[5];

      if (barcodename && firstname && lastname && balance) 
      {
        var barcodenametext = barcodename.textContent.replace(" ","").toLocaleUpperCase() || barcodename.innerText.replace(" ","").toLocaleUpperCase();
        var firstnametext = firstname.textContent.replace(" ","").toLocaleUpperCase() || firstname.innerText.replace(" ","").toLocaleUpperCase();
        var lastnametext = lastname.textContent.replace(" ","").toLocaleUpperCase() || lastname.innerText.replace(" ","").toLocaleUpperCase();
        var balancetext = balance.textContent.replace(" ","").toLocaleUpperCase() || balance.innerText.replace(" ","").toLocaleUpperCase();

        if 
        (
            (barcodenametext.indexOf(filter.toUpperCase()) > -1) ||
            (firstnametext.indexOf(filter.toUpperCase()) > -1) ||
            (lastnametext.indexOf(filter.toUpperCase()) > -1) ||
            (balancetext.indexOf(filter.toUpperCase()) > -1) 
        ) 
        {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }