/**
 * @author booleanhunter
 * @about Common functions used by other components, like making AJAX requests.
 */

define(
    [
        'exports',
        'jquery',
    ],
    function (exports, $) {
        exports.sendHTTPPostRequest = function(url, postData, successCallback){
             $.ajax({
                type: 'POST',
                url: url,
                datatype: 'json',
                data: postData,
                success: successCallback,
                error: function(httpRequest,status,error) {
                    console.log(error);
                }
            });
        };

        exports.sendHTTPGetRequest = function(url, successCallback){
            $.ajax({
                type: 'GET',
                url: url,
                datatype: "json",
                success: successCallback,
                error: function(httpRequest, status, error) {
                    console.log(error);
                }
            });
        };
    }
)