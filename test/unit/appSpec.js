describe("Testing my app with angular and jasmine", function () {
    var $scope = {}, location = '';

    describe("Main controller", function () {
        beforeEach(function () { //injecting every time
            module("MyApp");
            inject(function (_$controller_, _$rootScope_, _$location_) {
                $scope = _$rootScope_.$new();
                _$controller_("Main", { $scope: $scope }); 
            });
        });

        it("should checks initial status", function () {
            expect($scope.status.isWaiting).toBeTruthy();
            expect($scope.status.isRunning).toBeFalsy();
        });

        it("should checks using inject", function () { //other ways to inject
            inject(function (_$location_) {
                spyOn(_$location_, 'path');
                $scope.changePage("http://go.com");
                expect(_$location_.path).toHaveBeenCalledWith("http://go.com");
            });

            inject(function (_VERSION_) {
                expect(_VERSION_).toBe("0.0.1");
            });
        });

        it("should checks using other way to injection", inject(function (_SomeService_) {
            spyOn(_SomeService_, 'toUpper').andReturn(10);
            $scope.setName("ok");
            expect($scope.name).toBe(10); //hhmmmm.... bad...
        }));
        

        it("should checks timeout", inject(function (_$timeout_) {
            $scope.name = 'aaaaaa';
            $scope.clean();
            _$timeout_.flush();
            expect($scope.name).toBe('')
        }));

        describe("ajax services", function () {
            var httpExpect;

            it("should request ajax and set isSaved state", inject(function (_$httpBackend_) {
                _$httpBackend_.expect("POST", "/some/url").respond(200, { info: "Saved!" });
                $scope.send();
                _$httpBackend_.flush();
                expect($scope.data).toEqual({info: "Saved!"}); //fail?
            }));

            it("should ajax fails", inject(function (_$httpBackend_) {
                _$httpBackend_.expect("POST", "/some/url").respond(500, 'blablabla');
                spyOn($scope, 'clean');
                $scope.send();
                _$httpBackend_.flush();
                expect($scope.status.isWaiting).toBeTruthy();
                expect($scope.clean).toHaveBeenCalledWith('blablabla');
}));
        });
    });
});
