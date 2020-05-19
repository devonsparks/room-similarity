const assert = require('assert');
const components = require('../index');
const fs = require('fs');
const path = require("path");
describe('index', function() {

    beforeEach(function () {
      
    });

  describe('medic.floor1', function() {
    it('should work', function() {
      
       let buf =  fs.readFileSync(path.resolve(__dirname,"../samples/medic.floor1.rooms.json"));
       let geojson = JSON.parse(buf.toString())
       console.log('----')
       console.log(JSON.stringify(components(geojson, 0.00006)))
       console.log('----')

    });

});
  
});