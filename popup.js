var firstname;
var lastname;
var address;
var numberaddress;
var postalcode;
var city;
var country;
var numberCard;
var cvc;
var month;
var year;
var cardholder;

// DETECT DEVTOOLS
// !function () {
//     function detectDevTool(allow) {
//         if (isNaN(+allow)) allow = 100;
//         var start = +new Date();
//         debugger;
//         var end = +new Date();
//         if (isNaN(start) || isNaN(end) || end - start > allow) {
//             alert('DEVTOOLS detected. all operations will be terminated.');
//             document.write('DEVTOOLS detected.');
//         }
//     }
//     if (window.attachEvent) {
//         if (document.readyState === "complete" || document.readyState === "interactive") {
//             detectDevTool();
//             window.attachEvent('onresize', detectDevTool);
//             window.attachEvent('onmousemove', detectDevTool);
//             window.attachEvent('onfocus', detectDevTool);
//             window.attachEvent('onblur', detectDevTool);
//         } else {
//             setTimeout(argument.callee, 0);
//         }
//     } else {
//         window.addEventListener('load', detectDevTool);
//         window.addEventListener('resize', detectDevTool);
//         window.addEventListener('mousemove', detectDevTool);
//         window.addEventListener('focus', detectDevTool);
//         window.addEventListener('blur', detectDevTool);
//     }
// }();

chrome.storage.sync.get(['key'], function (result) {
    firstname = result.key[0];
    lastname = result.key[1];
    address = result.key[2].match(/[a-zA-Z]+/g);
    numberaddress = result.key[2].match(/\d+/g);
    postalcode = result.key[3];
    city = result.key[4];
    country = result.key[5].toUpperCase();
    numberCard = result.key[6];
    cvc = result.key[7];
    month = result.key[8];
    year = result.key[9];
    cardholder = result.key[10];
    discord = result.key[11];
});