document.getElementById("register").addEventListener("click",function () {
   window.location.href = "./html/Register.html"
});


document.getElementById("submit").addEventListener("click", function () {
    const obj = {};
    obj.number = document.getElementById("username").value;
    obj.password = document.getElementById("password").value;
    const jsonStr = JSON.stringify(obj);
    var json1 = JSON.parse(jsonStr);

    $.ajax({
        url: "http://47.101.189.80:28080/teachers/login",
        method: 'post',
        data: json1,
        dataType:"json",
        success: function(data) {
            alert(data.hasOwnProperty("result")+data.result);
            setCookie("token",data.result);
            window.location.href = "./html/Introduction.html"
        }
    });

    $.ajax({
        type:'HEAD',
        dataType:"json",
        url:'http://47.101.189.80:28080/teachers/login?'+'number='+document.getElementById("username").value+'&password='+document.getElementById("password").value,
        complete:function (xhr) {
            console.log(xhr);
            setCookie("teacherId",xhr.getResponseHeader('teacherId'));
            console.log(getCookie("teacherId"));
        }
    });

});



function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)===0) { return c.substring(name.length,c.length); }
    }
    return "";
}