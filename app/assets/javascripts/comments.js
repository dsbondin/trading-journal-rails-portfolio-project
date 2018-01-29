class Comment {
  constructor(json) {
    this.body = json.body
    this.trader = json.trader.email
  }

  renderComment() {
    return `<p><b>${this.trader}</b><br>${this.body}</p>`
  }
}

const loadComments = function() {
  $("button#show-comments").click(function() {
    let trade_id = $(this).attr("trade-id")
    $.getJSON("/trades/" + trade_id + "/comments").done(function(response) {
      renderComments(response);
    })
  })
}

const renderComments = function(comments) {
  if (comments.length > 0) {
    let commentsHTML = "<p><b>Comments</b></p>"
    comments.forEach(function(each) {
      const comment = new Comment(each);
      commentsHTML += comment.renderComment();
      $("#comments").html(commentsHTML);
    })
  } else {
    $("#comments").text("No comments yet");
  }
  $("button#show-comments").hide();
  $("button#add-comment").show();
}

const renderCommentForm = function() {
  $("#add-comment").click(function() {
    let tradeId = $(this).attr("trade-id")
    renderForm(tradeId);
  })
}

const renderForm = function(tradeId) {
  $.get("/trades/" + tradeId + "/comments/new").success(function(response) {
    $("#comment-form").html(response);
    $("#add-comment").hide();
    postComment();
  })
}

const postComment = function() {
  $("form.new_comment").on("submit", function(e) {
    e.preventDefault();
    // $form = $(this);
    postData = $(this).serialize();
    $.post(this.action, postData).done(function(response){
      const comment = new Comment(response);
      $("#comments").append(comment.renderComment());
      $("textarea#comment_body").val("")
      renderForm($("input#trade_id").val());
    })
  })
}
