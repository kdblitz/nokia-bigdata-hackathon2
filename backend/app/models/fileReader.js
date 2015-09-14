module.exports = {
  read: function(filePath,callbackPerLine) {
    var fs = require('fs');
    var input = fs.createReadStream(filePath);
    var buffer = '';
    input.on('data',function(data) {
      buffer += data;
      var newLineIndex = buffer.indexOf('\n');
      var lastScannedIndex = 0;
      while(newLineIndex > -1) {
        var line = buffer.substring(lastScannedIndex, newLineIndex);
        callbackPerLine(line);
        lastScannedIndex = newLineIndex + 1;
        newLineIndex = buffer.indexOf('\n', lastScannedIndex);
      }
      buffer = buffer.substring(lastScannedIndex);
    });

    input.on('end',function() {
      if (buffer.length) {
        callbackPerLine(buffer);
      }
    });
  }
}
