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
    // item ni bidnii medeelel, type ni orlogo/zarlaga
    addListItem: function (item, type){
    
      // orlogo zarlagiig element aguulsan html- iig  beltgene.
      var html, list;
      if(type === "inc"){
        list = ".income__list";
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESC$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      else {
        list = ".expenses__list";
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESC$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Ter html dotroo orlogo zarlagin utguudig REPLACE ahishiglan uurchilj
      html = html.replace('%id%', item.id);
      html = html.replace('$$DESC$$', item.description);
      html = html.replace('$$VALUE$$', item.value);
      // Beltgesen HTML ee DOM ruu hiij ugnu.
      document.querySelector(list).insertAdjacentHTML('beforeend', html);
    }
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
    items: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };

  // data.items.inc.push(100);

  return {
    // user iin garaas avsan utguudig object dotor hadgalav. type ruu exp, esvel inc orj irne.
    addItem: function (type, desc, val){

      var item, id;

      if(data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if(type === 'inc'){
        item = new Income(id, desc, val);
      } else {
        // type === 'exp'
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);

      return item;
    }
  };

})();

// program holbogch controller
var appController = (function (uiController, financeController) {
    var ctrlAddItem = function () {
  // 1. oruulah ugugdlig delgetsees olj avna
    var input = uiController.getInput();
    // 2. olj avsan ugugdluude sanhuugin controllert damjuulj tend hadgalna.
    var item = financeController.addItem(input.type, input.description, input.value);
    // 3. olj avsan ugugdluudee web deer ni tohiroh hesegt gargana.
    uiController.addListItem(item, input.type);
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
