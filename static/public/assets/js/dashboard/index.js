function w3_open() {
  var mySidebar = document.getElementById("mySidebar");
  var overlayBg = document.getElementById("myOverlay");
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  var mySidebar = document.getElementById("mySidebar");
  var overlayBg = document.getElementById("myOverlay");
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}

//Toggle between the page sections
async function switchSection(sectionid){

    var pageHeading = document.getElementById('Page-Heading');
    pageHeading.innerText = sectionid;
    var dynamicSections = document.getElementsByClassName('dynamic-section');
    var barItems = document.getElementsByClassName('switchNav');
    switch(sectionid){

      case "Accounts":
        await AutoRefreshClients();
      break;
      case "UserManagement":
        await AutoRefreshUsers();
      break;
      case "Products":
        await AutoRefreshProducts();
      break;
    }

  var BarItemsArray = Array.from(barItems);


    for(const baritem of BarItemsArray){
      if(baritem.id == `${sectionid.replace(' ','')}-Bar`){
        baritem.classList = "switchNav w3-bar-item w3-button w3-padding w3-blue";
      }
      else{
        baritem.classList = "switchNav w3-bar-item w3-button w3-padding";
      }
    }
   
    var DynamicSectionsArray = Array.from(dynamicSections);

    for(const section of DynamicSectionsArray){
      if(section.id == sectionid.replace(' ','')){
        section.style.display='block';
      }
      else{
        section.style.display='none';
      }
    }
    await feedbackCurrentPage(sectionid);
}

async function feedbackCurrentPage(CurrentPageName){

  const result = await $.ajax({
    url: `/dashboard/${CurrentPageName}`,
    type: 'POST'
  });

}


//Toggle Modal to show or Hide
function ToggleModal(ModalID){
  var modal = document.getElementById(ModalID);
  if(modal.style.display == 'block'){
    modal.style.display = 'none'
  }
  else{
    modal.style.display = 'block'
  }
}

