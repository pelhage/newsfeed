(function() {
    
  var Controller = function ($scope, Factory) {    

  // This is the default set of reddits
    $scope.reddits = ['worldnews', 'science', 'technology', 'futurology', 'zenhabits'];

    $scope.timeline = [{
      label: 'Today', 
      query: '/top.json?sort=top&t=day'
      }, {
      label: 'This week', 
      query: '/top.json?sort=top&t=week'
      }, {
      label: 'This month',
      query: '/top.json?sort=top&t=month'
      }, {
      label: 'This year', 
      query: '/top.json?sort=top&t=year'
      }, {
      label: 'All time',
      query: '/top.json?sort=top&t=all'
    }];


    $scope.timeRange = $scope.timeline[0];
    $scope.timeQuery = $scope.timeRange.query;
    $scope.sidebar = true;


  // Gets and Displays feed when selected
    $scope.getFeed = function(feedName, timeSpan) {
        
      $scope.feed = [];

      Factory.getFeed(feedName, timeSpan)
        .success(function(posts) {
          var j = posts.data.children.length;
            for (var i = 0; i < j; i++) {
              $scope.feed.push(posts.data.children[i].data);
            }                        
          });
        
      $scope.selectedFeed = feedName; 
      $scope.sidebar = true;
    };

        
  // Changes the time that is being used for sorting posts
    $scope.sortBy = function(timeSpan) {
      $scope.timeQuery = timeSpan;
      $scope.getFeed($scope.selectedFeed, $scope.timeQuery);
    };

    
  // Loads Default feed on page load 
    function init() {
      $scope.savedFeed = Factory.sessionInfo($scope.reddits);
      $scope.getFeed($scope.savedFeed[0], $scope.timeQuery);
    }
    init();


  // Adds feeds to Dashboard
    $scope.addFeed = function (feedName) {

      if ($scope.savedFeed.indexOf(feedName) == -1){
        $scope.savedFeed.push(feedName);
      } else {
        alert('Looks like that feed already exists!');
      }
        
      Factory.saveToLocal('reddit', $scope.savedFeed);
      $scope.getFeed(feedName);
      $scope.addFeedInput = '';            
    };


  // Removes feed from Dashboard
    $scope.removeFeed = function(feedName) {
      var index = $scope.savedFeed.indexOf(feedName);
      $scope.savedFeed.splice(index, 1);            
        
      Factory.saveToLocal('reddit',$scope.savedFeed);
    };

  };
    

  Controller.$inject = ['$scope', 'Factory'];

  angular.module('contentApp')
    .controller('Controller', Controller);
    
}());
