const loadComments = function() {
  $("button#show-comments").click(function() {
    let trade_id = $(this).attr("trade-id")
    $.getJSON("/trades/" + trade_id + "/comments").done(function(comments) {
      renderComments(comments);
    })
  })
}

const renderComments = function(comments) {
  if (comments.length > 0) {
    let commentsHTML = "<p><b>Comments</b></p>"
    comments.forEach(function(comment) {
      commentsHTML += "<p>" + comment.trader.email + "<br>" + comment.body + "</p>";
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
    postComment(); // add to blog post
  })
}

const postComment = function() {
  $("form.new_comment").on("submit", function(e) {
    e.preventDefault();
    $form = $(this);
    postData = $form.serialize();
    $.post(this.action, postData).done(function(comment){
      let commentHTML = ""
      commentHTML += "<p>" + comment.trader.email + "<br>" + comment.body + "</p>";
      $("#comments").append(commentHTML);
      $("textarea#comment_body").val("")
      renderForm($("input#trade_id").val());
    })
  })
}
