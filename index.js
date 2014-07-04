$(document).ready(function() {

  var bitcore = require('bitcore');

  var Key = bitcore.Key;
  var util = bitcore.util;
  var networks = bitcore.networks;
  var Address = bitcore.Address;
  var PrivateKey = bitcore.PrivateKey;

  $('#image').change(function() {
    var imageFile = $("#image").prop('files')[0]
    var fr = new FileReader();
    fr.onload = function(e) {
      var data = e.target.result;
      $("#preview").attr('src', data);
      var r = util.sha256(data);
      var key = new Key();
      key.private = r;
      key.regenerateSync();
      var addr = Address.fromKey(key);
      var ps = key.private.toString('hex');
      var as = addr.toString();
      $('#priv').text(ps);
      $('#addr').text(as);
      $('#result').show();

      var qrcode = new QRCode("qrcode", {
        text: as
      });

    };

    fr.readAsDataURL(imageFile);
  });
});
