angular.module('saltAir')
  .controller('homeController', function($scope, $http, $timeout, $document, airData) {

    $scope.readFromServer = function () {
        airData.then(function(data) {
          $('div.spinner').hide(); // clear load icon when server data is fetched
          $scope.data = data;
        });
    }

    // load sum data big boi
    $scope.readFromServer();
  })
  .controller('historyController', function($scope, $http, $timeout, airData) {
    var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    $scope.generatePreviousDays = function () {
      var today = new Date(),
          previousDays = [];

      var i = today.getDay();

      while (previousDays.length != 7) {
        if (++i > 6) i = 0;
        previousDays.push(week[i]);
      }

      return previousDays;
    }

    $scope.generateReportChart = function () {
      airData.then(function(data) {
        var report = data.report;
        console.log(report);
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: $scope.generatePreviousDays(),
                datasets: [{
                    label: 'μg',
                    data: report,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
      })
    }

    $scope.generateReportChart();

  })
  .controller('settingsController', function($scope, $http, $timeout) {


  });
