# timestamp.js
Simple timestamp tools and practice with test-driven development

## Getting Started

Simply add the script to your HTML and you'll be able to use the functions defined in the `ts` namespace.

```html
<script src="timestamp.js"></script>
<script>
  var dateString = "1/2/15 12:13am";
  var myDate = ts.parseDateString(dateString);
  var unixTimestamp = ts.unix(dateString);
  var sqlTimestamp = ts.sql(dateString);
  var iso8601Timestamp = ts.iso(dateString);
</script>
```

## Development

### Installing dependencies

Install npm dependencies by running:

`npm install`

### Running tests

Make sure you've installed Jasmine:

`npm install -g jasmine`

Then run `jasmine` from the project's root directory to run the test suite.
