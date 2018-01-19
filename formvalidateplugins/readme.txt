@author 小鬼难缠
des:表单验证插件
API：1.rules对象，
    rules:{
        name:{
                    name: string/type,  和表单name属性相同
                    required: boolean/type,  是否是必填字段
                    rule: Array/type          校验规则 minLength最小长度 maxLength最大长度 repx 正则表达式 msg如果校验失败，返回的提示信息
                    [
                        {'minLength': number/type, 'msg': number/string}, 
                        {'maxLength': number/type, 'msg': number/string},
                        {'repx': number/string, 'msg': number/string}
                    ]
                }
    }
    2.outputmsg回掉函数，当验证失败返回的信息
    eg.
    $('#testForm').formValidate({
            rules:{
                username:{
                    name: '用户名',
                    required: true,
                    rule:[
                        {'minLength': 3, 'msg': '用户名长度不能小于三位'},
                        {'maxLength': 8, 'msg': '用户名长度不能大于八位'},
                        {'repx': '^[A-Za-z0-9]+$', 'msg': '用户名只能输入数字或者英语'}
                    ]
                },
                password:{
                    name: '密码',
                    required: true,
                    rule:[
                        {'minLength': 3, 'msg': '密码长度不能小于三位'},
                        {'maxLength': 8, 'msg': '密码长度不能大于八位'},
                        {'repx': '^[A-Za-z0-9]+$', 'msg': '密码只能输入数字或者英语'}
                    ]
                },
                email:{
                    name: '邮箱',
                    required: true,
                    rule:[
                        {'repx': '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$', 'msg': '邮箱格式不对'}
                    ]
                },
                age:{
                    name: '年龄',
                    required: false
                },
                sex:{
                    name: '性别',
                    required: false
                },
            },
            outputmsg:function(name, msg){
                // console.log(name);
                // console.log(msg);
            }

        });
        3.formValidate('validate')  用于校验，校验成功，返回true,否则返回false
        $('#testForm').formValidate('validate')