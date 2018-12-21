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

//TODO: 防抖 截流

//end of utilities

// export default utility;