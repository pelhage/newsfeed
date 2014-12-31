(function() {
  var Factory = function($http){

    var factory = {};


    // Makes request to Reddit API to get Feed
      factory.getFeed = function (feedName, timeSpan) {            
        return $http.get('http://www.reddit.com/r/' + feedName + timeSpan);
      };


    // Checks to see if user has data saved in local storage; If so, loads;
      factory.sessionInfo = function(defaultFeed) {
        if (localStorage.getItem('reddit')) {
          return JSON.parse(localStorage.getItem('reddit'));
        } 
        else { 
          return defaultFeed;
        }	
      };


    // Saves any changes made to users feed list to localstorage
      factory.saveToLocal = function(saveSlot, scopeName){
        localStorage.setItem(saveSlot, JSON.stringify(scopeName));
        scopeName = JSON.parse(localStorage.getItem(saveSlot));
      };

      return factory;
  };

  Factory.$inject = ['$http'];

  angular.module('contentApp').factory('Factory', Factory);

}());