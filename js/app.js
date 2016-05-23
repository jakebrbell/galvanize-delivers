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

  $('.btn-large').on('click', function() {
    var name = $('#name').val();
    var phone = $('#phone').val();
    var address = $('#address').val();
    var checkName = /^[A-Za-z0-9 ]{3,30}$/;
    var checkPhone = /^(\+\d{1,2}\s)?1?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if ($('tbody').children('tr').length === 0) {
      Materialize.toast('Please make a selection', 3000);
    }
    else if (name === '') {
      Materialize.toast('Please enter a name', 3000);
    }
    else if (!checkName.test(name)) {
      Materialize.toast('Please enter a valid name', 3000);
    }
    else if (phone === '') {
      Materialize.toast('Please enter a phone number', 3000);
    }
    else if (!checkPhone.test(phone)) {
      Materialize.toast('Please enter a valid phone number', 3000);
    }
    else if (address === '') {
      Materialize.toast('Please enter an address', 3000);
    }
    else {
      $('tbody').children().remove();
      $('.subtotal, .tax, .total').text('$0.00')
      $('#name, #phone, #address').val('');
      Materialize.toast('Your order was successfully submitted', 3000);
    }
  });

})();
