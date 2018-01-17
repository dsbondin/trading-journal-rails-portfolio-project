$(document).ready(function() {
  loadTrades();
  loadInstruments();
  nextTrade();
  loadComments();
  renderCommentForm();
})

const loadTrades = function() {
  $("a.trades").click(function(e) {
    e.preventDefault();
    $.getJSON(this.href).success(function(trades) {
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
    $.getJSON("/trades/" + $nextId).done(function(json) {
      if (!json.error) {
        renderNormalTrade(json)
      } else {
        renderEmptyTrade(json);
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
    renderTrade() {
      return Trade.template(this)
    }

    profitLoss() {
      let pnl
      this.direction === "long" ? pnl = (this.exit - this.entry) * this.size : pnl = (this.entry - this.exit) * this.size
      pnl = parseInt(pnl)
      pnl >= 0 ? pnl = `$${pnl}` : pnl = `-$${-pnl}`
      return pnl
    }
}

$(function() {
  Trade.source = $("#trade-template").html();
  Trade.template = Handlebars.compile(Trade.source);
})

const renderNormalTrade = function(json) {
  let trade = new Trade(json);
  let tradeHTML = trade.renderTrade();
  $("#trade-container").html(tradeHTML);
  $(".trade_id").attr("trade-id", trade.id);
  $(".hide-when-no-trade").show();
  $("#comments").html("")
  $("button#show-comments").show()
  $("button#add-comment").hide();
}

const renderEmptyTrade = function(json) {
  $("#trade-container").html("<p>" + json.error + "<p>");
  $(".hide-when-no-trade").hide();
  $(".trade_id").attr("trade-id", json.id);
}
