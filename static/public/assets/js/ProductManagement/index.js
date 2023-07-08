
async function GetAllIngredients() {
    const result = await $.ajax({
        url: '/ingredient/all',
        type: 'GET'
    });
    var html = result;
    document.getElementById('NewProductIngredients').innerHTML = html;
}

async function GetAllProducts() {
    const result = await $.ajax({
        url: '/product/all',
        type: 'GET'
    });
    var html = result;
    document.getElementById('ProductManagementTable').innerHTML = html;
}

async function GetAllAvailableBarcodes() {
    const result = await $.ajax({
        url: '/barcode/all',
        type: 'GET'
    });
    var html = result;
    document.getElementById('NewClientBarcodes').innerHTML = html;
}

async function GetNewBarcode() {

    var ReturnItem = false;
    var html;;
    try{
        const result = await $.ajax({
            url: '/barcode/new',
            type: 'GET'
        });
        ReturnItem = true;
        html = result;
    }
    catch(e){
        console.log(e.message);
    }
    finally{


        document.getElementById('BarcodeItem').innerHTML = html;
    }

    return ReturnItem;

}

async function AddNewIngredient(formdata) {
    const result = await $.ajax({
        url: '/ingredient/new',
        type: 'POST',
        data: formdata
    });
    return result;
}

async function AddNewProduct(formdata) {
    const result = await $.ajax({
        url: '/product/new',
        type: 'POST',
        data: formdata
    });
    return result;
}

async function DeleteProduct(id) {
    try{
        const result = await $.ajax({
            url: `/product/${id}`,
            type: 'DELETE'
        });
    }
    catch(e){
        console.log(e.message);
    }
    finally{
        await GetAllProducts();
        document.getElementById('LoaderModal').style.display ='none';    
    }
}

async function DeleteIngredient(id) {
    try{
        const result = await $.ajax({
            url: `/ingredient/${id}`,
            type: 'DELETE'
        });
    }
    catch(e){
        console.log(e.message);
    }
    finally{
        await GetAllIngredients(); 
        document.getElementById('LoaderModal').style.display ='none';    
    }
}

async function DeleteIngredientBarcode(){
    var BarcodeChipID = document.getElementById('BarcodeChipID');
    if(BarcodeChipID.value){
        var brcodeid = BarcodeChipID.value;
        const result = await $.ajax({
            url: `/barcode/${brcodeid}`,
            type: 'DELETE'
        });
        return result
    }
    return false
}

async function GetIngredient() {
    const SelectedIngredientID = document.getElementById('SelectedIngredient').value;
    if(SelectedIngredientID != -1){
        const result = await $.ajax({
            url: `/ingredient/${SelectedIngredientID}`,
            type: 'GET'
        });
        var html = result;
        var IngredientChips = document.getElementById("AssignedIngredients");
        var IngredientsList = document.getElementById("AssignedingredientsList");
        IngredientChips.innerHTML += html;
        var newvalue = `${IngredientsList.value == ""? `{"ingredientids":[`: IngredientsList.value.replace(']}',',')}{"id":"${SelectedIngredientID}"}]}`;
        IngredientsList.value = newvalue;
        
    }
}

async function RePopulateAllocatedIngredientChips(){

    var IngredientsList = document.getElementById("AssignedingredientsList");  
    if(IngredientsList){

        if(IngredientsList.value != ""){

            var ingredientidsjson = JSON.parse(IngredientsList.value);
            var IngredientidsArray = Array.from(ingredientidsjson.ingredientids);
            if(IngredientidsArray.length > 0){

                for(const Ingredient of IngredientidsArray){

                    const result = await $.ajax({
                        url: `/ingredient/${Ingredient.id}`,
                        type: 'GET'
                    });

                    if(!result.toUpperCase().includes("INVALID")){
                        var IngredientChips = document.getElementById("AssignedIngredients");
                        IngredientChips.innerHTML += result;
                    }

                }

            }
        }
    }

}

async function RefreshProducts() {
    await GetAllProducts();
    document.getElementById('LoaderModal').style.display = 'none';
    return true;
}

async function ValidateNewIngredientForm() {
    var {name,weight,quantity,price,barcodeid} = document.forms["RegisterNewIngredientForm"]; 
    try{

            if(name.value != "" && weight.value != 0){

                if(quantity.value != 0 && price.value != 0){

                    if(barcodeid.value.length > 0){

                        var success = await AddNewIngredient({
                                "name":name.value,
                                "weight":weight.value,
                                "quantity": quantity.value,
                                "price": price.value,
                                "barcodeid": barcodeid.value
                            });
                        if(success){
                            ToggleModal("NewIngredientModal");
                            document.forms["RegisterNewIngredientForm"].reset();
                            await GetAllIngredients();
                            await RePopulateAllocatedIngredientChips();
                            return true;  
                        }
                    }

                }

            }
    }
    catch(e){
        return false
    }
    return false;
}

async function ClearProductForm(){

    var returnvalue = false;

    try{
        document.forms["RegisterNewProductForm"].reset();
        var IngredientsList = document.getElementById("AssignedingredientsList");
        if(IngredientsList){
            IngredientsList.value = "";
            returnvalue = true;
        }
    }
    catch(e){
        console.log(e);
    }
    finally{
        await GetAllProducts();
    }


    return returnvalue;
}


async function ValidateNewProductForm() {
    var {name,ingredients,price,type,vat} = document.forms["RegisterNewProductForm"]; 
    try{

            var imagedata;
            if(name.value != "" && ingredients.value.length >0){

                if(type.value != "" && price.value != 0){

                    if(vat.value){                

                        var success = await AddNewProduct({
                                "name":name.value,
                                "ingredients": ingredients.value,
                                "price": price.value,
                                "vat": vat.value,
                                "type": type.value
                            });
                        if(success){
                            ToggleModal("NewProductModal");
                            await ClearProductForm();
                            return true;  
                        }
                    }

                }

            }
    }
    catch(e){
        return false
    }
    return false;
}

async function AutoRefreshProducts(){
    setTimeout(async ()=>{
        var success = await GetAllProducts();
        if(success){
            var classname = document.getElementById('Products-Bar').className
            if(classname.includes('w3-blue')){
                FilterProductSearch();
                AutoRefreshProducts();

            }
        }
    },1000)
}

function FilterProductSearch() {
    var input, filter, table, tr, i, txtValue;
    input = document.getElementById("ProductSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("ProductManagementTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      var name = tr[i].getElementsByTagName("td")[1];
      var price = tr[i].getElementsByTagName("td")[2];
      var type = tr[i].getElementsByTagName("td")[3];


      if (name && price && type) 
      {
        var nametext = name.textContent.replace(" ","").toLocaleUpperCase() || name.innerText.replace(" ","").toLocaleUpperCase();
        var pricetext = price.textContent.replace(" ","").toLocaleUpperCase() || price.innerText.replace(" ","").toLocaleUpperCase();
        var typetext = type.textContent.replace(" ","").toLocaleUpperCase() || type.innerText.replace(" ","").toLocaleUpperCase();


        if 
        (
            (nametext.indexOf(filter.toUpperCase()) > -1) || 
            (pricetext.indexOf(filter.toUpperCase()) > -1) ||
            (typetext.indexOf(filter.toUpperCase()) > -1)
        ) 
        {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}