// import utility from "../modules/Utilities";

var $_$ = $Q = function (node, scope) {
    return new JKQ(node, scope);
};

//TODO: ==> 创造div 改outerHTML 上树

function JKQ(node, scope) {
    this.length = 0;
    this._toggleClassCurrent = 0;
    this._animationQueue = [];

    this.init(node, scope);
}


JKQ.prototype = Object.create(Array.prototype);

JKQ.prototype.init = function(node,scope) {

    this.catchItem(node, scope);
}

JKQ.prototype.catchItem = function(node, scope) {
    let tempNodes = null;

    if (typeof node !== 'string') {
        this[0] = node;
        this.length++;
        return;
    }

    if (scope) {
        tempNodes = scope.querySelectorAll(node);
    } else {
        tempNodes = document.querySelectorAll(node);
    }

    for (let i of tempNodes) {
        this[this.length] = i;
        this.length++;
    }
}

JKQ.prototype.A_A = JKQ.prototype.add = function (node, scope) {

    this.catchItem(node, scope);

    return this;
}

JKQ.prototype.T_T = JKQ.prototype.html = function (param) {
    if(param === undefined) {
        return this[0].innerHTML;
    } else {
        if (typeof param === 'string') {
            for(let i=0; i<this.length; i++) {
                this[i].innerHTML = param;
            }
        } else if (typeof param === 'function') {
            for(let i=0; i<this.length; i++) {
                this[i].innerHTML = param(i, this[i].innerHTML);
            }
        }
            return this;
    }
}

JKQ.prototype.V_V = JKQ.prototype.val = function (param) {
    if(param === undefined) {
        return this[0].value;
    } else {
        if (typeof param === 'string') {
            for(let i=0; i<this.length; i++) {
                this[i].value = param;
            }
        } else if (typeof param === 'function') {
            for(let i=0; i<this.length; i++) {
                this[i].value = param(i, this[i].value);
            }
        }
            return this;
    }
}

//TODO: 自动加单位
JKQ.prototype.S_S = JKQ.prototype.css = function (param) {
    if(typeof param === 'string') {
        return getComputedStyle(this[0])[param];
    } else if (typeof param === 'object') {
        for(let i=0; i<this.length; i++) {
            for(let j in param) {
                this[i].style[j] = param[j];
            }
        }
        return this;
    }
}

JKQ.prototype.P_P = JKQ.prototype.prop = function (prop, value) {
    if(value === undefined) {
        return this[0][prop];
    } else {
        for(let i=0; i<this.length; i++) {
            this[i][prop] = value;
        }
        return this;
    }
}

JKQ.prototype.R_R = JKQ.prototype.attr = function (attr, value) {
    if(value === undefined) {
        return this[0].getAttribute(attr);
    } else {
        for(let i=0; i<this.length; i++) {
            this[i].setAttribute(attr, value);
        }
        return this;
    }
}

JKQ.prototype.H_C = JKQ.prototype.hasClass = function (className) {
    const regex = new RegExp(`\\b${className}\\b`);

    for (let i = 0; i < this.length; i++) {
        if (regex.test(this[i].className)) {
            continue;
        } else {
            return false;
        }
    }

    return true;
}

JKQ.prototype.A_C = JKQ.prototype.addClass = function (className) {
    const regex = new RegExp(`\\b${className}\\b`);

    for(let i=0; i<this.length; i++) {
        if(regex.test(this[i].className)) {
            continue;
        } else {
            this[i].className += ` ${className}`;
            this[i].className = this[i].className.replace(/\s+/g, ' ');
        }
    }
    return this;
}

JKQ.prototype.R_C = JKQ.prototype.removeClass = function (className) {
    const regex = new RegExp(`\\b${className}\\b`);

    for(let i=0; i<this.length; i++) {
        if(regex.test(this[i].className)) {
            this[i].className = this[i].className.replace(regex, '');
        } else {
            continue;
        }
    }
    return this;
}

JKQ.prototype.T_C = JKQ.prototype.toggleClass = function (classNames) {
    const self = this;
    let prevIndex = null;
    let index = this._toggleClassCurrent;

    if(index === 0) {
        prevIndex = classNames.length-1;
    } else if(index >= classNames.length) {
        prevIndex = index-1;
        this._toggleClassCurrent = index = 0;
    } else {
        prevIndex = index-1;
    }

    this.removeClass(classNames[prevIndex]);
    this.addClass(classNames[index]);

    this._toggleClassCurrent++
    return self;
}

//TODO: animation;
JKQ.prototype.A_M = JKQ.prototype.animation = function (data, duration) {

}

//JSONP
$_$.J_P = $_$.jsonp = $Q.J_P = $Q.jsonp = function (url, data, keyword, fnName) {
    if(!fnName) {
        fnName = 'jsonpRequest';
    }
    
    const randomName = `${fnName}_${+new Date()}`;

    const promise = new PinkiePromise((resolve, reject) => {
        let script = document.createElement('script');
        let serializedData = utility.serialize(data);

        window[randomName] = function (resp) {
            delete window[randomName];
            script.parentNode.removeChild(script);
            resolve(resp);
        }

        script.src = `${url}${serializedData}&${keyword}=${randomName}`;

        document.body.appendChild(script);

        script.onerror = function () {
            delete window[randomName];
            script.parentNode.removeChild(script);
            reject(`Something went wrong...`);
        }
    })

    return promise;
} 

// Promise.prototype.done = function(callback) {
//     this.then(callback, function() {
//         return this;
//     })
// }

//jsonp(url, data, keyword).done().catch();
//AJAX
$_$.A_X = $_$.ajax = $Q.A_X = $Q.ajax = function (info, async) {
    const method = info.type ? info.type : 'get';
    const body = utility.serialize(info.data);
    const url = info.url;
    const isAsync = async ? async : true;

    const xhr = new XMLHttpRequest();

    if(method === 'get') {
        xhr.open(method, `${url}${body}`, isAsync);

    } else if(method === 'post') {
        xhr.open(method, url, isAsync);
    }

    xhr.onreadystatechange = function () {
        if(this.readyState !== 4) {
            return;
        }
        if(this.status >= 200 && this.status < 300) {
            const resp = JSON.parse(this.responseText);

            info.success(resp);
        } else {
            info.error(xhr);
        }
    }

    if(method === 'get') {
        xhr.send(null);
    } else if(method === 'post') {
        xhr.setRequestHeader('context-type', 'application/x-www-form-urlencoded');
        xhr.send(body);
    }
}

//promiseAjax
$_$.P_X = $_$.promiseAjax = $Q.P_X = $Q.promiseAjax = function(info) {
    const promise = new PinkiePromise ((resolve, reject) => {
        info.success = resolve;
        info.error = reject;

        this.ajax(info)
    })
    
    return promise
}