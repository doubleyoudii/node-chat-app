var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('Generate Message', () => {
  it('should generate correct message object', () => {

    var from = 'brotherWill';
    var text = 'Jacket you want?';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('GenerateLocation Message', () => {
  it('should create correct location object', () => {
    var from = 'Admin';
    var lat = 1;
    var long = 1;
    var url = `https://www.google.com/maps?q=1,1`;
    var location = generateLocationMessage(from, lat, long);

    expect(location.createdAt).toBeA('number');
    expect(location).toInclude({from, url});

  });
});