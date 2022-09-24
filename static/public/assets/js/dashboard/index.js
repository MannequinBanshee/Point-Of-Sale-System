// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");


// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
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
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}

//Toggle between the page sections
function switchSection(sectionid){

    var pageHeading = document.getElementById('Page-Heading');
    pageHeading.innerText = sectionid;
    var dynamicSections = document.getElementsByClassName('dynamic-section');
    var barItems = document.getElementsByClassName('switchNav');
    
       Array.from(barItems).forEach(baritem =>{
           if(baritem.id == `${sectionid.replace(' ','')}-Bar`){
               baritem.classList = "switchNav w3-bar-item w3-button w3-padding w3-blue";
           }
           else{
               baritem.classList = "switchNav w3-bar-item w3-button w3-padding";
           }
    
       });
    
    
    Array.from(dynamicSections).forEach(section => {
       if(section.id == sectionid.replace(' ','')){
           section.style.display='block';
       }
       else{
           section.style.display='none';
       }
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

