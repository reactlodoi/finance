// delgetstei ajillah controller
var uiController = (function () {

  // html,css tei holbootoi uurchlultund ortoj boloh ugugduluudig neg gazar hamgaalav
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  // public services: iife ashiglan module archt aar hj bga uyed public service uude return eer damjuuldag
  return {
    getInput: function () {
      return {
        // DOM oosoo select hj bn
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// Sanhuutei ajillah controller
var financeController = (function () {
  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };

  // data.allItems.inc.push(100);



})();

// program holbogch controller
var appController = (function (uiController, financeController) {

  var ctrlAddItem = function () {
    console.log(uiController.getInput());
    // 1. oruulah ugugdlig delgetsees olj avna
    // 2. olj avsan ugugdluude sanhuugin controllert damjuulj tend hadgalna.
    // 3. olj avsan ugugdluudee web deer ni tohiroh hesegt gargana.
    // 4. tusviig tootsolno
    // 5. delgetsend etssiin uldegdel tootsoog gargana.
  };

  var setupEventListeners = function (){

    var DOM = uiController.getDOMstrings();

      document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      // which ni deer uyiin browseruuded
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  }

  return {
    init: function (){
        console.log("start app...");
        setupEventListeners();
    }
  }

  
})(uiController, financeController);

// ctrl + shift + j = console

appController.init();
