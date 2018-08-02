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
