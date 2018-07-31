var Base64 = {
    encode: function(str) {
        return btoa(unescape(encodeURIComponent(str)));
    },
    decode: function(str) {
        return decodeURIComponent(escape(atob(str)));
    }
};

function draw() {
  var canvas = document.getElementById("cv");
  if ( ! canvas || ! canvas.getContext ) {
    return false;
  }
  var imageArray = createBinaryArray(encryptMessage());
  console.log(imageArray);
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
}

function calcCanvasSize(length){
  return Math.max(100, Math.ceil(Math.sqrt(length)));
}

function encryptMessage(){
  var text = document.getElementById("messageField").value;
  return Base64.encode(text);
}

function createBinaryArray(text){
  return Array.prototype.map.call(text, function(x){
    return x.charCodeAt(0).toString(2);
  }).join("");
}
