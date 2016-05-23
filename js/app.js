(function() {
  'use strict';
  var $tbody = $('tbody');
  var $target, menuItem, price, $tdMenuItem, $tdPrice, $tr;
  var currentSubtotal, newSubtotal, tax, total;
  var name, phone, address, checkName, checkPhone;

  // Initialize side navigation bar on mobile
  $('.button-collapse').sideNav();

  // Initialize parallax feature used on home page
  $('.parallax').parallax();

  // Add selected menu items to order
  $('.add-to-order').on('click', function(event) {
    event.preventDefault();
    $target = $(event.target);
    menuItem = $target.closest('.card').find('.card-title').text();
    price = $target.closest('.card').find('p').text();
    $tdMenuItem = $('<td>').attr('colspan', '2').text(menuItem);
    $tdPrice = $('<td>').addClass('right-align price').text(price);
    $tr = $('<tr>').append($tdMenuItem).append($tdPrice);
    $tbody.append($tr);

    calculateTotals();
  });

  // Calculate subtotal, tax, and total on order form
  var calculateTotals = function() {
    price = +price.substr(1);
    currentSubtotal = $('.subtotal').text();
    currentSubtotal = +currentSubtotal.substr(1);
    newSubtotal = currentSubtotal + price;
    $('.subtotal').text('$' + newSubtotal);
    tax = (newSubtotal * 0.1);
    $('.tax').text('$' + tax.toFixed(2));
    total = newSubtotal + tax;
    $('.total').text('$' + total.toFixed(2));
  };

  // Validate form data and submit form
  $('.btn-large').on('click', function() {
    name = $('#name').val();
    phone = $('#phone').val();
    address = $('#address').val();
    checkName = /^[A-Za-z0-9 ]{3,30}$/;
    checkPhone = /^(\+\d{1,2}\s)?1?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if ($tbody.children('tr').length === 0) {
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
      $tbody.children().remove();
      $('.subtotal, .tax, .total').text('$0.00')
      $('#name, #phone, #address').val('');
      Materialize.toast('Your order was successfully submitted', 3000);
    }
  });
})();
