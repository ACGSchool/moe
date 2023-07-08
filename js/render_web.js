async function render_all(resolve=null){
    var temp = document.body.innerHTML
    Promise.resolve().then(()=>{
        temp = document.body.innerHTML
        $.get("../../sse/templete/header.html",function (data){
            temp = temp.replaceAll("{{header}}",data)
            return temp;
        }).then((res)=>{
            $.get("../../sse/templete/menu.html",function (data){

                temp = temp.replaceAll("{{menu}}",data)
                return temp;
            }).then((res)=>{
                $.get("../../sse/templete/footer.html",function (data){
                    temp = temp.replaceAll("{{footer}}",data)
                    return temp
                }).then(res=>{
                    document.body.innerHTML = temp
                    if (resolve!=null){
                        resolve()
                    }
                })
            })
        })
    })

}

// render_all()

function set_cookies(key,value,exp=7){
    $.cookie(key,JSON.stringify(value),{expires:exp,path:"/"})
}

function get_cookies(key){
    return $.cookie(key)
}

function is_exist_cookies(data){
    if (data===null||data==="null"||data===undefined){
        return false;
    }
    return true;
}

function render_templete(json,node,hidden=true){
    tpl = $(node).html()
    for (var key in json){
        if (hidden){
            tpl = tpl.replaceAll("<!--"+key+"!-->",json[key])
        }else{
            tpl = tpl.replaceAll(key,json[key])
        }
    }
    $(node).html(tpl)
}