$('.special.cards .image').dimmer({
  on: 'hover'
});

$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })
;