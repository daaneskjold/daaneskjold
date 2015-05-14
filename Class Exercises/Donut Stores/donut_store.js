var storeArray = new Array();

var DonutStore = function(store,minCustomers,maxCustomers,avgOrder,openHour,closeHour){
  'use strict';
  this.store=store;
  this.minCustomers=minCustomers;
  this.maxCustomers=maxCustomers;
  this.avgOrder=avgOrder;
  this.openHour=openHour;
  this.closeHour=closeHour;
  this.getDonutsPerHour=function(){
    var costumersPerHour = (Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers);
    var donutsPerHour = Math.floor(costumersPerHour*this.avgOrder);
    return [costumersPerHour,donutsPerHour];
  };
  this.getDonutsPerDay = function(){
    var dayClientSummary = [];
    var dayDonutSummary=  [];
    var hourSummary;
    var totalClient = 0;
    var totalDonuts = 0;
    var rowCounter = 0;
    for(var i = this.openHour; i <= this.closeHour ; i++){
      hourSummary = this.getDonutsPerHour();
      totalClient += hourSummary[0];
      totalDonuts += hourSummary[1];
      dayClientSummary[rowCounter] = hourSummary[0];
      dayDonutSummary[rowCounter] = hourSummary[1];
      rowCounter++;
    };
    dayClientSummary[rowCounter] = totalClient;
    dayDonutSummary[rowCounter] = totalDonuts;
    return [dayClientSummary,dayDonutSummary];
  };
  this.storeSummary = this.getDonutsPerDay();
};

var DonutMaster = function(){
  this.addShop = function(store,minCustomers,maxCustomers,avgOrder,openHour,closeHour){
      var store = new DonutStore(store,minCustomers,maxCustomers,avgOrder,openHour,closeHour);
      storeArray.push(store);
  };

  this.generateReport =function(store){
    var today = new Date();
      var myTable = document.getElementById('report');
      myTable.innerHTML = '<table class="locationReport"><thead><tr><th colspan="3" id =\'currentLocation\'>Location</th></tr><tr><th>Date</th><th colspan="2" ' +
      ' id=\'currentDay\'></th></tr><tr><th>Hour</th><th>Customers</th><th>Donuts</th></tr></thead><tbody id=\'summaryInfo\'></tbody></table>';
      myTable = document.getElementById('currentDay');
      myTable.innerHTML = '<tr>' + (today.getMonth()+1) +'/'+ today.getDate() +'/'+ today.getFullYear()+'</tr>';

      myTable = document.getElementById('currentLocation');
      myTable.innerHTML = store.store;

      function populateSummary(summaryArray){
        var mytable = document.getElementById('summaryInfo');
        for(var i=0; i<(summaryArray[0].length-1);i++){
          mytable.innerHTML += '<tr><td>'+ i.toString() +'</td><td>'+ summaryArray[0][i] + '</td><td>'+ summaryArray[1][i] + '</td></tr>';
        };
        mytable.innerHTML += '<tr><td><strong>TOTAL</strong></td><td><strong>'+ summaryArray[0][i] + '</strong></td><td><strong>'+ summaryArray[1][i] +
        '</strong></td></tr>';
        return this;
      };

      populateSummary(store.storeSummary);
  };
}

var donutMaster = new DonutMaster();
donutMaster.addShop('Downtown',8,43,4.5,10,20);
donutMaster.addShop('Capitol Hill',4,37,2,7,23);
donutMaster.addShop('South Lake Union',9,23,6.33,10,22);
donutMaster.addShop('Wedgewood',2,28,1.25,0,24);
donutMaster.addShop('Ballard',8,58,3.75,8,18);

function printStoreTable(element,index,array){
  $('#storeInfo').append('<tr><td>' + element.store + '</td><td>' + element.minCustomers + ' -  '
  + element.maxCustomers + '</td><td>' + element.avgOrder + '</td><td>' + element.openHour + ' to '
  + element.closeHour + ' hrs.</td><td class="managerButton"><a href="#" onclick="donutMaster.generateReport(storeArray['
  + index +'])"> View Daily Summary for this Location</a></td></tr>');
};

storeArray.forEach(printStoreTable);