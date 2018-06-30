$(document).ready(function(){
    
    $(document.body).on('click','.choices', function() {
        console.log("clicked")
        $('.choices').find('form').submit();
        
    });
    console.log("ha")
    axios.get("/user").then(resp =>{
        console.log(resp)
        $(".user-name").text(resp.data.firstName + " " + resp.data.lastName);
        $(".user-age").text(resp.data);
        $(".user-birthday").text(resp.data.birthday);
        $(".user-gender").text(resp.data.sex);
        $('title').html(resp.data.firstName)
        $(".user-image-container").html("<img class'user-image' src='/img/"+resp.data.sex.toLowerCase()+".png' width='140' height='140' alt=''> ");
    })

    axios.get("/records").then(resp => {
        console.log(resp.data)
        var json = resp.data;
        for(var i = 0 ; i < json.length; i++) {
            var item = json[i];

            var findings = item.findings;
            var date = item.date;
            var id = item.record_id;
            var splitAttachment = item.attachment.split("\\");
            var attachment = splitAttachment[splitAttachment.length - 1];

            console.log(attachment)

            var string = "<hr><div class='row choices'><form action='viewRecord' method='post'><input name='rID' type='hidden' value='"+id+"'></form><img src='/uploaded/"+attachment+"' width='10%' height='10%'/><div class='col'><div class='row col'><h6 class='finding'>"+findings+"</h6></div><div class='row col'><p class='date'>"+date +"</p></div></div></div>"
            $('.finding-content').append(string);
        }
    })

    // axios.put("/record", 
    //    {rID: 1/*get record ID from the clicked findings*/}
    // ).then(resp =>{
    //     console.log(resp)
    // })

    
})
