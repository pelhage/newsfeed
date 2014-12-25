(function() {
    
    var RedditController = function ($scope, redditFactory) {    

    // This is the default set of reddits
        $scope.reddits = ['worldnews','science','technology','futurology','news','zenhabits'];

        // $scope.default = $scope.reddits[0]; if Broken, undo this

        // $scope.feed = []; if Broken, undo this

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


    // Gets feed on menu clicks
        $scope.getFeed = function(feedName, time) {
            
            $scope.feed = [];

            redditFactory.getFeed(feedName, time)
                .success(function(posts) {

                    var j = posts.data.children.length;
                
                    for (var i = 0; i < j; i++){
                        $scope.feed.push(posts.data.children[i].data);
                    }                        
                });
            $scope.selectedFeed = feedName; 
            $scope.sidebar = true;
        };

    // Changes the time that is being used for sorting posts
        $scope.sortBy = function(time) {
            $scope.timeQuery = time;

            $scope.getFeed($scope.selectedFeed, $scope.timeQuery);
        };

    // Loads Default feed on page load 
        function init() {

            $scope.savedFeed = redditFactory.sessionInfo($scope.reddits);

            $scope.getFeed($scope.savedFeed[0], $scope.timeQuery);
        }

        init();


    // Adds feeds to Dashboard
        $scope.addFeed = function (feedName) {

            if ($scope.savedFeed.indexOf(feedName) == -1){
                $scope.savedFeed.push(feedName);
            }
            else {
                alert('Looks like that feed already exists!');
            }

            localStorage.setItem('reddit', JSON.stringify($scope.savedFeed));
            $scope.savedFeed = JSON.parse(localStorage.getItem('reddit'));

            $scope.getFeed(feedName);

            $scope.addFeedInput = '';            
        };


    // Removes feed from Dashboard
        $scope.removeFeed = function(item) {
            var index = $scope.savedFeed.indexOf(item);
            $scope.savedFeed.splice(index, 1);

            localStorage.setItem('reddit', JSON.stringify($scope.savedFeed));
            $scope.savedFeed = JSON.parse(localStorage.getItem('reddit'));

        };


    };
    

    RedditController.$inject = ['$scope', 'redditFactory'];

    angular.module('contentApp')
      .controller('RedditController', RedditController);
    
}());


        // localStorage.setItem('reddits', $scope.reddits);
        // $log.log(localStorage.getItem('reddits'));

