(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('homeController', function ($scope, dataService) {
        $scope.showIncome = false;
        $scope.graphData = [];
        $scope.loadIncomes = function () {
            $scope.getDataForYear(2013);
            $scope.getDataForYear(2014);
            $scope.getDataForYear(2015);
            $scope.getDataForYear(2016);
            $scope.getDataForYear(2017);
            $scope.configureChart();
        };
        $scope.getDataForYear = function (year) {
            dataService.read("yearlyIncome", year,
                function (data) {
                    if (data) {
                        $scope.graphData.push(data);
                    } else {
                        alert("error");
                    }
                });
        }
        $scope.configureChart = function () {
            var graphLabels = [];
            var values = [];
            var backgroundColors = [];
            if ($scope.graphData.length === 0) return;
            $scope.showIncome = true;

            sortByKey($scope.graphData, 'year');

            console.log('$scope.graphData ' + $scope.graphData + ';;;;;;');

            angular.forEach($scope.graphData, function (value, key) {
                graphLabels.push(value.year);
                backgroundColors.push(getRandomColor());
                values.push(value.total);
            });

            console.log('$scope.graphLabels ' + graphLabels + ';;;;;;');
            console.log('$scope.backgroundColors ' + backgroundColors + ';;;;;;');
            console.log('$scope.values ' + values + ';;;;;;');

            var ctx = document.getElementById("myChart").getContext('2d');

            var myChart = new Chart(ctx,
                {
                    type: 'bar',
                    data: {
                        labels: graphLabels,
                        datasets: [
                            {
                                data: values,
                                backgroundColor: backgroundColors,
                                borderWidth: 3
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [
                                {
                                    scaleLabel: {
                                        display: true,
                                        labelString: "BAM",
                                        fontColor: "black"
                                    },
                                    ticks: {
                                        beginAtZero: true,
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Year",
                                        fontColor: "black"
                                    }
                                }
                            ]
                        }
                    }
                });
        }
       $scope.loadIncomes();

        function sortByKey(array, key) {
            return array.sort(function (a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    });
}());