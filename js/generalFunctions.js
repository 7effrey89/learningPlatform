//on pageload: load angular for ng-model Directive
ons.bootstrap()
    /*
    //This was used to control the toolbar under number practice
    .controller('PageController', function ($scope) {
        $scope.changeTab = function () {
            document.getElementById('tabbar').setActiveTab(1);
        };
        $scope.changeButton = function () {
            document.getElementById('segment').setActiveButton(2);
        };
        $scope.logIndexes = function () {
            console.log('active button index', document.getElementById('segment').getActiveButtonIndex());
            console.log('active tab index', document.getElementById('tabbar').getActiveTabIndex());
        };
    });
    */
; // <-- for bootstrap();

// ============ start Event ============
//On page initiation do:
document.addEventListener('init', function (event) {
  var page = event.target;
  if (page.matches('#numberPractice')) {
    // page.querySelector('toolbar__center toolbar--material__center').innerHTML = 'My app';

  }
});

// ============ end  Event ============

// ============ start Methods ============
//Show dialog box
var showDialog = function (id) {
    document
        .getElementById(id)
        .show();
};
//Hide dialog box
var hideDialog = function (id) {
    document
        .getElementById(id)
        .hide();
};
// ============ end Methods ============