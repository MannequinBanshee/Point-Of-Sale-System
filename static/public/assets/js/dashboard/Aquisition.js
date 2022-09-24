async function UpdateDashBoardDetails(){

    setTimeout(async() =>{
  
      var AccountBalanceAquisition = document.getElementById('AccountBalanceAquisition')
      var AccountDebtAquisition = document.getElementById('AccountDebtUsersAquisition')
      var AccountCreditAquisition = document.getElementById('AccountCreditUsersAquisition')
      var TotalSalesAquisition = document.getElementById('TotalSalesAquisition')

      var TotalSales = parseInt(TotalSalesAquisition.innerText)


      var QuantityRandomPositive = Math.round(Math.random()*100);
      var QuantityRandomNegative = Math.round(Math.random()*100);

        if(QuantityRandomPositive < QuantityRandomNegative)
        {

          AccountDebtAquisition.innerText = (parseInt(AccountDebtAquisition.innerText) + 1).toString();
          AccountCreditAquisition.innerText = (100 - parseInt(AccountDebtAquisition.innerText)).toString();
          AccountBalanceAquisition.innerText = ((parseInt(AccountBalanceAquisition.innerText) + QuantityRandomPositive) - QuantityRandomNegative);
          TotalSales++
          TotalSalesAquisition.innerText = TotalSales;
        }
        else{
          if(QuantityRandomNegative != QuantityRandomPositive)
          {
            AccountDebtAquisition.innerText = (parseInt(AccountDebtAquisition.innerText) - 1).toString();
            AccountCreditAquisition.innerText = (100 - parseInt(AccountDebtAquisition.innerText)).toString();
            AccountBalanceAquisition.innerText = ((parseInt(AccountBalanceAquisition.innerText) + QuantityRandomPositive )- QuantityRandomNegative);
            TotalSales++
            TotalSalesAquisition.innerText = TotalSales;
          }

        }


        if(parseInt(AccountCreditAquisition.innerText) >= 100 || parseInt(AccountDebtAquisition.innerText) <= 0){

            AccountDebtAquisition.innerText = QuantityRandomPositive;
            AccountCreditAquisition.innerText = (100 - parseInt(AccountDebtAquisition.innerText)).toString();
            AccountBalanceAquisition.innerText = parseInt(AccountBalanceAquisition.innerText)- (QuantityRandomPositive + QuantityRandomNegative);
        }

      UpdateDashBoardDetails();
    },400);
  
  
  }
