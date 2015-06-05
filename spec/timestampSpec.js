// load external module to test
var ts = require('../timestamp').ts;

describe("A datestring parser", function(){
  it("should return a date matching the given string", function(){
    var dateString = '01/01/15 12:13pm';
    var correctDate = Date(2015, 1, 1, 12, 13);
    expect(ts.parseDateString(dateString)).toEqual(correctDate);
  });

  it("should return null when it was unable to parse its input", function(){
    var dateString = 'im not a real datestring';
    expect(ts.parseDateString(dateString)).toBeNull();

    var dateString = 123;
    expect(ts.parseDateString(dateString)).toBeNull();
  });

  it("should handle AM and PM, and leading 0s", function(){
    var dateString = '01/01/15 5:13am';
    var correctDate = Date(2015, 1, 1, 5, 13);
    expect(ts.parseDateString(dateString)).toEqual(correctDate);

    // change to PM and add leading 0 to time
    var dateString = '01/01/15 05:13pm';
    var correctDate = Date(2015, 1, 1, 17, 13);
    expect(ts.parseDateString(dateString)).toEqual(correctDate);
  });

  it("should handle 24 hour input", function(){
    var dateString = '01/01/15 22:00';
    var correctDate = Date(2015, 1, 1, 22, 00);
    expect(ts.parseDateString(dateString)).toEqual(correctDate);
  });

  it("should allow - or / characters to separate dates", function(){
    var dateString = '01-01-15 22:00';
    var correctDate = Date(2015, 1, 1, 22, 00);
    expect(ts.parseDateString(dateString)).toEqual(correctDate);
  });
});
