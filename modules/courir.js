if (!window.isTop) {
    var data = 'test';
    chrome.runtime.sendMessage({ sendBack: true, data: data });
}


// DETECT DEVTOOLS
!function () {
    function detectDevTool(allow) {
        if (isNaN(+allow)) allow = 100;
        var start = +new Date();
        debugger;
        var end = +new Date();
        if (isNaN(start) || isNaN(end) || end - start > allow) {
            alert('DEVTOOLS detected. all operations will be terminated.');
            document.write('DEVTOOLS detected.');
        }
    }
    if (window.attachEvent) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            detectDevTool();
            window.attachEvent('onresize', detectDevTool);
            window.attachEvent('onmousemove', detectDevTool);
            window.attachEvent('onfocus', detectDevTool);
            window.attachEvent('onblur', detectDevTool);
        } else {
            setTimeout(argument.callee, 0);
        }
    } else {
        window.addEventListener('load', detectDevTool);
        window.addEventListener('resize', detectDevTool);
        window.addEventListener('mousemove', detectDevTool);
        window.addEventListener('focus', detectDevTool);
        window.addEventListener('blur', detectDevTool);
    }
}();

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

var sizemen;
chrome.storage.sync.get(['courir'], function (result) {
    sizemen = result.courir
});

var checkboxcourir;
chrome.storage.sync.get(['checkcourir'], function (result) {
    checkboxcourir = result.checkcourir
});


function atc() {
    setTimeout(function () {
        document.getElementById('add-to-cart').click();
        window.location.replace("https://www.courir.com/fr/shipping");
    }, 1000);
}

function shipping() {
    var checkExist = setInterval(function () {
        if (document.getElementById('shipping-method-Livraison_Domicile')) {
            if (!document.getElementById('shipping-method-Livraison_Domicile').hasAttribute('checked')) {
                this.document.querySelector('#shipping-method-Livraison_Domicile').click();
                setInterval(function () {
                    this.document.querySelector('button[name="dwfrm_singleshipping_shippingAddress_save"]').click();
                }, 1000);
            } else if (document.getElementById('shipping-method-Livraison_Domicile').hasAttribute('checked')) {
                setInterval(function () {
                    this.document.querySelector('button[name="dwfrm_singleshipping_shippingAddress_save"]').click();
                }, 1000);
            }
            clearInterval(checkExist);
        }
    }, 100);
};

function payment() {
    // cardNumber
    chrome.runtime.onMessage.addListener(function () {
        var cardNumber = document.getElementById('encryptedCardNumber');
        cardNumber.value = numberCard.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
        cardNumber.dispatchEvent(new Event('input'));
    });

    // cvc 
    chrome.runtime.onMessage.addListener(function () {
        var cvcNumber = document.getElementById('encryptedSecurityCode');
        cvcNumber.value = cvc;
        cvcNumber.dispatchEvent(new Event('input'));
    });

    // year
    chrome.runtime.onMessage.addListener(function () {
        var mm = document.getElementById('encryptedExpiryDate');
        mm.value = month + "/" + year.substring(2, 4);
        mm.dispatchEvent(new Event('input'));
    });

    // cardholder
    chrome.runtime.onMessage.addListener(function () {
        var name = document.querySelector('input[placeholder="J. Smith"]');
        name.value = cardholder;
        name.dispatchEvent(new Event('input'));
    });

    setInterval(function () {
        document.getElementById('payment_save').click();
    }, 1000);
}

// function webhook() {
//     var request = new XMLHttpRequest();
//     request.open("POST", urll);
//     request.setRequestHeader('Content-type', 'application/json');
//     var params = {
//         username: "My Webhook Name",
//         avatar_url: "",
//         content: "The message to send"
//     }
//     request.send(JSON.stringify(params));
// }

// process 
window.addEventListener("DOMContentLoaded", async function load() {

    if (window.location.toString().includes("https://www.courir.com/") && document.getElementsByClassName("product-name-container") && !window.location.toString().includes("shipping")) {
        if (checkboxcourir == "true") {
            await Promise.all([this.document.querySelector('.selectable a ').click(), atc()])
        }
        else if (this.document.querySelector('a[title="Sélectionner Taille: ' + sizemen + '"]') || this.document.querySelector('a[title="Sélectionner Taille: 42"]')) {
            await Promise.all([this.document.querySelector('a[title="Sélectionner Taille: ' + sizemen + '"]').click(), atc()])
        }
    }
    if (window.location.toString().includes("shipping")) {
        shipping();
    }

    if (window.location.toString().includes("COPayment-Start") || window.location.toString().includes("adyen.com/")) {
        payment()
    }
    // if (!window.location.toString().includes("courir")) {
    //     webhook();
    // };
});


