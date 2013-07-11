describe("Testing my app with angular and jasmine", function () {
    var $scope = {};

    describe("Main controller", function () {
        beforeEach(function () { //injecting every time
            module("MyApp");
            inject(function (_$controller_, _$rootScope_) {
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
            spyOn(_SomeService_, 'toUpper').andReturn(10); //mocking service! This is an UNIT test
            $scope.setName("ok");
            expect($scope.name).toBe(10); 
        }));
        

        it("should checks timeout", inject(function (_$timeout_) {
            $scope.name = 'aaaaaa';
            $scope.clean();
            _$timeout_.flush();
            expect($scope.name).toBe('')
        }));

        it("should mock jquery ajax", function () {
            window.$ = { ajax: function (){} }; //mocking jquery! we dont have it!
            spyOn(window.$, "ajax");
            $scope.jquery();
            expect($.ajax).toHaveBeenCalled();
        });

        describe("ajax services", function () {
            var httpExpect;
            
            beforeEach(inject(function (_$httpBackend_) {
                httpExpect = _$httpBackend_.expect("POST", "/some/url");
            }));

            afterEach(inject(function (_$httpBackend_) {
                _$httpBackend_.verifyNoOutstandingExpectation();
                _$httpBackend_.verifyNoOutstandingRequest();
            }));

            it("should request ajax and set data", inject(function (_$httpBackend_) {
                httpExpect.respond(200, { info: "Saved!" });
                $scope.send();
                _$httpBackend_.flush();
                expect($scope.data).toEqual({info: "Saved!"});
            }));

            it("should ajax fails", inject(function (_$httpBackend_) {
                httpExpect.respond(500, 'blablabla');
                spyOn($scope, 'clean');
                $scope.send();
                _$httpBackend_.flush();
                expect($scope.status.isWaiting).toBeTruthy();
                expect($scope.clean).toHaveBeenCalledWith('blablabla');
            }));
        });
    });
});
