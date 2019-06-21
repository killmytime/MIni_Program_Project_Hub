
$.ajax({
    url: "http://47.101.189.80:28080/teachers/info",
    method: 'get',
    data: {teacherId:getCookie("teacherId")},
    beforeSend: function(request) {
        request.setRequestHeader("authorization", "Bearer "+ getCookie("token"));
    },
    dataType:"json",
    success: function(data) {
        var html = '';
        html+='<img src=" http://'+data.avatar+'"'+' width="192" height="108"'+'>';
        $('#headImage').append(html);
        document.getElementById("username").innerHTML = data.name;
        document.getElementById("mailbox").setAttribute('value',data.email);
        document.getElementById("number").setAttribute('value',data.number);
        console.log(getCookie("teacherId"))
    }
});

document.getElementById("infoDetails").addEventListener("click",function () {
   window.location.href = "infoDetails.html";
});

document.getElementById("courseRelease").addEventListener("click",function () {
    window.location.href = "UploadCourse.html";
});


function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)===0) { return c.substring(name.length,c.length); }
    }
    return "";
}

function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

