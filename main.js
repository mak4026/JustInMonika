var Base64 = {
    encode: function(str) {
        return btoa(unescape(encodeURIComponent(str)));
    },
    decode: function(str) {
        return decodeURIComponent(escape(atob(str)));
    }
};

function main() {
  var canvas = document.getElementById("cv");
  if ( ! canvas || ! canvas.getContext ) {
    return false;
  }
  var imageArray = createBinaryArray(encryptMessage());
  console.log(imageArray);
  console.log(imageArray.length);
  drawEncryptImage(canvas, imageArray);
}

function drawEncryptImage(canvas, arr){
  var canvasSize = calcCanvasSize(arr.length);

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height',canvasSize);

  var ctx = canvas.getContext('2d');

  // black fill
  ctx.fillStyle = '#000000';
  ctx.fillRect(0,0,canvasSize,canvasSize);

  ctx.fillStyle = '#FFFFFF';
  arr.split('').forEach(function(x, i){
    if(x === "1"){
      ctx.fillRect(i % canvasSize, Math.floor(i / canvasSize), 1, 1);
    }
  });
}

function calcCanvasSize(length){
  var userSize = document.getElementById("sizeField").value;
  return Math.max(userSize, Math.ceil(Math.sqrt(length)));
}

function encryptMessage(){
  var text = document.getElementById("messageField").value;
  console.log(text);
  var encoded = Base64.encode(text);
  document.getElementById("base64str").textContent = encoded;
  return encoded;
}

function createBinaryArray(text){
  return Array.prototype.map.call(text, function(x){
    return zeroPadding(x.charCodeAt(0).toString(2), 8);
  }).join("");
}

function zeroPadding(num,length){
    return ('0000000000' + num).slice(-length);
}

function sampleText(){
  var ip = new LoremIpsum();
  var textField = document.getElementById("messageField");
  textField.value = ip.paragraph(100);
}

function saveCanvas(){
  var imageType = "image/png";
  var fileName = "just_in_monika.png";

  var canvas = document.getElementById("cv");

  var base64 = canvas.toDataURL(imageType);
  var blob = Base64toBlob(base64);

  saveBlob(blob, fileName);
}

function Base64toBlob(base64) {
  // tmp[0] : data:image/png;base64
  // tmp[1] : base64
  var tmp = base64.split(',');

  var data = atob(tmp[1]);

  var mime = tmp[0].split(':')[1].split(';')[0];

  var buf = new Uint8Array(data.length);
  for (var i = 0; i < data.length; i++) {
    buf[i] = data.charCodeAt(i);
  }

  var blob = new Blob([buf], { type: mime });
  return blob;
}

function saveBlob(blob, fileName) {
  var url = (window.URL || window.webkitURL);

  var dataUrl = url.createObjectURL(blob);

  var event = document.createEvent("MouseEvents");
  event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

  var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");

  a.href = dataUrl;
  a.download = fileName;

  a.dispatchEvent(event);
}
