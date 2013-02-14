$(function () {
  $('#newform').on('submit', function () {
    $.post("/", $('#newform').serialize());

    var li = $('<li>' + $('#newinput').val() + '</li>')
    $('#todolist').append(li);

    var form = $('<form method="post" 
      action="/delete/' + 
      $('#todolist li').length + 
      '"><button>Delete</button></form>')
    $(li).append(form);

    form.on('submit', function () {
      // ...
    })

    return false;
  })
})


  $('#neworder').on('submit',function(){
  $.post("/order/create", $('neworder').serialize());

  return false
    })