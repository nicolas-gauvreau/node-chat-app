const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'TestFrom';
    var text = 'TestText';
    var message = generateMessage(from, text);
    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'TestFrom';
    var latitude = 45;
    var longitude = -73;
    var message = generateLocationMessage(from, latitude, longitude);
    expect(message).toInclude({from, url: 'https://www.google.com/maps?q=45,-73'});
    expect(message.createdAt).toBeA('number');

  });
});
