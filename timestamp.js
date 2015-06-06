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
  * @return {Date|null}
  */
  pub.parseDateString = function(dateString){
    var re = /\s*(\d{1,2})[-\/](\d{1,2})[-\/](\d{2}|\d{4})\s+(\d{1,2}):(\d{1,2}):?(\d{1,2})?\s*(am|pm)?\s*/;
    var date;
    var dateValues;
    var month, day, year, hour, minute, second, amPm;

    if (re.test(dateString)) {
      dateValues = re.exec(dateString);

      // get individual values from dateValues array
      month = parseInt(dateValues[1]);
      day = parseInt(dateValues[2]);
      year = parseInt(dateValues[3]);
      hour = parseInt(dateValues[4]);
      minute = parseInt(dateValues[5]);
      second = parseInt(dateValues[6]);
      amPm = dateValues[7];

      // if second is absent, default it to 0
      if (!second) {
        second = 0;
      }

      // if 2-digit year given, assume it's referring to current century
      if (year < 100) {
        var currentYear = new Date().getFullYear();
        var currentCentury = currentYear - (currentYear % 100);
        year = currentCentury + year;
      }

      // if time is PM, change hour to 24 hour equivalent
      if (amPm && amPm.toLowerCase() === 'pm' && hour < 12) {
        hour += 12;
      }

      date = new Date(year, month - 1, day, hour, minute, second);
    } else {
      date = null;
    }

    return date;
  };


  /**
  * Create a unix timestamp from the given time string, the number of seconds since
  * Jan 01 1970 (UTC). Example: "1433512570".
  * @param {string} written time string
  * @return {string|null} unix timestamp, null if invalid time given
  */
  pub.unix = function(dateString){
    var date = pub.parseDateString(dateString);
    var timestamp = null;

    if (date) {
      timestamp = Math.floor(date.getTime() / 1000);
    }

    return timestamp;
  };


  /**
  * Create an SQL timestamp from the given string. Example: "1999-01-08 04:05:06".
  * @param {string} written time string
  * @return {string} SQL timestamp
  */
  pub.sql = function(dateString){
  };


  var padZero = function(num) {
    if (num < 10) {
      num = '0' + num;
    }

    return num;
  }


  /**
  * Create an ISO 8601 timestamp from the given string. Example: "2007-04-05T14:30".
  * @param {string} written time string
  * @return {string} ISO 8601 timestamp
  */
  pub.iso = function(dateString){
    var date = pub.parseDateString(dateString);
    var timestamp = null;

    if (date) {
      timestamp = date.getFullYear() + '-' + padZero(date.getMonth() + 1) + '-' + padZero(date.getDate()) + 'T' + padZero(date.getHours()) + ':' + padZero(date.getMinutes()) + ':' + padZero(date.getSeconds());
    }

    return timestamp;
  }

  return pub;
}());

exports.ts = ts;
