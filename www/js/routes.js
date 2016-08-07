angular.module('saltAir').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "../templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "../templates/home.html",
          controller: 'homeController'
        }
      }
    })
    .state('tabs.history', {
      url: "/history",
      views: {
        'history-tab': {
          templateUrl: "../templates/history.html",
          controller: 'historyController'
        }
      }
    })
    .state('tabs.settings', {
      url: "/settings",
      views: {
        'settings-tab': {
          templateUrl: "../templates/settings.html",
          controller: 'settingsController'
        }
      }
    })

    $urlRouterProvider.otherwise('/tab/home')
})
