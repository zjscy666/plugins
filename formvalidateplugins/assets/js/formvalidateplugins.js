(function ($) {
    $.fn.formValidate = function(options){
        if (typeof options == 'string') {
            var method = $.fn.formValidate.methods[options];
            if (method) {
                var array = Array.prototype.slice.call(arguments, 1);
                array.unshift(this);
                return method.apply(this, array);
            } else {
                return undefined;
            }
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'formValidate');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'formValidate', {
                    options: $.extend({}, $.fn.formValidate.defaults, options)
                });
            }
        });
    }
    $.fn.formValidate.defaults = {
        rules: {},
        outputmsg:function(name, msg){
            // console.log(name);
            // console.log(msg);
        } // 输出对应的信息
    };
    $.fn.formValidate.methods = {
        validate: function (jq) {
            var result = false;
            var _data = $.data(jq[0], "formValidate");
            var _output = _data.options.outputmsg;
            var rules = _data.options.rules;
            for (var k in rules) {
                var opts = rules[k];
                var ele = jq.find('[name = ' + k +']');
                if (ele.length == 1) {
                    if (opts.required) {
                        var _val = ele.val();
                        var _name = opts.name;
                        if (isEmpty(jq[0], _val, k, _name, _output)) {
                            return;
                        } else {
                            var _validaterule = opts.rule;
                            if (!isValidate(jq[0], _val, k, _validaterule, _output)) {
                                return;
                            };
                        }
                    }
                }
            }
            result = true;
            return result;
        }
    };
    function isEmpty(target, value, name, msgname, cb) {
        if (value == '') {
            var _msg = msgname + '不能为空';
            cb.call(target, name, _msg);
            return true;
        } else {
            return false;
        } 
    };
    function isValidate(target, value, name, rules, cb) {
        var _result = true;
        rules.every(function(v, index){
            if (v.minLength) {
                if (value.length < v.minLength) {
                    cb.call(target, name, v.msg);
                    _result = false;
                    return false;
                }
            };
            if (v.maxLength) {
                if (value.length > v.maxLength) {
                    cb.call(target, name, v.msg);
                    _result = false;
                    return false;
                }
            };
            if (v.repx) {
                var _repx = new RegExp(v.repx);
                if (!_repx.test(value)) {
                    cb.call(target, name, v.msg);
                    _result = false;
                    return false;
                }
            };
            return true;
        });
        return _result;
    };
})(jQuery)