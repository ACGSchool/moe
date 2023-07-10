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
function set_data_storge(key,value){
    localStorage.setItem(key,value)
}
function set_data(key,value){
    set_data_storge(key,JSON.stringify(value))

}
function get_data(key){
    return localStorage.getItem(key)
}
// render_all()

function set_cookies(key,value,exp=120){
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
function random_range_floor(a,b){
    return parseFloat(Math.random() * (b - a + 1) + a)

}
function load_data_by_arr(key){
    temp_data = get_data(key)
    if (!is_exist_cookies(temp_data)){
        temp_data = []
    }else{
        temp_data = JSON.parse(temp_data)
    }
    return temp_data
}
function get_day(){
    now = new Date()
    moth = now.getUTCMonth()
    day = now.getUTCDate()
    if (moth<10){
        moth = "0"+(moth+1)
    }
    if (day<10){
        day = "0"+day
    }
    return now.getFullYear()+"-"+moth+"-"+day;
}
function clear_all_school_information(){
    apply_list = get_cookies("apply_list")
    personal_information = get_cookies("personal_information")
    clearAllCookie()
    if (is_exist_cookies(personal_information)){
        set_cookies("personal_information",JSON.parse(personal_information))
    }
    if (is_exist_cookies(apply_list)){
        set_cookies("apply_list",JSON.parse(apply_list))
    }
}
function add_fees(name,price){
    fee_logs = load_data_by_arr("fee_logs")
    if (!is_exist_cookies(fee_logs)){
        fee_logs = []
    }else{
        fee_logs = JSON.parse(fee_logs)
    }
    fee_logs.unshift({"name":name,"price":price,"time":get_day(),"status":0})
    set_data("fee_logs",fee_logs)
}
function add_logs(name,detail,color="black"){
    logs_ces = load_data_by_arr("logs")
    logs_ces.unshift({"name":name,"time":get_day(),"status":0,"detail":detail,"color":color})
    set_data("logs",logs_ces)
}
function clearAllCookie() {
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i =  keys.length; i--;)
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();// 清除当前域名路径的有限日期
        document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();// Domain Name域名 清除当前域名的
        document.cookie = keys[i] + '=0;path=/;domain=baidu.com;expires=' + new Date(0).toUTCString();// 清除一级域名下的或指定的
    }
}
function load_cookies(key){
    datas = get_cookies(key)
    if (!is_exist_cookies(datas)){
        datas = {}
    }else{
        datas = JSON.parse(datas)
    }
    return datas
}
function load_cookies_by_arr(key){
    datas = get_cookies(key)
    if (!is_exist_cookies(datas)){
        datas = []
    }else{
        datas = JSON.parse(datas)
    }
    return datas
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

function getParams(params,key){
    if(params.has(key)){
        return params.get(key)
    }
    return "underfined";


}