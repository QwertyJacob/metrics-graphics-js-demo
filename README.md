# Having a play with the Mozilla MetricsGraphics.js library

[MetricsGraphics.js](http://metricsgraphicsjs.org/) is a D3.js based graphing library optimised for time-series data. This is a quick test of it with real financial data from [https://www.quandl.com/](). In the case of the full range of the Apple share data this is ~12000 data points from late 1980 to the present-ish.

## To make it go
* Clone the repo.
* You'll need Node and npm installed.
* You'll need Gulp installed globally (via npm).
* `npm install`.
* `gulp`. This will start serving the page at [http://localhost:3000/](). If instead you try to load the page locally from the file system the CDN downloads will fail.

[TODO list](todo.md)