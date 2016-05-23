(function() {
  'use strict';
  var $tbody = $('tbody');
  var address;
  var menuItem;
  var name;
  var phone;
  var price;

  // Initialize side navigation bar on mobile
  $('.button-collapse').sideNav();

  // Initialize parallax feature used on home page
  $('.parallax').parallax();

  // Calculate subtotal, tax, and total on order form
  var calculateTotals = function() {
    var currentSubtotal;
    var newSubtotal;
    var tax;
    var total;

    price = Number(price.substr(1));
    currentSubtotal = $('.subtotal').text();
    currentSubtotal = Number(currentSubtotal.substr(1));
    newSubtotal = currentSubtotal + price;
    $('.subtotal').text('$' + newSubtotal);
    tax = newSubtotal * 0.1;
    $('.tax').text('$' + tax.toFixed(2));
    total = newSubtotal + tax;
    $('.total').text('$' + total.toFixed(2));
  };

  // Add selected menu items to order
  $('.add-to-order').on('click', function(event) {
    event.preventDefault();
    var $target = $(event.target);
    var $tdMenuItem;
    var $tdPrice;
    var $tr;

    menuItem = $target.closest('.card').find('.card-title').text();
    price = $target.closest('.card').find('p').text();
    $tdMenuItem = $('<td>').attr('colspan', '2').text(menuItem);
    $tdPrice = $('<td>').addClass('right-align price').text(price);
    $tr = $('<tr>').append($tdMenuItem).append($tdPrice);
    $tbody.append($tr);

    calculateTotals();
  });

  // Validate form
  var submitOrder = function() {
    var checkName = /^[A-Za-z0-9 ]{3,30}$/;
    var checkPhone = /^(\+\d{1,2}\s)?1?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

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
      $('.subtotal, .tax, .total').text('$0.00');
      $('#name, #phone, #address').val('');
      Materialize.toast('Your order was successfully submitted', 3000);
    }
  };

  // Submit form
  $('.btn-large').on('click', function() {
    name = $('#name').val();
    phone = $('#phone').val();
    address = $('#address').val();
    submitOrder();
  });
})();
