(function() {
    
    var redditDirective = function () {
        return {
            restrict: 'A',
            template: '{{timeRange}}'
        };
    };

    angular.module('contentApp')
      .directive('redditDirective', redditDirective);
    
}());
