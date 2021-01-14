function show(id) {
    let num = document.getElementById(id).value;
    document.getElementById("show").value += num;
}

function del() {
    var a = document.getElementById("show").value;
    a.value.slice(0, -1)
    document.getElementById("show").value = a;
}

function call(num) {
    alert(`calling... ${num}`)
    const electron = require('electron');
    const {
        ipcRenderer
    } = electron;
    var moment = require('moment');
    // let time = Date.now.toString();
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(num + time);
    ipcRenderer.send('item:call', num, time);
    console.log(ipcRenderer);

}