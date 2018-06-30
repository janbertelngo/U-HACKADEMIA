$(document).ready(function(){
    console.log("ha")
    axios.get("/user").then(resp =>{
        console.log(resp)
        $(".user-name").text(resp.data.firstName + " " + resp.data.lastName);
        $(".user-age").text(resp.data);
        $(".user-birthday").text(resp.data.birthday);
        console.log(resp.data.gender);
        $(".user-gender").text(resp.data.gender);
    })

    axios.get("/records").then(resp => {
        console.log(resp.data)
        var json = resp.data;
        for(var i = 0 ; i < json.length; i++) {
            var item = json[i];

            var findings = item.findings;
            var date = item.date;
            var splitAttachment = item.attachment.split("\\");
            var attachment = splitAttachment[splitAttachment.length - 1];

            console.log(attachment)

            var string = "<hr><div class='row'><img src='/uploaded/"+attachment+"' width='10%' height='10%'/><div class='col'><div class='row col'><h6 class='finding'>"+findings+"</h6></div><div class='row col'><p class='date'>"+date +"</p></div></div></div>"
            $('.finding-content').append(string);
        }
    })
})