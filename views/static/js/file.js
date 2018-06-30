$(document).ready(function(){
    $("#submitRecord").submit(function(e){
        console.log("HAAA")
        e.preventDefault();
        axios.post("/record", 
        {
            firstName: $("#login").val(),
            lastName: $("#login1").val(),
            testType: $("#inputTestType").val(),
            findings: $("#login2").val(),
            date: $("#inputYear").val()+"-"+$("#inputMonth").val()+"-"+$("#inputDay").val(),
            file: $("#fileAttach").val()
        }).then(resp =>{
            if(resp) {
                this.submit()
            }
        })
    
    })
})

for(var i = 2018 ; i >= 1950; i-- ) {
    $("#inputYear").append("<option value='"+ i+ "'>" + i + "</option>");
}

for(var i = 1; i <=31; i++) {
    $("#inputDay").append("<option value='"+ i+ "'>" + i + "</option>");
}