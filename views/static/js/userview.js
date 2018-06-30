function populateFinding(jsonArray) {
    var json = jsonArray;
    console.log(json)
    for(var i = 0 ; i < json.length; i++) {
        var item = json[i];

        var findings = item.findings;
        var date = item.date;
        var splitAttachment = item.attachment.split("/");
        var attachment = splitAttachment[splitAttachment.length - 1];
        //console.log(splitAttachment)



        var string = "<hr><div class='row'><img src='/uploaded/image.png' width='10%' height='10%'/><div class='col'><div class='row col'><h6 class='finding'>"+findings+"</h6></div><div class='row col'><p class='date'>"+date +"</p></div></div></div>"
        $('.finding-content').append(string);
    }

    

        
}