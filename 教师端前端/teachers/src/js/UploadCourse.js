$.ajax({
    url: "http://47.101.189.80:28080/teachers/info",
    method: 'get',
    data: {teacherId: getCookie("teacherId")},
    beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer "+ getCookie("token"));
    },
    dataType:"json",
    success: function (data) {
        document.getElementById("username").innerHTML = data.name;
    }
});


document.getElementById("submit").addEventListener("click",function () {
    var bigChapter = document.getElementById("courseId").value;
    var chapterNum = document.getElementById("chapterBox").value;
    var smallChapterNum = document.getElementById("smallChapterBox").value;
    var chapterName = document.getElementById("chapterName").value;
    var smallChapterName = document.getElementById("smallChapterName").value;
    setCookie("courseId",bigChapter);
    setCookie("chapterNum",chapterNum,365);
    setCookie("chapterName",chapterName,365);
    setCookie("smallChapterNum",smallChapterNum,365);
    setCookie("smallChapterName",smallChapterName,365);
    var contentId = getCookie("courseId")+"_"+getCookie("smallChapterNum");

    $.ajax({
        url: "http://47.101.189.80:28080/teachers/addDirectory",
        method: 'post',
        data: {courseId: getCookie("courseId"),jDirectory: "{directoryId:\""+contentId+"\",name:\""+ smallChapterName+"\"}"},
        beforeSend: function (request) {
            request.setRequestHeader("authorization", "Bearer "+ getCookie("token"));
        },
        dataType:"json",
        success: function (data) {
            alert("success");
        }
    });


    console.log(document.cookie);

    window.location.href = "Arrange.html";
});

document.getElementById("createCourse").addEventListener("click",function () {
   var courseName = document.getElementById("course").value;
   var teacher = document.getElementById("teacher").value;
   var courseDetail = document.getElementById("courseDetails").value;
   var formData = new FormData();
   formData.append("courseName",courseName);
    formData.append("courseDetail",courseDetail);
    formData.append("teacherName",teacher);
    formData.append("teacherId",getCookie("teacherId"));
    formData.append("courseCover",document.getElementById("courseCover").files[0]);
    formData.append("flag","0");

    $.ajax({
        url: "http://47.101.189.80:28080/teachers/createCourse",
        method: 'post',
        data: formData,
        dataType:"json",
        mimeType:"multipart/form-data",
        cache:false,
        contentType: false,
        processData: false,
        beforeSend: function(request) {
            request.setRequestHeader("authorization", "Bearer "+ getCookie("token"));
        },
        success: function(data) {
            alert("成功");
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
