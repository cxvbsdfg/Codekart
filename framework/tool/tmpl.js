

//github: https://github.com/yangjiePro/tmpl.js

module.exports = function (str, data) {
    var $ = '$' + (+ new Date)
        , fn = function (data) {
            var i, variable = [$], value = [[]];
            for (i in data) {
                variable.push(i);
                value.push(data[i]);
            }
            return (new Function(variable, fn.$))
                .apply(data, value).join("");
        };

    //将模板解析成函数
    fn.$ = fn.$ || $ + ".push('"
        + str.replace(/\\/g, "\\\\")
            .replace(/'/g, "\\'")  //防止单括号错误
            .replace(/[\r\t\n]/g, " ")
            .split("[:").join("\t")
            .replace(/((^|:])[^\t]*)'/g, "$1\r")
            .replace(/\t=([^\?]*?):]/g, "',$1,'")
            .replace(/\t=([^\?]*?)\?(.*?):]/g, "',this.$1||'$2','")   //  [:=data?:]  [:=data?任何内容:]
            .split("\t").join("');")
            .split(":]").join($ + ".push('")
            .split("\r").join("\\'")
        + "');return " + $;

    //如果未定义data则返回编译好的函数，使用时直接传入数据即可，
    //省去每次解析成函数的时间
    return data ? fn(data) : fn;
};
