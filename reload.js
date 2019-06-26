(function () {
  'use strict';
  /*globals location, XMLHttpRequest, setTimeout*/
  var loc     = location;
  var host    = loc.hostname + (loc.port ? ':' + loc.port : '');
  var timeout = setTimeout;
  var check, xhr, lastModifiedOnServer, lastModifiedDocument;
  var waitingTime1 = 1000 * 4;      // 4 seconds
  var waitingTimeX = 1000 * 60 * 5; // 5 minutes

  if (loc.host === host) {
    check = function () {
      xhr = new XMLHttpRequest();
      xhr.onload = function () {
        lastModifiedOnServer = this.getResponseHeader('Last-Modified');
        lastModifiedDocument = document.lastModified;
        if (lastModifiedOnServer && lastModifiedDocument) {
          var timeOnServer = new Date(lastModifiedOnServer);
          var timeDocument = new Date(lastModifiedDocument);
          if (timeOnServer.getTime() !== timeDocument.getTime()) {
            loc.reload(true);
          } else {
            timeout(check, waitingTimeX);
          }
        }
      };
      xhr.open('HEAD', loc.href + '?t=' + new Date().getTime(), true);
      xhr.setRequestHeader('pragma', 'no-cache');
      xhr.send();
    };
    timeout(check, waitingTime1);
  }
}());
