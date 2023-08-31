const moment = require("moment");

const formateMessage = (username,text)=>{
    return {
        username,
        text,
        time: moment().format('LT')
    }
}

module.exports = formateMessage;