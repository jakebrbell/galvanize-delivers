(function() {
  'use strict';

  $('.add-to-order').on('click', function(event) {
    event.preventDefault();
    var $target = $(event.target);
    var menuItem = $target.closest('.card').find('.card-title').text();
    var price = $target.closest('.card').find('p').text();
    var $tdMenuItem = $('<td>').attr('colspan', '2').text(menuItem);
    var $tdPrice = $('<td>').addClass('right-align price').text(price);
    var $tr = $('<tr>').append($tdMenuItem).append($tdPrice);
    $('tbody').append($tr);

    price = +price.substr(1);
    var currentSubtotal = $('.subtotal').text();
    currentSubtotal = +currentSubtotal.substr(1);
    var newSubtotal = currentSubtotal + price;
    $('.subtotal').text('$' + newSubtotal);

    var tax = (newSubtotal * 0.1);
    $('.tax').text('$' + tax.toFixed(2));

    var total = newSubtotal + tax;
    $('.total').text('$' + total.toFixed(2));

  });
})();



// Subtotal	$43.96
// Tax	$4.40
// Total	$48.36
