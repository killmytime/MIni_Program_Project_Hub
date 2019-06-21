document.getElementById("chapterSubmit").addEventListener("click", function () {
    var chapter = document.getElementById("chapter").value;
    $.ajax({
            url: "http://47.101.189.80:28080/teachers/getContent",
            method: 'get',
            data: {contentId: chapter},
            beforeSend: function (request) {
                request.setRequestHeader("authorization", "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfVEVBQ0hFUiIsInN1YiI6IjE4ODE3NTQzNTQ1IiwiZXhwIjoxNTYxMzc4MTY3fQ.b_RJplLI9Ilb-Wrz4PXmx-bkSBSMwPwkmroXcOus8pIeoS7_YxqL4P6aiG8OpOnqocjo1ev595x7pWwCnwYONQ");
            },
            dataType: "json",
            success: function (data) {
                var dialogs = data.dialog;
                var contents = document.getElementById("contents");
                while (contents.children[0] != null) {
                    contents.removeChild(contents.children[0]);
                }
                console.log(dialogs);
                for (let i = 0; i < dialogs.length; i++) {
                    var dialog = dialogs[i];
                    var content = dialog.content;
                    var dialogId = dialog.dialogId + 1;
                    var div = document.createElement("div");
                    div.classList.add("alert");
                    div.classList.add("alert-info");
                    div.setAttribute("role", "alert");
                    var label = document.createElement("label");
                    label.innerText = "内容" + dialogId;
                    var textarea = document.createElement("textarea");
                    textarea.setAttribute("id", "contents" + dialogId);
                    textarea.style = "vertical-align: top;border:0;border-radius:5px;background-color: white;width: 100%;height: 100px;padding: 10px;resize: none;";
                    textarea.innerText = content;
                    div.appendChild(label);
                    div.appendChild(textarea);
                    contents.appendChild(div);
                }
                var editDiv = document.createElement("div");
                var input = document.createElement("input");
                input.setAttribute("type", "button");
                input.setAttribute("name", dialogs.length);
                input.setAttribute("id", "edit");
                input.setAttribute("value", "确认修改");
                editDiv.appendChild(input);
                contents.appendChild(editDiv);

                //weihh
                document.getElementById("edit").addEventListener("click", function () {
                    var length = document.getElementById("edit").getAttribute("name");
                    var formData = new FormData();
                    var jDialog = '';
                    jDialog += "[";
                    for (let i = 0; i < length; i++) {
                        var num = i + 1;
                        var id = "contents" + num;
                        console.log(document.getElementById(id).value);
                        var content = document.getElementById(id).value;
                        if (i === length - 1) {
                            jDialog += "{dialogId:" + i + ",kind:0,content:\"" + content + "\"}";
                            jDialog += "]";
                        } else {
                            jDialog += "{dialogId:" + i + ",kind:0,content:\"" + content + "\"},";
                        }
                    }

                    console.log(jDialog);
                    formData.append("jDialog", jDialog);
                    formData.append("contentId", getCookie("courseId") + "_" + getCookie("chapterNum") + "_" + getCookie("smallChapterNum"));

                    $.ajax({
                        url: "http://47.101.189.80:28080/teachers/modifyContent",
                        method: 'post',
                        data: formData,
                        dataType: "json",
                        mimeType: "multipart/form-data",
                        cache: false,
                        contentType: false,
                        processData: false,
                        beforeSend: function (request) {
                            request.setRequestHeader("authorization", "Bearer " + getCookie("token"));
                        },
                        success: function (data) {
                            alert("success");
                        }
                    });

                });

            },
            error: function () {
                console.log("获取失败");
                var contents = document.getElementById("contents");
                while (contents.children[0] != null) {
                    contents.removeChild(contents.children[0]);
                }
            }
        }
    )
});

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

