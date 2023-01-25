// delgetstei ajillah controller
var uiController = (function () {

  // html,css tei holbootoi uurchlultund ortoj boloh ugugduluudig neg gazar hamgaalav
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
  };

  // public services: iife ashiglan module archt aar hj bga uyed public service uude return eer damjuuldag
  return {
    getInput: function () {
      return {
        // DOM oosoo select hj bn
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        // user ees utga avahdaa too ruu parseInt() gsen method oor avna.
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },

    clearFields: function (){
      // olon elementig DOM oos barij avahdaa querySelectorAll method iig ashiglana. butsaagaad bidend
      // massive bish list data structure butsaadag.
      var fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);

      // convert list to array. slice funkts ni dotor ni array bichihed tuhain arrayg butsaadag. 
      // gevch list-d slice gsen funkts bdaggu uchir call funkts ashiglaj funktsig ni
      // zeelj array butsaaj, array luu hurvuulev.
      var fieldArr = Array.prototype.slice.call(fields);

      // field bga buh elementudig element bolgonii huvid davtaltaar hooslov.
      // hiih uildelig ni nergu funktseer damjuulj ugnu gurvan argument dotroo avdag.
      // function (<element><tuhain element ni yamar indextei ve><uurig ni butsaj ugnu>)
      fieldArr.forEach(function(el, index, array){
          el.value = "";
          // el.value = index gevel tuhain indexig ni utgand ugnu
      });

      // odoo manai array dotor 2 element bga ehnii desc, value bga.
      // ene hoyroin cursor maani desc deer arilsni daraa bhad tohiruulahin tuld focus method iig duudna.
      fieldArr[0].focus();

      // for(var i = 0; i<fieldArr.length; i++){
      //   fieldArr[i].value = "";
      // }
    },

    // item ni bidnii medeelel, type ni orlogo/zarlaga
    addListItem: function (item, type){
    
      // orlogo zarlagiig element aguulsan html- iig  beltgene.
      var html, list;
      if(type === "inc"){
        list = DOMstrings.incomeList;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESC$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      else {
        list = DOMstrings.expenseList;
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

  var calculateTotal = function(type){
      var sum = 0;
      data.items[type].forEach(function(el){
        sum = sum + el.value; // zovhon el geed nemcihvel NaN buyu Not a number gsen ugnii tovchlol aldaa garch boldog
      })
      data.totals[type] = sum;
  };

  var data = {
    items: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    },
    tusuv: 0,
    huvi: 0
  };

  // data.items.inc.push(100);

  return {
    tusuvTsooloh: function(){

        // niit orlogin niilberig bodno
        calculateTotal("inc");

        // niit zarlagiig bodno
        calculateTotal("exp");

        // orlogo zarlagin zoruug bodno
        data.tusuv = data.totals.inc - data.totals.exp;

        // orlogo zarlagin huvig bodno
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100); 
    },
    tusviigAvah: function(){
      // data-g dangaar ni yvuulbal turshlaggu programistuud uurchilcihnu.
      // tiimes finance module iin buur etssin ur dung ni l yvuulah heregtei
        return {
          tusuv: data.tusuv,
          huvi: data.huvi,
          totalInc: data.totals.inc,
          totalExp: data.totals.exp
        }
    },
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
    
    if(input.description !== "" && input.value !== ""){
       // 2. olj avsan ugugdluude sanhuugin controllert damjuulj tend hadgalna.
      var item = financeController.addItem(input.type, input.description, input.value);
      // 3. olj avsan ugugdluudee web deer ni tohiroh hesegt gargana.
      uiController.addListItem(item, input.type);
      uiController.clearFields();
      // 4. tusviig tootsolno
      financeController.tusuvTsooloh();
      // 5. etssiin uldegdel 
      var tusuv = financeController.tusviigAvah();
      // 6. delgetsend tusviin tootsoog gargana.
      console.log(tusuv);
    }
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
