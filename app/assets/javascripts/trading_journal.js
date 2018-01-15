$(document).ready(function() {
  loadTrades();
  loadInstruments();
  nextTrade();
})

const loadTrades = function() {
  $("a.trades").click(function(e){
    e.preventDefault();
    $.getJSON(this.href).success(function(trades) {
      // debugger
      let tradesHTML = ""
      trades.forEach(function(trade) {
        tradesHTML += "<li><a href='/trades/" + trade.id +"'>" + trade.direction + " " + trade.instrument.symbol + "</a></li>"
      })
      $("div#trades ol").html(tradesHTML)
    })
  })
}

const loadInstruments = function() {
  $("a.instruments").click(function(e){
    e.preventDefault();
    $.getJSON(this.href).success(function(instruments) {
      // debugger
      let instrumentsHTML = ""
      instruments.forEach(function(instrument) {
        instrumentsHTML += "<li><a href='/instruments/" + instrument.id +"'>" + instrument.symbol + "</a></li>"
      })
      $("div#instruments ol").html(instrumentsHTML)
    })
  })
}

const nextTrade = function() {
  $("a.js-next").click(function(e){
    let $nextId = parseInt($(this).attr("trade-id")) + 1;
    $.getJSON("/trades/" + $nextId).done(function(trade) {
      console.log(trade)
      let tradeInfo = trade.direction + " " + trade.instrument.symbol + " | Trader: " + trade.trader.email
      $("h3#trade-info").text(tradeInfo)
      $("p#date").html("Date: " + trade.created_at.slice(0, 10))
      $("p#entry").html("Entry: " + trade.entry)
      $("p#exit").html("Exit: " + trade.exit)
      $("p#size").html("Size: " + trade.quantity)
      $("p#pnl").html("")
      $("p#notes").html("Notes: " + trade.notes)
      $(".js-next").attr("trade-id", trade.id)
    })
    .fail(function(){
      alert("Something went wrong!")
    })
  })
}
