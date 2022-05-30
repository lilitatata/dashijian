$(function(){
    $('#link_reg').click(()=>{
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').click(()=>{
        $('.login-box').show();
        $('.reg-box').hide();
    });
    //引入form模块
    const form = layui.form;
    const layer = layui.layer;
    //设置根路径
    // const baseUrl = "http://www.liulongbin.top:3007";
// 自定义检验规则
form.verify({
    // 密码校验
    pwd:[/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 确认密码的校验规则
    repwd:(value)=>{
        const pwd = $('#form_reg [name=password]').val();
        if(pwd !==value)return "两次密码不一致";
    },
});
//注册功能
$('#form_reg').on('submit',(e)=>{
    e.preventDefault();
    $.ajax({
        type:'POST',
        url:"/api/reguser",
        data:{
            username: $("#form_reg [name=username").val(),
            password: $("#form_reg [name=password").val(),
        },
        success: (res)=>{
            if(res.status !==0) return layer.msg(res.message)
            layer.msg('注册成功！');
            $('#link_login').click();
        }
    })
})
//登录功能
$('#form_login').on('submit',function(e){
 e.preventDefault();
 $.ajax({
     type: 'POST',
     url: "/api/login",
     data:$(this).serialize(),
     success:(res)=>{
         if(res.status !==0) return layer.msg('登录失败');
         layer.msg('登录成功');
         localStorage.setItem('token',res.token)
         location.href = '/index.html';
     }
 })
})
});
