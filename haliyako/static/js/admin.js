//let url = "http://localhost:8080";
let url = "https://haliyetu.herokuapp.com";
jQuery(document).ready(function( $ ) {

    $('#login').on('click', function () {
        var Url = url + "/login_admin?username=" + $('#form22').val() + "&password=" +  $('#form23').val();
        console.log(Url);
        const Http = new XMLHttpRequest();
         Http.open("Get", Url);
         Http.send();

         Http.onreadystatechange=function() {
             if (this.readyState == 4 && this.status == 200) {
                 var ret = this.responseText;
                 if (ret == 'success'){
                     window.location.href = url + "/admin"
                 }else{
                   $('#error_message').show()
                 }
             }
         }

        });
});

function show_comments(id){
    let page = $('#page').val();
    let nid =0;
    let pid =0;
    if(page == 'news'){
        nid = id;
    }else if(page == 'chats'){
        pid = id;
    }
    var Url = url + "/admin_comments?nid=" + nid + "&pid=" + pid;
    console.log(Url);
    const Http = new XMLHttpRequest();
     Http.open("Get", Url);
     Http.send();

     Http.onreadystatechange=function() {
         if (this.readyState == 4 && this.status == 200) {
             let s = Http.responseText;
                    s = s.replace(/\\n/g, "\\n")
                   .replace(/\\'/g, "\\'")
                   .replace(/\\"/g, '\\"')
                   .replace(/\\&/g, "\\&")
                   .replace(/\\r/g, "\\r")
                   .replace(/\\t/g, "\\t")
                   .replace(/\\b/g, "\\b")
                   .replace(/\\f/g, "\\f");
                // remove non-printable and other non-valid JSON chars
                s = s.replace(/[\u0000-\u0019]+/g,"");
                const myObj = JSON.parse(s);
                var texts = myObj.texts;
                var authors = myObj.authors;
                var downs =  myObj.downs;
                var ups = myObj.ups;
                var ids = myObj.mids;
                var replies = myObj.replies;
                var parents = myObj.parent_ids;
                var dates = myObj.dates;
                let tbody = document.getElementById("comments_table_body");
                tbody.textContent = "";
                for(var i =0; i < ids.length; i++){
                    let tr = document.createElement("tr");
                    tr.id = ids[i] + 'c';
                    tr.appendChild(create_td(ids[i]));
                    tr.appendChild(create_td(parents[i]));
                    tr.appendChild(create_td(ups[i]));
                    tr.appendChild(create_td(downs[i]));
                    tr.appendChild(create_td(dates[i]));
                    tr.appendChild(create_td(authors[i]));
                    tr.appendChild(create_td(texts[i]));
                    let del_btn = document.createElement("button");
                    del_btn.textContent = "delete";
                    del_btn.onclick = remove_comment;
                    del_btn.id = ids[i];
                    tr.appendChild(del_btn);
                    tbody.appendChild(tr);
                }
                $('#modal_title').text("Comments for " + id);
                $('#comments_modal').modal('show');

         }
     }

}

function remove_comment(){
    let id = this.id;
    let page = "comment";
    var Url = url + "/admin_delete?id=" + id + "&page=" + page;
    console.log(Url);
    const Http = new XMLHttpRequest();
     Http.open("Get", Url);
     Http.send();
    Http.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            let s = Http.responseText;
            console.log(s + "inside");
            if(s == "success"){
                let row = document.getElementById(id + "c");
                row.parentNode.removeChild(row);
            }
        }
    }
}

function create_td(text){
    let td = document.createElement("td");
    td.textContent = text;
    return td;
}

function remove(id){
    let page = $('#page').val();
    var Url = url + "/admin_delete?id=" + id + "&page=" + page;
    console.log(Url);
    const Http = new XMLHttpRequest();
     Http.open("Get", Url);
     Http.send();
    Http.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            let s = Http.responseText;
            console.log(s);
            if(s == "success"){
                let row = document.getElementById(id);
                row.parentNode.removeChild(row);
            }
        }
    }
}