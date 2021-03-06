four51.app.controller('AddressInputCtrl', ['$scope', '$rootScope', '$location', 'User', 'Address', 'Resources',
    function ($scope, $rootScope, $location, User, Address, Resources) {

        $scope.setAddressName = function(){
            if($scope.address.Street1){
                $scope.address.AddressName = $scope.address.Street1;
                $scope.user.ShipAddressName = $scope.address.Street1;
            }
            if($scope.address.Street2){
                $scope.user.ShipAddressName2 = $scope.address.Street2;
            }
            if($scope.address.City){
                $scope.user.ShipAddressName3 = $scope.address.City;
            }
            if($scope.address.State){
                $scope.user.ShipAddressName4 = $scope.address.State;
            }
            if($scope.address.Zip){
                $scope.user.ShipAddressName5 = $scope.address.Zip;
            }
        };

        $scope.save = function() {
            $scope.objectExists = false;
            Address.save(this.address,
                function(address) {
                    $rootScope.$broadcast('event:AddressSaved', address);
                    $location.path($scope.return);
                },
                function(ex) {
                    if (ex.Code.is('ObjectExistsException'))
                        $scope.objectExists = true;
                }
            );
        };
        $scope.delete = function() {
            Address.delete(this.address, function() {
                $location.path($scope.return);
            });
        };

        $scope.cancel = function() {
            $scope.return ? $location.path($scope.return) : $rootScope.$broadcast('event:AddressCancel');
        };

        $scope.countries = Resources.countries;
        $scope.states = Resources.states;

        $scope.country = function(item) {
            return $scope.address != null ? $scope.address.Country == item.country : false;
        };
        $scope.hasStates = function() {
            return $scope.address != null ? $scope.address.Country == 'US' || $scope.address.Country == 'CA' || $scope.address.Country == 'NL' : false;
        };

        $scope.isPhoneRequired = function() {
            return ($scope.user.Permissions.contains('BillingAddressPhoneRequired') && $scope.address.IsBilling) ||
                ($scope.user.Permissions.contains('ShipAddressPhoneRequired') && $scope.address.IsShipping);
        }
    }]);