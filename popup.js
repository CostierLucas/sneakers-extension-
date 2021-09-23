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

if (!window.isTop) {
    var data = 'test';
    chrome.runtime.sendMessage({ sendBack: true, data: data });
}

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

var sbxfastmode;
chrome.storage.sync.get(['sbxfastmode'], function (result) {
    sbxfastmode = result.sbxfastmode;
});

var sbxnormalmode;
chrome.storage.sync.get(['sbxnormalmode'], function (result) {
    sbxnormalmode = result.sbxnormalmode;
});


// COURIR

// process 
window.addEventListener("DOMContentLoaded", async function load() {
    // alert(numberadress);

    if (window.location.toString().includes("https://www.courir.com/fr/") && document.getElementsByClassName("product-name-container")) {
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

// fin process


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
                    console.log("not ok");
                }, 1000);
            } else {
                setInterval(function () {
                    this.document.querySelector('button[name="dwfrm_singleshipping_shippingAddress_save"]').click();
                    console.log('ok');
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

// FIN COURIR

// SOLEBOX

// Process 


window.addEventListener("load", function loade() {
    if (window.location.toString().includes("https://www.solebox.com/") && window.location.toString().includes("/p/")) {
        if (sbxfastmode == "true") {
            fastmode();
        } else if (sbxnormalmode == "true") {
            normalmode();
        }
    }
});

// fin process 

// FASTMODE

var head = {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "referer": "https://www.solebox.com/en_FR/p/nike-x_fragment_wmns_dunk_high_%27%27beijing%27%27-wine%2Fblack-white-01992314.html",
    "x-requested-with": "XMLHttpRequest",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
    "Origin": "https://www.solebox.com",
    "Connection": "keep-alive"
}

function sbxfastmode() {
    var bloc = document.querySelector('a[data-value="35.5"]');
    var pid = bloc.getAttribute("data-variant-id");
    var shoes = 'pid=' + pid + '&options=%5B%7B%22optionId%22%3A%22size%22%2C%22selectedValueId%22%3A%2236.5%22%7D%5D&quantity=1';
    fetch('/en_FR/add-product?format=ajax', {
        method: "POST",
        headers: head,
        body: shoes
    })
        .then(response => response.json())
        .then((response) => {
            console.log("atc ok");
            var p = this.document.createElement("p");
            var bloc = document.querySelector("div[data-id='mainPricing']");
            bloc.append(p);
            p.setAttribute("id", "blocinfo");
            p.style.cssText = "background-color:green;color:white;text-align:center;padding:20px"
            p.innerHTML = "CARTED...";
            token();
        });
}

function fastpaymentsbx() {
    head["referer"] = "https://www.solebox.com/en_FR/checkout?stage=placeOrder";
    fetch('/on/demandware.store/Sites-solebox-Site/en_FR/CheckoutServices-PlaceOrder?format=ajax', {
        method: "POST",
        headers: head,
    })
        .then(response => response.json())
        .then((response) => {
            console.log(JSON.stringify(response));
            if (JSON.stringify(response["continueUrl"])) {
                document.getElementById('blocinfo').innerHTML = "PAYMENT...";
                var str = JSON.stringify(response["continueUrl"]).replace(/^"(.*)"$/, '$1');
                chrome.runtime.sendMessage({ title: "paymentsbx", data: str });
            } else {
                console.log(document.getElementById("blocinfo"));
                document.getElementById("blocinfo").style.backgroundColor = "red";
                document.getElementById("blocinfo").innerHTML = "ERROR DUMMY CART.";
            }
        });
}

function token() {
    fetch('/on/demandware.store/Sites-solebox-Site/en_FR/CSRF-Generate?format=ajax', {
        method: "POST",
        headers: head,
    })
        .then(response => response.json())
        .then((response) => {
            console.log(token);
            console.log("token ok");
            var token = JSON.stringify(response["csrf"]["token"]).replace(/^"(.*)"$/, '$1');
            fastshippingsbx(token);
        });
}

function fastshippingsbx(token) {
    var link = "id=&selected=true&addressType=home-delivery&snipesStore=&hermesName=&hermesId=&postOfficeNumber=&packstationNumber=&postNumber=&postalCode=" + postalcode + "&countryCode=" + country.substring(0, 2) + "&carrierName=&suite=" + numberaddress + "&street=rue+du+moulin&city=" + city + "&address2=Le+Malesherbois&lastName=" + lastname + "&firstName=" + firstname + "&title=&csrf_token=" + token;
    fetch('/on/demandware.store/Sites-solebox-Site/en_FR/CheckoutShippingServices-ShippingRates?format=ajax', {
        method: "POST",
        headers: head,
        body: link
    })
        .then(response => response.json())
        .then((response) => {
            document.getElementById("blocinfo").innerHTML = "SHIPPING...";
            console.log("shipping ok");
            console.log(JSON.stringify(response));
            fastpaymentsbx();
        });
}

// FIN FAST MODE 

// NORMAL MODE

function sbxnormalmode() {
    var bloc = document.querySelector('a[data-value="35.5"]');
    var pid = bloc.getAttribute("data-variant-id");
    var shoes = 'pid=' + pid + '&options=%5B%7B%22optionId%22%3A%22size%22%2C%22selectedValueId%22%3A%2236.5%22%7D%5D&quantity=1';
    fetch('/en_FR/add-product?format=ajax', {
        method: "POST",
        headers: head,
        body: shoes
    })
        .then(response => response.json())
        .then((response) => {
            console.log("atc ok");
            var p = this.document.createElement("p");
            var bloc = document.querySelector("div[data-id='mainPricing']");
            bloc.append(p);
            p.setAttribute("id", "blocinfo");
            p.style.cssText = "background-color:green;color:white;text-align:center;padding:20px"
            p.innerHTML = "CARTED...";
            window.location.replace("https://www.solebox.com/en_FR/checkout?stage=shipping#shipping");
            shippingnormalmode();
        });
}


function shippingnormalmode() {
    document.querySelector("input[name='dwfrm_shipping_shippingAddress_shippingAddressUseAsBillingAddress']").click();
    document.querySelector("button[aria-label='Save & continue']").click();
}

// FIN NORMAL MODE

// FIN SOLEBOX