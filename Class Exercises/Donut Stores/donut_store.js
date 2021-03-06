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
  this.generateSummaryHtmlTable = function(){
    var today = new Date();
    $('#report').append('<table class="locationReport" id="' + this.store + '"><thead><tr><th colspan="3" id =\'currentLocation\'>Location</th></tr><tr><th>Date</th><th colspan="2" ' +
    ' id=\'currentDay\'></th></tr><tr><th>Hour</th><th>Customers</th><th>Donuts</th></tr></thead><tbody id=\'summaryInfo\'></tbody></table>');
    $('#'+ this.store + ' #currentDay').append((today.getMonth()+1) +'/'+ today.getDate() + '/ '+ today.getFullYear());
    $('#'+ this.store + ' #currentLocation').html(this.store);
  };
  this.generatedHtml = this.generateSummaryHtmlTable();
  this.populateSummary = function(){
    for(var i=0; i<(this.storeSummary[0].length-1);i++){
         $('#'+ this.store + '>#summaryInfo').append('<tr><td>'+ i.toString() +'</td><td>'+ this.storeSummary[0][i] + '</td><td>'+ this.storeSummary[1][i] + '</td></tr>');
      };
      $('#'+ this.store + '>#summaryInfo').append('<tr><td><strong>TOTAL</strong></td><td><strong>'+ this.storeSummary[0][i] + '</strong></td><td><strong>'+ this.storeSummary[1][i] +
      '</strong></td></tr>');
      return this;
  };
  this.populatedSummaryHtml = this.populateSummary();
};

var DonutMaster = function(){
  this.addShop = function(store,minCustomers,maxCustomers,avgOrder,openHour,closeHour){
      var store = new DonutStore(store,minCustomers,maxCustomers,avgOrder,openHour,closeHour);
      storeArray.push(store);
  };

  this.generateReport =function(storeLocation){
    $('.locationReport').fadeOut('fast').delay(250);
    $('#'+storeLocation).fadeIn('slow');
  };
}

var donutMaster = new DonutMaster();
donutMaster.addShop('Downtown',8,43,4.5,10,20);
donutMaster.addShop('Capitol_Hill',4,37,2,7,23);
donutMaster.addShop('South_Lake_Union',9,23,6.33,10,22);
donutMaster.addShop('Wedgewood',2,28,1.25,0,24);
donutMaster.addShop('Ballard',8,58,3.75,8,18);

function printStoreTable(element,index,array){
  $('#storeInfo').append('<tr><td>' + element.store + '</td><td>' + element.minCustomers + ' -  '
  + element.maxCustomers + '</td><td>' + element.avgOrder + '</td><td>' + element.openHour + ' to '
  + element.closeHour + ' hrs.</td><td class="managerButton"><a href="#" onclick="donutMaster.generateReport(\''+element.store+'\')"> View Daily Summary for this Location</a></td></tr>');
};

storeArray.forEach(printStoreTable);

$('.managerButton>a').hover(function() {
    $(this).css('background-color','green');
    $(this).css('color','white');
    }, function() {
    $(this).css('background-color','white');
    $(this).css('color','green');
});