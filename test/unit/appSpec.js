describe("Testing my app with angular and jasmine", function () {
    var scope = {}, location = '';

    beforeEach(function () {
        module("MyApp");
        inject(function (_$rootScope_, _$controller_, _$injector_) {
            scope = _$rootScope_.$new();
            location = _$injector_.get("$location");
            _$controller_("Main", { $scope: scope }); 
        });
    });

    describe("Main controller", function () {

        it("checking initial status", function () {
            expect(scope.status.waiting).toBeTruthy();
            expect(scope.status.running).toBeFalsy();
        });

        it("checking dependency injection", function () {
            spyOn(location, 'path');
            scope.changePage("http://go.com");
            expect(location.path).toHaveBeenCalledWith("http://go.com");
        });
        
        it("using inject function on the fly", function () {
            inject(function (_$location_) {
                spyOn(_$location_, 'path');
                scope.changePage("http://go.com");
                expect(_$location_.path).toHaveBeenCalledWith("http://go.com");
            });

            inject(function (_VERSION_) {
                expect(_VERSION_).toBe("0.0.1");
            });

            inject(function (_SomeService_) { //possible, but avoid it! Mock it :D
                expect(_SomeService_.toUpper("aaa")).toBe("AAA");
            });
        });

    });
});
