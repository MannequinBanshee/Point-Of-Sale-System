async function GetAllIngredients() {
    const result = await $.ajax({
        url: '/ingredient/all',
        type: 'GET'
    });
    var html = result;
    document.getElementById('NewProductIngredients').innerHTML = html;
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
    const result = await $.ajax({
        url: '/barcode/new',
        type: 'GET'
    });
    var html = result;
    document.getElementById('BarcodeItem').innerHTML = html;
}

