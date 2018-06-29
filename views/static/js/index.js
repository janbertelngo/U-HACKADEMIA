$(document).ready(function(){
    console.log("ha")
    axios.get("/user").then(resp =>{
        console.log(resp)
        $(".user-name").text(resp.data.firstName + " " + resp.data.lastName);
        $(".user-age").text(resp.data);
        $(".user-birthday").text(resp.data.birthday);
    })
})