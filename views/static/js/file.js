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
            date: $("#inputYear").val()+"-"+$("#inputMonth").val()+"-"+$("#inputDay").val()
        }).then(resp =>{
            if(resp) {
                this.submit()
            }
        })
    
    })
})