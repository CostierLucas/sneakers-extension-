var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var address = document.getElementById("address");
var postalcode = document.getElementById("postalcode");
var city = document.getElementById("city");
var country = document.getElementById("country");
var cardNumber = document.getElementById("cardNumber");
var cvc = document.getElementById("cvc");
var month = document.getElementById("month");
var year = document.getElementById("year");
var placeholder = document.getElementById("name");
var webhook = document.getElementById("discord");
var mensize = document.getElementById("size");
var sbx_size = document.getElementById("sbx_size");
var checked;
var navprofile = document.getElementById('nav-profile');
var navcourir = document.getElementById('nav-courir');
var navsolebox = document.getElementById('nav-solebox');
var navsnipes = document.getElementById('nav-snipes');
var blockprofile = document.getElementById('profile');
var blocksolebox = document.getElementById('solebox');
var blockcourir = document.getElementById('courir');
var blocksnipes = document.getElementById('snipes');

blockcourir.style.display = "none";
blocksolebox.style.display = "none";

navprofile.addEventListener('click', function () {
    navprofile.classList.add('active');
    navcourir.classList.remove('active');
    navsolebox.classList.remove('active');
    navsnipes.classList.remove('active');
    blockprofile.style.display = "block";
    blockcourir.style.display = "none";
    blocksolebox.style.display = "none";
})

navsolebox.addEventListener('click', function () {
    navprofile.classList.remove('active');
    navcourir.classList.remove('active');
    navsolebox.classList.add('active');
    blockprofile.style.display = "none";
    blockcourir.style.display = "none";
    blocksolebox.style.display = "block";
    chrome.storage.sync.get(['courir'], function (result) {
        mensize.value = result.courir;
    });
})

navcourir.addEventListener('click', function () {
    navcourir.classList.add('active');
    navprofile.classList.remove('active');
    navsolebox.classList.remove('active');
    blockcourir.style.display = "block";
    blocksolebox.style.display = "none";
    blockprofile.style.display = "none";
    chrome.storage.sync.get(['courir'], function (result) {
        mensize.value = result.courir;
    });
})

document.getElementById('save').addEventListener('click', function () {
    var user = []
    user.push(firstname.value);
    user.push(lastname.value);
    user.push(address.value);
    user.push(postalcode.value);
    user.push(city.value);
    user.push(country.value);
    user.push(cardNumber.value);
    user.push(cvc.value);
    user.push(month.value);
    user.push(year.value);
    user.push(placeholder.value);
    user.push(discord.value);
    chrome.storage.sync.set({ key: user });
    alert('Profile saved !')
})

chrome.storage.sync.get(['key'], function (result) {
    firstname.value = result.key[0];
    lastname.value = result.key[1];
    address.value = result.key[2];
    postalcode.value = result.key[3];
    city.value = result.key[4];
    country.value = result.key[5];
    cardNumber.value = result.key[6];
    cvc.value = result.key[7];
    month.value = result.key[8];
    year.value = result.key[9];
    placeholder.value = result.key[10];
    discord.value = result.key[11];
});

mensize.addEventListener('change', function () {
    var mensize = document.getElementById("size").value;
    chrome.storage.sync.set({ courir: mensize });
});

sbx_size.addEventListener('change', function () {
    var sbx_size = sbx_size.value;
    chrome.storage.sync.set({ courir: sbx_size });
});


// COURIR CHECKBOX 

document.getElementById('courir-checkbox').addEventListener('change', function () {
    if (document.getElementById('courir-checkbox').checked) {
        chrome.storage.sync.set({ checkcourir: "true" });
    } else {
        chrome.storage.sync.set({ checkcourir: "false" });
    }
});

chrome.storage.sync.get(['checkcourir'], function (result) {
    if (result.checkcourir == "true") {
        document.getElementById('courir-checkbox').checked = true;
    }
});


var checkfastmode = document.getElementById("sbx-fastmode");
var checknormalmode = document.getElementById("sbx-normalmode");

// SOLEBOX CHECKBOX FAST MODE

checkfastmode.addEventListener('change', function () {
    if (checkfastmode.checked) {
        chrome.storage.sync.set({ sbxfastmode: "true" });
        checknormalmode.checked = false;
        chrome.storage.sync.set({ sbxnormalmode: "false" });
    } else {
        chrome.storage.sync.set({ sbxfastmode: "false" });
    }
});

chrome.storage.sync.get(['sbxfastmode'], function (result) {
    if (result.sbxfastmode == "true") {
        checkfastmode.checked = true;
        checknormalmode.checked = false;
        chrome.storage.sync.set({ sbxnormalmode: "false" });
    }
});

// SOLEBOX CHECKBOX NORMAL MODE

checknormalmode.addEventListener('change', function () {
    if (checknormalmode.checked) {
        chrome.storage.sync.set({ sbxnormalmode: "true" });
        chrome.storage.sync.set({ sbxfastmode: "false" });
        checkfastmode.checked = false;
    } else {
        chrome.storage.sync.set({ sbxnormalmode: "false" });
    }
});

chrome.storage.sync.get(['sbxnormalmode'], function (result) {
    if (result.sbxnormalmode == "true") {
        checknormalmode.checked = true;
        checkfastmode.checked = false;
    }
});
