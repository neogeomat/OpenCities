//this part goes in HTML

/*<form name="input" action="javascript: submitform();" method="post">
    <label for="query">Search for address:</label> <input type="text" id="query" size=50 name="query"
                                                          value="Rue des Berges 37 Payerne"/>
    <input type="submit" value="Submit"/>
</form>
*/
function submitform() {
            var queryString = document.forms[0].query.value;
            OpenLayers.Request.POST({
                url: "http://www.openrouteservice.org/php/OpenLSLUS_Geocode.php",
                scope: this,
                failure: this.requestFailure,
                success: this.requestSuccess,
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                data: "FreeFormAdress=" + encodeURIComponent(queryString) + "&MaxResponse=1"
            });
        }
        function requestSuccess(response) {
            var format = new OpenLayers.Format.XLS();
            var output = format.read(response.responseXML);
            if (output.responseLists[0]) {
                var geometry = output.responseLists[0].features[0].geometry;
                var foundPosition = new OpenLayers.LonLat(geometry.x, geometry.y).transform(
                        new OpenLayers.Projection("EPSG:4326"),
                        map.getProjectionObject()
                        );
                map.setCenter(foundPosition, 16);
            } else {
                alert("Sorry, no address found");
            }
        }
        function requestFailure(response) {
            alert("An error occurred while communicating with the OpenLS service. Please try again.");
        }