'use strict'
$('form :input').blur(function () {
    var $parent = $(this).parent();

    //验证用户名

    if($(this).is('#user')){
        if(this.value==""){
            var errorMsg = "请输入用户名";
            $parent.find(".formtips").remove();
            $parent.append('<span class="formtips onError">'+ errorMsg +'</span> ');
        }
    }
    //验证密码
    if($(this).is('#pw')){
        $parent.find(".formtips").remove();
        if(this.value.length<6){
            var errorMsg = "请输入至少6位长密码";
            
            $parent.append('<span class="formtips onError">'+ errorMsg +'</span> ');
        }
    }
    if($(this).is('#pw2')){
        $parent.find(".formtips").remove();
        var pw = document.getElementById('pw').value;
        if(this.value !== pw){
            var errorMsg = "两次密码不一致";
            $parent.append('<span class="formtips onError">'+ errorMsg +'</span> ');
        }
    }
})