function error_happend(str, remove=true){
    error_happend_e = document.createElement("p")
    error_happend_e.classList.add("error_happend")
    if (remove===true){
        $("#content").empty()
    }
    error_happend_e.innerHTML = str
    document.getElementById("content").insertAdjacentElement("afterbegin",error_happend_e)
    // $(".shop_panel").addClass("hidden")
    // $(".error_happend").html(str)
    // $(".error_happend").removeClass("hidden")

}

function checkRegister(){
    sci = get_cookies("school_information")
    if (!is_exist_cookies(sci)){
        error_happend("您未申请学校，请先申请学校</br>申请网址 <a style='color: white;' href='https://acg.school/apply.html'>https://acg.school/apply.html</a>")
        return true
    }
    return false
}

function checkUserRegister(){
    personal_information = get_cookies("personal_information")
    if (!is_exist_cookies(personal_information)){
        error_happend("您尚未在教育委员会注册您的学生信息")
        return true
    }
    return false
}