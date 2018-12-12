const emailLogger = require('../util/currentEmailLogger');
const emailService = require('./email_service');

var from;
var password;
var toEmailList;
var messageText;
var subject;

//async call to send email to a list
var sendEmailToList = (from, password, toEmailList, subject, message, timeoutValue) =>{ 
    this.from = from;
    this.toEmailList = toEmailList;
    this.subject = subject;
    this.messageText = message;
    this.password = password;
    if(!toEmailList){
        emailLogger.logExceptionToCurrentEmailHistory('Call send Email with list empty');
        return;
    }

    //1. Split to by ,
    var toArray = toEmailList.split(",");
    // return new Promise ((resolve, reject) => {
        if (toArray){
            toArray.forEach(((item) => {
                sendEmail(item, timeoutValue);
           }));
        }
    // });
}    

var sendEmail = (email, timeout) =>{
     // 1. Try to get the last name from email
    var firstName = retrieveLastNameFromEmail(email);
     // 2. Update the message based on last name if exists
    var formattedMessage = formatEmailMessage(firstName);  
       // setup email data with unicode symbols
    emailService.sendMail(this.from, this.password, email, this.subject, formattedMessage, (errorMessage, result)=> {
        waitSeconds(timeout*1000);
    }); 
}

var retrieveLastNameFromEmail = (email) => {
    if(email) {
       if(email.split("@")[0].includes(".") === true) {
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

 var waitSeconds = (iMilliSeconds) => {
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