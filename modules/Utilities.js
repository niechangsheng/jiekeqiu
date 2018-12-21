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

//end of utilities

export {utility};