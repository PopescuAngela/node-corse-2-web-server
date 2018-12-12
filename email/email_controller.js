const emailLogger = require('../util/currentEmailLogger');

var from;
var toEmailList;
var messageText;
var subject;

//async call to send email to a list
var sendEmailToList = (from, toEmailList, subject, message, timeoutValue) =>{
    this.from = from;
    this.toEmailList = toEmailList;
    this.subject = subject;
    this.messageText = message;
    if(!toEmailList){
        emailLogger.logExceptionToCurrentEmailHistory('Call send Email with list empty');
        return;
    }

    //1. Split to by ,
    var toArray = toEmailList.split(",");
    if (toArray){
        toArray.forEach(((item) => {
            sendEmail(item, timeoutValue);
       }));
    }
}

var sendEmail = (email, timeout) =>{
     // 1. Try to get the last name from email
     var firstName = retrieveLastNameFromEmail(email);
     // 2. Update the message based on last name if exists
     var formattedMessage = formatEmailMessage(firstName);  
     emailLogger.logToCurrentEmailHistory(from, email, subject, formattedMessage);
     waitSeconds(timeout*1000);
     console.log(`Email send to ${email}`);
}

var retrieveLastNameFromEmail = (email) => {
    if(email) {
       if(email.includes(".") === true) {
           console.log(email.split(".")[0])
           return email.split(".")[0];
       }
    }
}

var formatEmailMessage = (firstName) => {
    if(this.messageText.includes("%") === true ) {
        if (firstName) {
           return this.messageText.replace(/%/g, `${firstName}`);
        } else {
            // remove the %
             return this.messageText.replace(/%/g, ``);
        } 
    }
    
    return this.messageText;
}

function waitSeconds(iMilliSeconds) {
    var counter= 0
        , start = new Date().getTime()
        , end = 0;
    while (counter < iMilliSeconds) {
        end = new Date().getTime();
        counter = end - start;
    }
}

module.exports = {
    sendEmailToList
}