const fs = require('fs');

var logToCurrentEmailHistory = (fromValue, toValue, subjectValue, message) =>{
    var now = new Date().toString();
    var log = `---- From: ${fromValue} To :${toValue} Subject: ${subjectValue} Message: ${message} Date:${now}\n\n` ;
    fs.appendFile('currentEmail.log', log, (error) =>{
        if(error)
            console.log("Cannot save to currentEmail.log");
    });
}

var logExceptionToCurrentEmailHistory = (exceptionMessage) =>{
    fs.appendFile('currentEmail.log', `${exceptionMessage} ${ new Date().toString() }`);
}

module.exports = {
    logToCurrentEmailHistory,
    logExceptionToCurrentEmailHistory
}