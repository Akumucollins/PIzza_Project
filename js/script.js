/*Navigation Function */
$(document).ready(function () {
  $("#sidebar").mCustomScrollbar({
    theme: "minimal",
  });

  $("#dismiss, .overlay").on("click", function () {
    // hide sidebar
    $("#sidebar").removeClass("active");
    // hide overlay
    $(".overlay").removeClass("active");
  });

  $("#sidebarCollapse").on("click", function () {
    // open sidebar
    $("#sidebar").addClass("active");
    // fade in the overlay
    $(".overlay").addClass("active");
    $(".collapse.in").toggleClass("in");
    $("a[aria-expanded=true]").attr("aria-expanded", "false");
  });
});

/*Hover Function */
$(document).ready(function () {
  $(".card").hover(function () {
    $(this).children(".portfolio").fadeToggle("slow");
  });
});

/*Form Validation Function */
$(document).ready(function () {
  event.preventDefault();
  $("form#formValidation").submit(function () {
    var name = $("input#name").val();
    var email = $("input#email").val();
    var message = $("textarea#message").val();
    if (name && email) {
      alert(
        " Dear " +
          name +
          ", Thank you for reaching out to us. We have warmly received your message and we will get in touch."
      );
    } else {
      alert(" There's an incomplete in this form. Please try again");
    }
  });
});

/*PIZZA ORDER FUNTION */
// Business Logic

var total_price, pizza_topping, pizza_crust, delivery_price;
total = 0;
function Orderpizza(type, size, topping, crust, delivery) {
  this.type = type;
  this.size = size;
  this.topping = topping;
  this.crust = crust;
  this.delivery = delivery;
}

Orderpizza.prototype.fullOrder = function () {
  return (
    this.type +
    ", " +
    this.size +
    ", " +
    this.crust +
    ", " +
    this.topping +
    ", " +
    this.delivery
  );
};

// User Interface Logic

Orderpizza.prototype.totalPrice = function () {
  return qualityPrice + pizzaTopping + pizzaCrust + deliveryCost;
};

var sizePrice = [1050, 1500, 1800];
var toppingPrice = [50, 110, 50, 70, 80, 120, 100, 40, 90, 60, 60, 150, 90];
var crustPrice = [150, 180, 120, 150, 130, 200, 160];
var deliveryPrice = [300, 500, 0];

$(document).ready(function () {
  $("#orderForm").submit(function (event) {
    event.preventDefault();
    var type = parseInt($("#type").val());
    // alert(type)
    var size = parseInt($("#size").val());
    // alert(size)
    var topping = parseInt($("#topping").val());
    // alert(topping)
    var crust = parseInt($("#crust").val());
    // alert(crust)
    var quantity = parseInt($("input#qty").val());
    // alert(quantity)
    var delivery = ($("#delivery").val());
    // alert(delivery)

    qualityPrice = sizePrice[size - 1];
    // alert(qualityPrice);
    pizzaTopping = toppingPrice[topping - 1];
    // alert(pizzaTopping);
    pizzaCrust = crustPrice[crust - 1];
    // alert(pizzaCrust);
    deliveryCost = deliveryPrice[delivery - 1];
    // alert(deliveryCost);

    newgetpizza = new Orderpizza(type, size, topping, crust, delivery);
    // alert("Your bill is  " + newgetpizza.fullOrder());

    var checkOutTotal = 0;
    checkOutTotal = qualityPrice + pizzaTopping + pizzaCrust ;
    // alert(checkOutTotal);


   if(delivery === "pickUp" && quantity > 0){
     alert("Your Order is Ksh. " + checkOutTotal * quantity )
   }
   else if (delivery === "demand") {
    prompt(" Please Enter Your Phone Number")
    prompt("Enter Your Address For Your Delivery")
    alert("Mustachio Pizzeria Management has recieved your order and it will be delivered to you " +
    "Your Order is Ksh. " + (checkOutTotal * quantity )  + " and a charge of Ksh. 300 On Demand Delivery")
    alert.appendTo("#summary")

   } else if(delivery === "scheduled"){
    prompt(" Please Enter Your Phone Number")
    prompt("Enter Your Address For Your Delivery")
    alert("Mustachio Pizzeria Management has recieved your order and it will be delivered to you " + " Your Order is Ksh. " + (checkOutTotal * quantity )  + " and a charge of Ksh. 500 Scheduled On-Demand Delivery")
   }
  });
});