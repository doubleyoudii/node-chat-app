const expect = require('expect');

var {isRealString} = require('./validation');


describe('isrealTest', () => {
  it('should reject non-string values', () => {

    var str = 123;
    expect(isRealString(str)).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    var str = "     ";
    expect(isRealString(str)).toBe(false);
  });

  it('should allow string with non space characters', () => {
    var str = "     TheQuick    ";
    expect(isRealString(str)).toBe(true);
  })
});