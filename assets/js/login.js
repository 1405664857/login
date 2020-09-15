$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 自定义检验标准
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })


    // 给注册按钮添加提交事件
    $('#reg-box').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功，请登录')
            $('#link_login').click()

        })
    })

    // 给 登录表单添加提交事件
    $('#login-box').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,
            success: function (res) {
                if (res.status === 0) {
                    layer.msg('登陆成功！')
                    location.href = '../../index.html'
                    localStorage.setItem('token', res.token)
                } else {
                    layer.msg(res.message + '&nbsp;账号密码不正确！')
                }
            }
        })
    })
})