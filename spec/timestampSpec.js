// load external module to test
var ts = require('../timestamp').ts;


/*
* Test - parseDateString
*/
describe("A datestring parser", function(){
  it("should return a date matching the given string", function(){
    var dateString = '01/01/15 12:13pm';
    var correctDate = new Date(2015, 0, 1, 12, 13);
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
    var correctDate = new Date(2015, 0, 1, 5, 13);
    expect(ts.parseDateString(dateString)).toEqual(correctDate);

    // change to PM and add leading 0 to time
    var dateString = '01/01/15 05:13pm';
    var correctDate = new Date(2015, 0, 1, 17, 13);
    expect(ts.parseDateString(dateString)).toEqual(correctDate);
  });

  it("should handle 24 hour input", function(){
    var dateString = '01/01/15 22:00';
    var correctDate = new Date(2015, 0, 1, 22, 00);
    expect(ts.parseDateString(dateString)).toEqual(correctDate);
  });

  it("should allow - or / characters to separate dates", function(){
    var dateString = '01-01-15 22:00';
    var correctDate = new Date(2015, 0, 1, 22, 00);
    expect(ts.parseDateString(dateString)).toEqual(correctDate);
  });
});


/*
* Test - unix timestamp
*/
describe("A unix timestamp", function(){
  it("should match the output of Math.floor(new Date().getTime() / 1000)", function(){
    var dateString = '06-06-15 13:00';
    var actualTimestamp = Math.floor(new Date(2015, 5, 6, 13, 00) / 1000);
    expect(ts.unix(dateString)).toEqual(actualTimestamp);

    var dateString = '7-12-08 5:14pm';
    var actualTimestamp = Math.floor(new Date(2008, 6, 12, 17, 14) / 1000);
    expect(ts.unix(dateString)).toEqual(actualTimestamp);
  });

  it("should return null when an invalid time is given", function(){
    var dateString = '06-06-15 13 00 time stuff';
    expect(ts.unix(dateString)).toBeNull();
  });
});


/*
* Test - ISO 8601 timestamp
*/
describe("An ISO 8601 timestamp", function(){
    it("should be a valid string that conforms to the ISO 8601 specification", function(){
        var referenceTimestamp = '2015-06-03T13:21:58';
        var dateString = '6/3/2015 1:21:58pm';
        expect(ts.iso(dateString)).toEqual(referenceTimestamp);
    });

    it("should add leading zeros to single-digit values", function(){
        var referenceTimestamp = '2015-06-03T01:02:03';
        var dateString = '6/3/2015 1:02:03am';
        expect(ts.iso(dateString)).toEqual(referenceTimestamp);
    });

    it("should return null when an invalid time is given", function(){
        var dateString = '06-06-15 1300';
        expect(ts.iso(dateString)).toBeNull();
    });
});
