document.getElementById("course").innerHTML = getCookie("courseName");

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

$.ajax({
    url: "http://47.101.189.80:28080/teachers/allProcess",
    method: 'get',
    data: {teacherId: getCookie("teacherId"),courseId:getCookie("courseId")},
    beforeSend: function (request) {
        request.setRequestHeader("authorization", "Bearer "+ getCookie("token"));
    },
    dataType:"json",
    success: function (data) {
        console.log(data);
        var html = '';
        for (var j in data) {
            if (data.hasOwnProperty(j)) {
                var element = data[j];
                html = '<tr>';
                html += '<td>' + element.studentId + '</td>';
                html += '<td>' + element.courseId + '</td>';
                html += '<td>' + element.processId + '</td>';
                html += '<td>' + element.processList + '</td>';
                html += '<td>' + element.presentList + '</td>';
                html += '</tr>';
                $('#CourseDetails').append(html);
            }
        }
        html += '</table>';

        $('#CourseDetails').append(html);
    }
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