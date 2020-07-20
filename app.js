const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "noobs2ninjas"];
const datarequired = []
const dummy = "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/twitch-512.png"


channels.forEach(element => {
    datarequired.push([])
});

function urlmaker(type, name) {
    return 'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?'
}

function imgError(image) {
    image.onerror = "";
    image.src = dummy;
    return true;
}

function al () {
    document.getElementById('all').style.color = "blueviolet"
    document.getElementById('online').style.color = "white"
    document.getElementById('offline').style.color = "white"
    for (let i=0;i<datarequired.length;i++){
        i = i.toString()
        console.log(document.getElementById(i).classList.length);
        if(document.getElementById(i).parentElement.classList.length == 1){
            document.getElementById(i).parentElement.classList.remove('none')
        }
    }
}

function on () {
    document.getElementById('all').style.color = "white"
    document.getElementById('online').style.color = "blueviolet"
    document.getElementById('offline').style.color = "white"
    for (let i=0;i<datarequired.length;i++){
        i = i.toString()
        if(document.getElementById(i).parentElement.classList.length==1 && parseInt(datarequired[i][3])==1){
            document.getElementById(i).parentElement.classList.remove('none')
            console.log("hiS");
        }
        else if (document.getElementById(i).parentElement.classList.length==0 && parseInt(datarequired[i][3])%2 == 0){
            document.getElementById(i).parentElement.classList.add('none')
            console.log("hi");
        }
    }
}

function off () {
    document.getElementById('all').style.color = "white"
    document.getElementById('online').style.color = "white"
    document.getElementById('offline').style.color = "blueviolet"
    for (let i=0;i<datarequired.length;i++){
        i = i.toString()
        if(document.getElementById(i).parentElement.classList.length==1 && parseInt(datarequired[i][3])%2 == 0){
            document.getElementById(i).parentElement.classList.remove('none')
        }
        else if (document.getElementById(i).parentElement.classList.length==0 && parseInt(datarequired[i][3])==1){
            document.getElementById(i).parentElement.classList.add('none')
        }
    }
}

for (let i = 0; i < channels.length; i++) {
    const request = async () => {
        const responseone = await fetch(urlmaker("channels", channels[i]))
        const textone = await responseone.text()
        let a = textone.split("&& (")[1].split(");")[0]
        const channeldata = JSON.parse(a)
        const responsetwo = await fetch(urlmaker("streams", channels[i]))
        const texttwo = await responsetwo.text()
        let b = texttwo.split("&& (")[1].split(");")[0]
        const streamdata = JSON.parse(b)
        console.log(streamdata)
        console.log(channeldata);
        datarequired[i].push(channels[i])
        datarequired[i].push(channeldata.url)
        datarequired[i].push(channeldata.logo)
        if (streamdata.stream === null) {
            datarequired[i].push(`2`)
        }
        else if (streamdata.stream === undefined) {
            datarequired[i].push('0')
        }
        else {
            datarequired[i].push('1')
            datarequired[i].push(channeldata.status)
        }
        console.log(datarequired)
        var count = 0
        for (let i = 0; i < datarequired.length; i++) {
            if (datarequired[i].length > 0) {
                count += 1
            }
            if (count == 5) {
                console.log("happy");
                document.getElementById('fetcher').classList.add('none')
                datarequired.forEach((e,i) => {
                    //channel-name : channel-url : channel-logo : off-or-on : currently-playing
                    var childdiv = document.createElement("div")
                    if (parseInt(e[3]) == 2) {
                        childdiv.innerHTML =
                        `<div class="offline" id="${i}">
                            <a href="${e[1]}" target="_blank">
                            <div class="logo"><img src="${e[2]}" onerror="imgError(this)"> &nbsp&nbsp&nbsp${e[0]}</div>
                            <div>Currently offline</div>
                            </a>
                        </div>`
                    }
                    else if (parseInt(e[3]) == 0) {
                        childdiv.innerHTML =
                        `<div class="closed" id="${i}">
                            <a href="${e[1]}" target="_blank">
                            <div class="logo"><img src="${e[2]}" onerror="imgError(this)"> &nbsp&nbsp&nbsp${e[0]}</div>
                            <div>Account Closed</div>
                            </a>
                        </div>`
                    }
                    else {
                        childdiv.innerHTML =
                        `<div class="online" id="${i}">
                            <a href="${e[1]}" target="_blank">
                            <div class="logo"><img src="${e[2]}" onerror="imgError(this)"> &nbsp&nbsp&nbsp${e[0]}</div>
                            <div>${e[4]}</div>
                            </a>
                        </div>`
                    }
                    document.getElementById('content').appendChild(childdiv)
                });
            }
        }
    }
    request()
}

