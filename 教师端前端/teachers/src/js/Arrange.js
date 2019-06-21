document.getElementById("chapterName").innerHTML = getCookie("chapterName");
document.getElementById("SmallChapterName").innerHTML = getCookie("smallChapterName");

// document.getElementById("insertImg").addEventListener("click", function () {
//     var fileStr = document.getElementById("file").files[0];
//
//     var formData = new FormData();
//     formData.append("contentId",getCookie("courseId")+"_"+getCookie("chapterNum")+"_"+getCookie("smallChapterNum"));
//     var jDialog = "";
//     jDialog += "[";
//     jDialog+= "{dialogId:x"+",kind:1,content:\""+fileStr+"\"}]";
//     formData.append("jDialog",jDialog);
//
//     $.ajax({
//         url: "http://47.101.189.80:28080/teachers/addContent",
//         method: 'post',
//         data: formData,
//         dataType:"json",
//         mimeType:"multipart/form-data",
//         cache:false,
//         contentType: false,
//         processData: false,
//         beforeSend: function(request) {
//             request.setRequestHeader("authorization", "Bearer "+ getCookie("token"));
//         },
//         success: function(data) {
//             alert("success");
//         }
//     });
// });


document.getElementById("oneUpload").addEventListener("click",function () {
    var formData = new FormData();
    formData.append("contentId",getCookie("courseId")+"_"+getCookie("chapterNum")+"_"+getCookie("smallChapterNum"));
    formData.append("contentName",getCookie("smallChapterName"));
    var text = document.getElementById("contents").value;
    var array = text.split("#");
    var jDialog = "";
    jDialog += "[";
    for (let i = 0; i < array.length -1; i++) {
        jDialog+= "{dialogId:"+i+",kind:0,content:\""+array[i]+"\"},";
    }
    var end = array.length - 1;
    jDialog+= "{dialogId:"+end+",kind:0,content:\""+array[array.length-1]+"\"}";
    jDialog+="]";
    formData.append("jDialog",jDialog);

    $.ajax({
        url: "http://47.101.189.80:28080/teachers/addContent",
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
            alert("success");
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