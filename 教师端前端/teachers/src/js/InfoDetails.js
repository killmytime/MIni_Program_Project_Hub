$.ajax({
    url: "http://47.101.189.80:28080/teachers/info",
    method: 'get',
    data: {teacherId: getCookie("teacherId")},
    beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer " + getCookie("token"));
    },
    dataType: "json",
    success: function (data) {
        document.getElementById("username").innerHTML = data.name;
        document.getElementById("ID").innerHTML = data.teacherId;
        document.getElementById("phoneNum").innerHTML = data.number;
        document.getElementById("mail").innerHTML = data.email;
        document.getElementById("invite").innerHTML = data.invitation;
        document.getElementById("password").innerHTML = data.password;
    }
});

$.ajax({
    url: "http://47.101.189.80:28080/teachers/getAllCourse",
    method: 'get',
    data: {teacherId: getCookie("teacherId")},
    beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer " + getCookie("token"));
    },
    dataType: "json",
    success: function (data) {
        // var table = document.createElement("table");
        // table.style = "margin-top: 50px";
        // table.setAttribute("border", "1");
        // table.classList.add("table");
        // table.classList.add("table-striped");
        // table.classList.add("table-bordered");
        // var trFirst = document.createElement("tr");
        // var tdName = document.createElement("td");
        // tdName.innerText = "课程名称";
        // var tdDetail = document.createElement("td");
        // tdDetail.innerText = "课程细节";
        // trFirst.appendChild(tdName);
        // trFirst.appendChild(tdDetail);
        // table.appendChild(trFirst);
        // for (var j in data) {
        //     if (data.hasOwnProperty(j)) {
        //         var element = data[j];
        //         var trElse=document.createElement("tr");
        //         var tdCourseId=document.createElement("td");
        //         tdCourseId.innerText=element.courseId;
        //         var tdCourseName=document.createElement("td");
        //         tdCourseName.innerText=element.courseName;
        //         var tdCourseDetail=document.createElement("td");
        //         tdCourseDetail.innerText=element.courseDetail;
        //
        //         var tdInput=document.createElement("td");
        //         var input = document.createElement("input");
        //         input.setAttribute("type", "button");
        //         input.setAttribute("value", "查看课程");
        //         input.classList.add("checkCourse");
        //         input.setAttribute("name", element.courseId);
        //         input.onclick=function(ev){
        //           checkCourse(this.name);
        //         };
        //
        //         tdInput.appendChild(input);
        //
        //         trElse.appendChild(tdCourseId);
        //         trElse.appendChild(tdCourseName);
        //         trElse.appendChild(tdCourseDetail);
        //         trElse.appendChild(tdInput);
        //         table.appendChild(trElse);
        //     }
        // }

        var html = '<table border=1 style="margin-top: 50px" class="table table-striped table-bordered">';
        html += '<tr>';
        html += '<td>' + '课程ID' + '</td>';
        html += '<td>' + '课程名称' + '</td>';
        html += '<td>' + '课程细节' + '</td>';
        html += '<td>' + '       ' + '</td>';
        html += '<td>' + '       ' + '</td>';
        html += '<td>' + '       ' + '</td>';
        html += '</tr>';
        for (var j in data) {
            if (data.hasOwnProperty(j)) {
                var element = data[j];
                html += '<tr>';
                html += '<td>' + element.courseId + '</td>';
                html += '<td>' + element.courseName + '</td>';
                html += '<td>' + element.courseDetail + '</td>';
                html += '<td><input type="button" value="查看课程" class="checkCourse"  onclick="checkCourse('+element.courseId+','+element.courseName+')">'+'</td>';
                if (element.flag ===0 || element.flag ===null) {
                    html += '<td><input type="button" value="修改课程" class="editCourse"  onclick="editCourse('+element.courseId+')">'+'</td>';
                    html += '<td><input type="button" value="修改状态" class="postCourse"  onclick="postCourse('+element.courseId+')">'+'</td>';
                } else {
                    html += '<td>'+'</td>';
                    html += '<td>'+'</td>';
                }
                html += '</tr>'

            }
        }
        html += '</table>';

        $('#courseTable').append(html);
    }
});

function checkCourse(courseId,courseName) {
    setCookie('courseId', courseId);
    setCookie('courseName', courseName);
    window.location.href = "courseCheck.html";

}

function editCourse(courseId) {
    setCookie('courseId', courseId);
    window.location.href = "editCourse.html";

}

function postCourse(courseId) {
    $.ajax({
        url: "http://47.101.189.80:28080/teachers/postCourse",
        method: 'post',
        data: {courseId: courseId,flag:1},
        beforeSend: function (request) {
            request.setRequestHeader("authorization", "Bearer " + getCookie("token"));
        },
        dataType: "json",
        success: function (data) {

        }
    });
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}