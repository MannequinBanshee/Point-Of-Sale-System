async function PopulateClientBalanceforPurchase(clientid){
    var PurchaseProductClientBalance = document.getElementById("PurchaseProductClientBalance");
    var PurchaseProductClientID = document.getElementById("PurchaseProductClientID");
    PurchaseProductClientID.value = clientid;
    var balance = await GetClientBalance(clientid);
    PurchaseProductClientBalance.value = `R${balance}`;
}

async function GetClientBalance(clientid){
    var returnvalue = parseFloat(0.00);
    var client = await GetClient(clientid);
    if(client){
        returnvalue = parseFloat(client.balance.$numberDecimal);
    }
   return returnvalue;
}

async function PurchaseQuantity(ProductID,Increase){
    var returnvalue = false;
    if(ProductID){
        var CurrentQuantity = document.getElementById(`${ProductID}-Quantity`);
        var CurrentSubTotal = document.getElementById(`${ProductID}-SubTotal`);
        var ProductPurchasesTable = document.getElementById('ClientPurchaseProduct');
        if(CurrentQuantity && CurrentSubTotal && ProductPurchasesTable){
            var Quantity = parseInt(CurrentQuantity.innerText);
            var Price = parseFloat(CurrentSubTotal.innerHTML.replace('R',''));

            if(Quantity == 1 && Increase == false){
                var RowIndex = -1;
                for(var i=0; i< ProductPurchasesTable.rows.length; i++){

                    var tr = ProductPurchasesTable.rows[i];
                    if(tr.id == `${ProductID}-Row` ){
                        RowIndex = i;
                        ProductPurchasesTable.deleteRow(RowIndex);
                        returnvalue = true;
                        
                    }

                }
                
            }
            else{
                var Found = await GetExistingProductDetails(ProductID);
                if(Found){
                    if(Found.Product.id.toUpperCase() != "INVALID"){
                        var ProductsOfficialPrice = parseFloat(Found.Product.price.$numberDecimal);
                        Increase ? Quantity++ : Quantity-- ;
                        Price = parseFloat(ProductsOfficialPrice) * Quantity;
                        CurrentQuantity.innerText = Quantity;
                        CurrentSubTotal.innerText = `R${Price}`;
                        returnvalue = true;
                    }
                }
            }


        }
    }
    await UpdatePurchaseTotal();
    return returnvalue
}

async function AddProductToCart(id) {
    const result = await $.ajax({
        url: `/product/AddToCart/${id}`,
        type: 'GET'
    });
    return result;
}

async function GetExistingProductDetails(id) {
    const result = await $.ajax({
        url: `/product/${id}`,
        type: 'GET'
    });
    return result;
}

async function AddProductToPurchaseForm() {
var returnvalue = false;
var selectedProduct = document.getElementById('SelectedCardPurchaseProduct');
var ProductDataList = document.getElementById('AvailableCardPurchaseProducts');
    if(selectedProduct && ProductDataList){
        if(selectedProduct.value != ""){
            var SelectedProductID = ""
            for(var Child of ProductDataList.children){
                if(Child.label == selectedProduct.value){
                    SelectedProductID = Child.attributes.data.value;
                    break;
                }
            }
            if(SelectedProductID || SelectedProductID != ""){
                var NewRow = await AddProductToCart(SelectedProductID);
                if(NewRow){
                    var ProductsTable = document.getElementById("ClientPurchaseProduct");
                    if(ProductsTable){
                        var ProductsTableBody = ProductsTable.getElementsByTagName("tbody")[0];
                        ProductsTableBody.innerHTML += NewRow;
                        selectedProduct.value = "";
                        returnvalue = true;
                    }
                }

            }
        }
    }
    await UpdatePurchaseTotal();
    return returnvalue;
}

async function UpdatePurchaseTotal(){
    var returnvalue = false;
    var ProductPurchasesTable = document.getElementById('ClientPurchaseProduct');
    var PurchaseTotal = document.getElementById('PurchaseProductTotalCosting');
    if(PurchaseTotal &&ProductPurchasesTable){
        var TotalCost = 0;
        for(var i=1; i< ProductPurchasesTable.rows.length; i++){
            var tr = ProductPurchasesTable.rows[i];
            var td = tr.children[4];
            var ItemSubTotal = parseFloat(td.innerText.replace('R',''));
            TotalCost += ItemSubTotal
        }
        PurchaseTotal.value = `R${TotalCost}`;
        returnvalue = true;
        await CalculateChange();
    }


    return returnvalue;
}


async function CalculateChange(){

    var PurchaseProductClientID = document.getElementById("PurchaseProductClientID"); 
    var AmountDueInput = document.getElementById('PurchaseProductTotalCosting');
    var PaymentAmountInput = document.getElementById('PurchaseProductTotalPayment');
    var ChangeInput = document.getElementById('PurchaseProductTotalChange');
    var PurchaseProductClientBalanceInput = document.getElementById("PurchaseProductClientBalance");
    var RadioButtonCash = document.getElementById('RadioButtonCash');
    var RadioButtonCard = document.getElementById('RadioButtonCard');
    var RadioButtonCredit = document.getElementById('RadioButtonCredit');

    if(
        AmountDueInput && PaymentAmountInput &&
        ChangeInput && PurchaseProductClientBalanceInput &&
        PurchaseProductClientID &&
        RadioButtonCash && RadioButtonCard && RadioButtonCredit
    ){

        var PaymentAmountValue = PaymentAmountInput.value != null && PaymentAmountInput.value != "" && PaymentAmountInput.value != "-"? PaymentAmountInput.value.replace('R','') : 0;
        var ChangeValue = ChangeInput.value != null && ChangeInput.value != "" ? ChangeInput.value.replace('R','') : 0;
        var AmountDueValue = AmountDueInput.value != null && AmountDueInput.value != "" ? AmountDueInput.value.replace('R','') : 0;
        var PaymentAmount = parseFloat(PaymentAmountValue);

        if(PaymentAmount <= 0){

            RadioButtonCash.disabled = true;
            RadioButtonCard.disabled = true;
            RadioButtonCredit.checked = true;
            PaymentAmountInput.value = 0;
            PaymentAmount = 0;

        }
        else{
            RadioButtonCash.disabled = false;
            RadioButtonCash.checked = true;
            RadioButtonCard.disabled = false;

            RadioButtonCredit.checked = false;
            RadioButtonCard.disabled = false;
        }

        var AmountDue = parseFloat(AmountDueValue);
        var ChangeDue = parseFloat(ChangeValue);
        var clientid = PurchaseProductClientID.value;
        var ClientBalance = await GetClientBalance(clientid);
        var ClinetBalanceIncludingPayemntAmount = ChangeDue > 0 ? ((ClientBalance + PaymentAmount) - ChangeDue) : (ClientBalance + PaymentAmount);
        var NewClientBalance =  ClinetBalanceIncludingPayemntAmount - AmountDue;
        PurchaseProductClientBalanceInput.value = `R${NewClientBalance}`
        ChangeInput.value = ChangeDue

    }
    return true;

}

async function CheckFloat(){


    
}