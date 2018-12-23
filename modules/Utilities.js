//utilities
const utility = {}

utility.serialize = function (data) {
    let result = '';

    for (let item in data) {
        result += `${item}=${data[item]}&`
    }

    result = result.replace(/&$/, '');
    return result;
}

utility.throttle = (callback, duration) => {
    let flag = true;
    let id = null;

    return () => {
        if(flag) {
            flag = false;

            callback();
            clearTimeout(id);
            id = setTimeout(() => {
                flag = true;
            }, duration);
        }  
    }
    
}

utility.debounce = (callback, duration) => {
    let id = null;
    
    return () => {
        clearTimeout(id);
        id = setTimeout(() => {
            callback();
        }, duration);
    }
}

//TODO: debounce + throttle;
//end of utilities