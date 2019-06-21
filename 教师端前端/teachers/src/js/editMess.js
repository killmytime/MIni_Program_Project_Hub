$.ajax({
    url: "http://47.101.189.80:28080/teachers/info",
    method: 'get',
    data: {teacherId: getCookie("teacherId")},
    beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer "+ getCookie("token"));
    },
    dataType:"json",
    success: function (data) {
        document.getElementById("username").setAttribute("value",data.name);
        document.getElementById("mail").setAttribute("value",data.email);
    }
});

document.getElementById("editSubmit").addEventListener("click",function () {
    var newUsername = document.getElementById("username").value;
    var newEmail = document.getElementById("mail").value;
    var formData = new FormData();
    formData.append("teacherId",getCookie("teacherId"));
    formData.append("name",newUsername);
    formData.append("email",newEmail);
    formData.append("header", document.getElementById("avatar").files[0]);
    console.log(formData);

    // const obj = {};
    // obj.teacherId = getCookie("teacherId");
    // obj.name = newUsername;
    // obj.email = newEmail;
    // const jsonStr = JSON.stringify(obj);
    // const json1 = JSON.parse(jsonStr);
    // console.log(json1);
    //
    // $.ajax({
    //     url: "http://47.101.189.80:28080/teachers/update",
    //     method: 'post',
    //     data: json1,formData,
    //     beforeSend: function (request) {
    //         request.setRequestHeader("authorization", "Bearer "+ getCookie("token"));
    //     },
    //     dataType:"json",
    //     success: function (data) {
    //         //window.location.href = "infoDetails.html";
    //     }
    // });

    $.ajax({
        url: "http://47.101.189.80:28080/teachers/update",
        method: 'post',
        data: formData,
        dataType:"json",
        mimeType:"multipart/form-data",
        cache:false,
        contentType: false,
        processData: false,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", "Bearer "+ getCookie("token"));
        },

        success: function (data) {
            window.location.href = "infoDetails.html";
        }
    });

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

function imgPreview(fileDom,i) {
    //判断是否支持FileReader
    if(window.FileReader) {
        var reader = new FileReader();
    } else {
        alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
    }
    //获取文件
    var file = fileDom.files[0];
    var imageType = /^image\//;
    //是否是图片
    if(!imageType.test(file.type)) {
        alert("请选择图片！");
        return;
    }
    //读取完成
    reader.onload = function(e) {
        //图片路径设置为读取的图片
        // img.src = e.target.result;
        document.getElementById('file-box').style.background = "url("+e.target.result+")no-repeat";//回显图片
        document.getElementById('file-box').style.backgroundSize = '200px 160px';
    };
    reader.readAsDataURL(file);
}