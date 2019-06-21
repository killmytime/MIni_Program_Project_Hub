$.ajax({
    url: "http://47.101.189.80:28080/teachers/getOneCourse",
    method: 'get',
    data: {teacherId: getCookie("teacherId"),courseId:getCookie("courseId")},
    beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer "+ getCookie("token"));
    },
    dataType:"json",
    success: function (data) {
        document.getElementById("courseName").setAttribute("value",data.courseName);
        document.getElementById("courseDetails").setAttribute("value",data.courseDetail);
        document.getElementById("teacher").setAttribute("value",data.teacherName);
    }
});

document.getElementById("editSubmit").addEventListener("click",function () {
    var newCourseName = document.getElementById("courseName").value;
    var newCourseDetails = document.getElementById("courseDetails").value;
    var newTeacher = document.getElementById("teacher").value;

    const obj = {};
    obj.courseId = getCookie("courseId");
    obj.courseName = newCourseName;
    obj.courseDetail = newCourseDetails;
    obj.teacherName = newTeacher;
    obj.teacherId = getCookie("teacherId");
    obj.flag = "0";
    const jsonStr = JSON.stringify(obj);
    const json1 = JSON.parse(jsonStr);
    console.log(json1);

    $.ajax({
        url: "http://47.101.189.80:28080/teachers/modifyCourse",
        method: 'post',
        data: json1,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", "Bearer "+ getCookie("token"));
        },
        dataType:"json",
        success: function (data) {
            //window.location.href = "infoDetails.html";
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