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

async function AddNewBarcodeToElement(ElementName) {
    const result = await $.ajax({
        url: '/barcode/new/nameonly',
        type: 'GET'
    });
    var guid = result;
    await GetAllAvailableBarcodes();
    document.getElementById(ElementName).value = guid;
}

async function GetAllProductsForPurchase(PurchaseDDLElement) {
    const result = await $.ajax({
        url: '/product/purchase/all',
        type: 'GET'
    });
    var html = result;
    document.getElementById(PurchaseDDLElement).innerHTML = html;
}

async function DeleteNewBarcodeFromElement(ElementName){
    var BarcodeElement = document.getElementById(ElementName);
    if(BarcodeElement.value){
        var BarcodeElementValue = BarcodeElement.value;
        const result = await $.ajax({
            url: `/barcode/delete/${BarcodeElementValue}`,
            type: 'DELETE'
        });
        return result
    }
    return false
}

async function DeleteClient(id) {
    const result = await $.ajax({
        url: `/client/${id}`,
        type: 'DELETE'
    });
    var success = result;
    if(success){
        await GetAllClients();
        document.getElementById('LoaderModal').style.display ='none';
    }
}

async function GetClient(id) {
    const result = await $.ajax({
        url: `/client/edit/${id}`,
        type: 'GET'
    });
    var client = result;
    return client;
}


async function ValidateNewClientForm() {
    var {firstname,lastname,email,balance,barcode,cellnumber,idnumber} = document.forms["RegisterNewClientForm"]; 
    try{

            if(firstname.value != "" && lastname.value != ""){

                if(barcode.value != "" && barcode.value.length == 8){

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
    }
    catch(e){
        return false
    }
    finally{
        ToggleModal("LoaderModal");
    }
    return false;
}

async function PopulateModifyExisitingClientForm(id) {
    try{
        var client = await GetClient(id);
        if(client){
            var Form = document.forms["ModifyExistingClientForm"];
            Form.firstname.value = client.firstname
            Form.lastname.value = client.lastname
            Form.cellnumber.value = client.cellnumber
            Form.email.value = client.email
            Form.identitynumber.value = client.identitynumber
            Form.clientid.value = client.id
            return true;
        }
    }
    catch(e){
        return false
    }
    return false;
}

async function ValidateModifyExisitingClientForm() {
    var {clientid,firstname,lastname,email,cellnumber,identitynumber} = document.forms["ModifyExistingClientForm"]; 
    try{

            if(firstname.value != "" && lastname.value != ""){

                var success = await UpdateExistingClient({
                    "user":{
                        "id": `${clientid.value}`,
                        "firstname":`${firstname.value}`,
                        "lastname":`${lastname.value}`,
                        "email": `${email.value}`,
                        "cellnumber": `${cellnumber.value}`,
                        "idnumber": `${identitynumber.value}`
                    }});
                if(success){
                    ToggleModal("ModifyClientModal");
                    document.forms["ModifyExistingClientForm"].reset();
                    return true;  
                }
            }
    }
    catch(e){
        return false
    }
    finally{
        ToggleModal("LoaderModal");
    }
    return false;
}


async function RefreshClients(){
    await GetAllClients();
    document.getElementById('LoaderModal').style.display ='none';
    return true;
}


async function AutoRefreshClients(){

    setTimeout(async ()=>{
        var success = await GetAllClients();
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
      var firstname = tr[i].getElementsByTagName("td")[2];
      var lastname = tr[i].getElementsByTagName("td")[3];
      var balance = tr[i].getElementsByTagName("td")[4];
      var barcodename = tr[i].getElementsByTagName("td")[6];
      var emailaddress = tr[i].getElementsByTagName("td")[7];
      var phonenumber = tr[i].getElementsByTagName("td")[8];
      var identificationnumber = tr[i].getElementsByTagName("td")[9];

      if (barcodename && firstname && lastname && balance) 
      {
        var barcodenametext = barcodename.textContent.replace(" ","").toLocaleUpperCase() || barcodename.innerText.replace(" ","").toLocaleUpperCase();
        var firstnametext = firstname.textContent.replace(" ","").toLocaleUpperCase() || firstname.innerText.replace(" ","").toLocaleUpperCase();
        var lastnametext = lastname.textContent.replace(" ","").toLocaleUpperCase() || lastname.innerText.replace(" ","").toLocaleUpperCase();
        var balancetext = balance.textContent.replace(" ","").toLocaleUpperCase() || balance.innerText.replace(" ","").toLocaleUpperCase();
        var emailaddresstext = emailaddress.textContent.replace(" ","").toLocaleUpperCase() || emailaddress.innerText.replace(" ","").toLocaleUpperCase();
        var phonenumbertext = phonenumber.textContent.replace(" ","").toLocaleUpperCase() || phonenumber.innerText.replace(" ","").toLocaleUpperCase();
        var identificationnumbertext = identificationnumber.textContent.replace(" ","").toLocaleUpperCase() || identificationnumber.innerText.replace(" ","").toLocaleUpperCase();

        if 
        (
            (barcodenametext.indexOf(filter.toUpperCase()) > -1) ||
            (firstnametext.indexOf(filter.toUpperCase()) > -1) ||
            (lastnametext.indexOf(filter.toUpperCase()) > -1) ||
            (balancetext.indexOf(filter.toUpperCase()) > -1)  ||
            (emailaddresstext.indexOf(filter.toUpperCase()) > -1)  ||
            (phonenumbertext.indexOf(filter.toUpperCase()) > -1)  ||
            (identificationnumbertext.indexOf(filter.toUpperCase()) > -1)  
        ) 
        {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }