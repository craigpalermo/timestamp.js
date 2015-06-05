/**
* @fileoverview Utilities to print written datetimes as different timestamp formats.
* @author Craig Palermo
*/

var ts = (function(){

  // for making vars public
  var pub = {};

  /**
  * Convert written time string to JS Date object.
  * @param {string} written time string, in format of "01/01/15 12:13pm"
  * @return {Date}
  */
  pub.parseDateString = function(dateString){
    var re = /\s*(\d{1,2})[-\/](\d{1,2})[-\/](\d{2}|\d{4})\s+(\d{1,2}):(\d{1,2})\s*(am|pm)?\s*/;
    var date;
    var dateValues;
    var month, day, year, hour, minute, amPm;

    if (re.test(dateString)) {
      dateValues = re.exec(dateString);

      // get individual values from dateValues array
      month = parseInt(dateValues[1]);
      day = parseInt(dateValues[2]);
      year = parseInt(dateValues[3]);
      hour = parseInt(dateValues[4]);
      minute = parseInt(dateValues[5]);
      amPm = parseInt(dateValues[6]);

      // if time is PM, change hour to 24 hour equivalent
      if (amPm === 'pm') {
        hour += 12;
      }

      date = Date(year, month, day, hour, minute);
    } else {
      date = null;
    }

    return date;
  };

  /**
  * Create a unix timestamp from the given time string, the number of seconds since
  * Jan 01 1970 (UTC). Example: "1433512570".
  * @param {string} written time string
  * @return {string} unix timestamp
  */
  pub.unix = function(){
    var date = parseTimeString();
    var timestamp;

    // if browser doesn't support Date.now, fall back to using Date.getTime()
    if (!Date.now) {
      Date.now = function() { return new Date().getTime(); }
    }

    timestamp = Math.floor(Date.now() / 1000);
    return timestamp;
  };

  /**
  * Create an SQL timestamp from the given string. Example: "1999-01-08 04:05:06".
  * @param {string} written time string
  * @return {string} SQL timestamp
  */
  pub.sql = function(){
  };

  /**
  * Create an ISO 8601 timestamp from the given string. Example: "2007-04-05T14:30".
  * @param {string} written time string
  * @return {string} ISO 8601 timestamp
  */
  pub.iso8601 = function(){
  }

  return pub;
}());

exports.ts = ts;
