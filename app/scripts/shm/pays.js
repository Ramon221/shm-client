angular
  .module('shm_pays', [
  ])
  .service('shm_pays', [ '$q', '$modal', 'shm_request', function( $q, $modal, shm_request ) {
    this.make_pay = function () {
        return $modal.open({
            templateUrl: 'views/make_pay.html',
            controller: function ($scope, $modalInstance, $modal) {
                $scope.title = "Платежная система";

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

                $scope.save = function () {
                    $modalInstance.close( $scope.data );
                };

                $scope.delete = function () {
                    $modalInstance.dismiss('delete');
                };

                $scope.pay = function() {
                    window.open( $scope.data.shm_url + $scope.data.amount );
                    $modalInstance.close( $scope.data );
                };
            },
            size: 'sm',
        });
    }

  }])
  .controller('ShmPaysController', ['$scope', '$modal', 'shm', 'shm_request','shm_pays', function($scope, $modal, shm, shm_request, shm_pays ) {
    'use strict';

    var url = 'v1/user/pay';
    $scope.url = url;

    $scope.columnDefs = [
        {field: 'date', displayName: "Дата"},
        {field: 'money', displayName: "Сумма"},
    ];

    $scope.add = function() {
        shm_pays.make_pay().result.then(function(data){
        }, function(cancel) {
        });
    };

  }]);

