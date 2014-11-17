// TODO: get the chart sizes from the CSS via the DOM.
// TODO: multiple graphs.

'use strict';

(function() {

    /*
     * Config for using the quandl.com data api v1.
     */
    var dataUrl = 'https://www.quandl.com/api/v1/datasets/WIKI/AAPL.json?trim_start=1980-12-12&trim_end=2014-11-12';
    var columnNamesKey = 'column_names';
    var dateFieldKey = 'Date';
    var closeFieldKey = 'Close';
    var currencyUnit = '$';

    /**
     * MetricsGraphics currently puts its functions straight into the
     * global namespace so I'm doing this for readability.
     */
    var mgjs = {};
    mgjs.data_graphic = window.data_graphic;
    mgjs.convert_dates = window.convert_dates


    // Kick it all off.
    $(document).ready(init);
    function init() {
        var ls = window.localStorage;
        var lsKey = 'mgd-data';
        var dataJson;

        /**
         * Get the data either from localstorage or remotely.
         * Warning: this is just a demo so there is no cache control,
         * If you want stored data to be replaced with fresh data
         * then delete the data from localstorage.
         */

        // Synchronously check for data in localstorage.
        dataJson = ls.getItem(lsKey);
        if (dataJson) {

            // Process data.
            processData(JSON.parse(dataJson));
        } else {

            // Else asynchronously fetch the data from a third party
            // and store it in localstorage (it's quite big).
            d3.json(dataUrl, function(error, data) {
                if (error) {
                    console.error(error);
                    return;
                }

                // Store data.
                ls.setItem(lsKey, JSON.stringify(data));

                // Process data.
                processData(data);
            });
        }
    }


    /**
     * Data from quandl.com comes with a bunch of meta data,
     * a column heading object and an array of arrays
     * called 'data' containing the actual data points.
     *
     * MetricsGraphics wants an array of objects.
     */
    function processData(data) {
        var headers = data[columnNamesKey];

        // Restructure data in a MetricsGraphicsJS friendly way.
        var processedData = data.data.map(function(datum) {
            var datumObject = {};
            headers.forEach(function(header, index) {
                datumObject[header] = datum[index];
            });
            return datumObject;
        });

        // Give MetricsGraphicsJS the data format it wants.
        processedData = mgjs.convert_dates(processedData, dateFieldKey);

        // Now draw the graphs!
        drawGraphs(processedData);
    }

    function drawGraphs(data) {
        mgjs.data_graphic({
            title: "Closing prices for Apple shares",
            description: "Closing prices for Apple shares taken from <a href='https://www.quandl.com/'>quandl.com</a>",
            data: data,
            width: 800,
            height: 600,
            target: '#apple_closing_graph',
            x_accessor: dateFieldKey,
            yax_units: currencyUnit,
            y_accessor: closeFieldKey
        });
    }
})();
