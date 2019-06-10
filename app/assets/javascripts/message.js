$(document).on('turbolinks:load', function () {
  function buildHTML(message) {
    var img = message.image ? `<img src=${message.image}>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user">
                      ${ message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${ message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <div class="lower-message__content">
                      ${ message.content}
                    </div>
                    ${ img}
                  </div>
                </div>`
    return html;
  }

  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast')
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (data) {
      if (data.length !== 0) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__submit').prop('disabled', false);
      scroll();
      $('#new_message')[0].reset();
      }

    })
    .fail(function() {
      alert('メッセージを入力して下さい');
      $('.form__submit').prop('disabled', false);
    })
    // return false;
  })

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      console.log(/\/groups\/\d+\/messages/)
      var last_message_id = $('.message:last').data("message-id");
      var group_id = $(".group").data("group-id");

      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: { last_id: last_message_id }
      })
        .done(function (messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            scroll();
          })
        })
        .fail(function () {
        });
    }
  };
  setInterval(reloadMessages, 5000);
});
