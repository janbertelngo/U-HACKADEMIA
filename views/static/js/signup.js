
for(var i = 2018 ; i >= 1950; i-- ) {
    $("#inputYear").append("<option value='"+ i+ "'>" + i + "</option>");
}

for(var i = 1; i <=31; i++) {
    $("#inputDay").append("<option value='"+ i+ "'>" + i + "</option>");
}

$(".nav-link").on("click", function() {
    var role = this.id.split("-")[0];
    console.log(role)
    $('.role').val(role);
    $('.workplace').css("display", role == "patient" ? "none" : "block");
    
});