$(document).ready(function(){
    console.log("ha")
    axios.get("/user").then(resp =>{
        console.log(resp)
    })
})