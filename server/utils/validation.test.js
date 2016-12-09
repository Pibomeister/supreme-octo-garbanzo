const expect = require('expect');

const {isRealString} = require('./validation.js');


describe('isRealString', () => {
  it('should reject non string values', () =>{
    expect(isRealString(3)).toBe(false);
  });
  it('should reject string with only spaces', () =>{
    expect(isRealString('   ')).toBe(false);
  });
  it('should allow string with non-whitespace characters', () => {
    expect(isRealString('     Steren esta chido       ')).toBe(true);
  });
});
