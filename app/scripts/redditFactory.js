(function() {
    var redditFactory = function($http){
        
        var factory = {};

        factory.getFeed = function (feedName, timeline) {            
            return $http.get('http://www.reddit.com/r/'+feedName + timeline);
        };

     	factory.sessionInfo = function(defaultFeed) {
			
			if (localStorage.getItem('reddit') === null) {
                return defaultFeed;
                // $scope.savedTime = $scope.timeline[0].query;
            } else { 
                return JSON.parse(localStorage.getItem('reddit'));
                // $scope.savedTime = JSON.parse(localStorage.getItem('time'));
            }     		
     	};
        
        return factory;
    };
    
    redditFactory.$inject = ['$http'];
    
    angular.module('contentApp').factory('redditFactory', redditFactory);
        
}());