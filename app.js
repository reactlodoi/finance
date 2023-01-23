// delgetstei ajillah controller
var uiController = (function () {})();

// Sanhuutei ajillah controller
var financeController = (function () {})();

// program holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    console.log("daraglaa...");
    // 1. oruulah ugugdlig delgetsees olj avna
    // 2. olj avsan ugugdluude sanhuugin controllert damjuulj tend hadgalna.
    // 3. olj avsan ugugdluudee web deer ni tohiroh hesegt gargana.
    // 4. tusviig tootsolno
    // 5. delgetsend etssiin uldegdel tootsoog gargana.
  };

  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    // which ni deer uyiin browseruuded
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);

// ctrl + shift + j = console
