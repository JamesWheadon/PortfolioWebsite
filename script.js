function openNav() {
    document.getElementById("SidenavBar").style.width = window.screen.width <= 500 ? "100%": "250px";
    //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("SidenavBar").style.width = "0";
    //document.body.style.backgroundColor = "white";
  }