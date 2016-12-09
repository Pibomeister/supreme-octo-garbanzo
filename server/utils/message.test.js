const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
      let from = 'Gabriel';
      let text = 'Asi no se caga pepe';
      var res = generateMessage(from, text);
      expect(res.createdAt).toBeA('number');
      expect(res).toInclude({from, text});
    });
});


describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Carlan';
    let latitude = 15;
    let longitude = 19;
    let url = 'https://www.google.com/maps?q=15,19';
    let message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  })
})
