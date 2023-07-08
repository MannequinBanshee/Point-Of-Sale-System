async function UpdateDashBoardDetails(){
    setTimeout(async() =>{
      try{
        await GetSalesDataAquisition();
      }
      catch{

      }
      finally{
        UpdateDashBoardDetails();
      }

    },1000);
}


async function GetSalesDataAquisition(){

  const result = await $.ajax({
    url: `/client/all/aquisition`,
    type: 'GET'
  });

  if(result){
    html = result;
    document.getElementById('SalesDataAquisition').innerHTML = html;

    return true
  }
  return false;
}


