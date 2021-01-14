function show(id) {
    let num = document.getElementById(id).id;
    document.getElementById("show").value += num;
}

function del() {
    var a = document.getElementById("show").value;
    document.getElementById("show").value =a.slice(0, -1) ;
}

function call(num) {
    alert(`calling... ${num}`)
    const electron = require('electron');
    const {
        ipcRenderer
    } = electron;
    var moment = require('moment');
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(num + time);
    ipcRenderer.send('item:call', num, time);
    console.log(ipcRenderer);

}