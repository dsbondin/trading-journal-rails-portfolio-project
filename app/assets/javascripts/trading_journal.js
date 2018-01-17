$(document).ready(function() {
  loadTrades();
  loadInstruments();
  nextTrade();
  loadComments();
})

const loadTrades = function() {
  $("a.trades").click(function(e) {
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
  $("a.instruments").click(function(e) {
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
  $("a.trade_id").click(function(e) {
    let $nextId = parseInt($(this).attr("trade-id")) + 1;
    $.getJSON("/trades/" + $nextId).done(function(trade) {
      // console.log(trade)
      if (!trade.error) {
        renderTrade(trade);
      } else {
        renderEmptyTrade(trade);
      }
    })
  })
}

class Trade {
  constructor(json) {
    this.id = json.id;
    this.direction = json.direction;
    this.date = json.created_at.slice(0, 10);
    this.entry = json.entry;
    this.exit = json.exit;
    this.size = json.quantity;
    this.notes = json.notes;
    this.instrument = json.instrument.symbol;
    this.trader = json.trader.email;
  }

const renderTrade = function(trade) {
  let tradeInfo = trade.direction + " " + trade.instrument.symbol + " | Trader: " + trade.trader.email;
  $("h3#trade-info").text(tradeInfo);
  $("p#date").text("Date: " + trade.created_at.slice(0, 10));
  $("p#entry").text("Entry: " + trade.entry);
  $("p#exit").text("Exit: " + trade.exit);
  $("p#size").text("Size: " + trade.quantity);
  $("p#pnl").text("");
  $("p#notes").text("Notes: " + trade.notes);
  $(".trade_id").attr("trade-id", trade.id);
  // $(".trade_id").val(trade.id);
  $(".hide-when-no-trade").show();
  $("#comments").html("")
  $("button#show-comments").show()
}

const renderEmptyTrade = function(trade) {
  $("h3#trade-info").text(trade.error);
  $(".hide-when-no-trade").hide();
  $(".trade_id").attr("trade-id", trade.id);
}

const loadComments = function() {
  $("button#show-comments").click(function() {
    let trade_id = $(this).attr("trade-id")
    $.getJSON("/trades/" + trade_id + "/comments").success(function(comments) {
      // console.log(comments)
      let commentsHTML = ""
      comments.forEach(function(comment) {
        commentsHTML += "<p>" + comment.trader.email + "<br>" + comment.body + "</p>"
        $("#comments").html(commentsHTML)
        $("button#show-comments").hide()
      })
    })
  })
}
