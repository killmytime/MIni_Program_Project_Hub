document.getElementById("submit").addEventListener("click",function () {
    const obj = {};
    obj.name = document.getElementById("username").value;
    obj.password = document.getElementById("password").value;
    obj.number = document.getElementById("number").value;
    obj.invitation = document.getElementById("invitation").value;
    const jsonStr = JSON.stringify(obj);
    var json1 = JSON.parse(jsonStr);

    $.post("http://47.101.189.80:28080/teachers/register", json1, function (data) {
        alert(data.hasOwnProperty("result")+data.result);
        window.location.href = "../login.html";
    },"JSON");
});