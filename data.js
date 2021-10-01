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

let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let address = document.getElementById("address");
let postalcode = document.getElementById("postalcode");
let city = document.getElementById("city");
let country = document.getElementById("country");
let cardNumber = document.getElementById("cardNumber");
let cvc = document.getElementById("cvc");
let month = document.getElementById("month");
let year = document.getElementById("year");
let placeholder = document.getElementById("name");
let webhook = document.getElementById("discord");
let mensize = document.getElementById("size");
let sbx_size = document.getElementById("sbx_size");
let checked;
let navprofile = document.getElementById('nav-profile');
let navcourir = document.getElementById('nav-courir');
let navsolebox = document.getElementById('nav-solebox');
let navsnipes = document.getElementById('nav-snipes');
let blockprofile = document.getElementById('profile');
let blocksolebox = document.getElementById('solebox');
let blockcourir = document.getElementById('courir');
let blocksnipes = document.getElementById('snipes');
let pageprofile = document.getElementById("page-profile");
let auth = document.getElementById("auth");
let checklicence = document.getElementById("btn-key");
let key = document.getElementById("key");

// AUTHENTIFICATION

// selecting dom element
const textInput = document.querySelector("#inputPart");
const textOutput = document.querySelector("#showOutput");
const btn = document.querySelector("#submitInput");

// selecting loading div
const loader = document.querySelector("#loading");

// showing loading
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}

pageprofile.style.display = "none";

let API_KEY = 'pk_6IVkMLe2ZUzhhB6bwMlO0E5as3RVbnPL'

chrome.storage.sync.get(['auth'], function (result) {
    if (result.auth !== undefined) {
        auth.style.display = "none";
        displayLoading();
        fetch('https://api.metalabs.io/v4/licenses/' + result.auth, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + API_KEY
            },
        })
            .then(response => response.json())
            .then((response) => {
                displayLoading();
                let status = JSON.stringify(response["status"]);
                status = status.replace(/['"]+/g, '')
                if (status == "active") {
                    hideLoading();
                    pageprofile.style.display = "block";
                } else {
                    auth.style.display = "block";
                }
            });
    }
});


// check licence
checklicence.addEventListener('click', function () {
    fetch('https://api.metalabs.io/v4/licenses/' + key.value, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + API_KEY
        },
    })
        .then(r => r.json().then(data => ({ status: r.status, body: data })))
        .then(obj => {
            if (obj.status == 404 || obj.status == 401) {
                alert("Key invalid");
            } else if (obj.status == 200) {
                let status = JSON.stringify(obj.body.status);
                status = status.replace(/['"]+/g, '')
                if (status == "active") {
                    document.height = "380px";
                    pageprofile.style.display = "block";
                    auth.style.display = "none";
                    chrome.storage.sync.set({ auth: key.value });
                } else {
                    alert("Key invalide");
                }
            }
        });
})


// MENU
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
    chrome.storage.sync.get(['solebox'], function (result) {
        sbx_size.value = result.solebox;
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

// FORM USER

document.getElementById('save').addEventListener('click', function () {
    let user = []
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
    if (result.key !== undefined) {
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
    }
});

mensize.addEventListener('change', function () {
    let mensize = document.getElementById("size").value;
    chrome.storage.sync.set({ courir: mensize });
});

sbx_size.addEventListener('change', function () {
    let sbx_sizee = sbx_size.value;
    chrome.storage.sync.set({ solebox: sbx_sizee });

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


let checkfastmode = document.getElementById("sbx-fastmode");
let checknormalmode = document.getElementById("sbx-normalmode");

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

