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

/*Business Logic Function */
var price, pizza_crust, pizza_topping;
let total = 0;
function Order(type, size, crust, topping, total) {
  this.type = type;
  this.size = size;
  this.crust = crust;
  this.topping = topping;
  this.total = total;
}

// proceed button
$(document).ready(function () {
  $("button.proceed").click(function (event) {
    let Ptype = $("#type  option:selected").val();
    let psize = $("#size option:selected").val();
    let pcrust = $("#crust option:selected").val();
    let ptopping = [];
    $.each($("input[name='toppings']:checked"), function () {
      ptopping.push($(this).val());
    });
    console.log(ptopping.join(", "));

    switch (psize) {
      case "0":
        price = 0;
        break;
      case "Small":
        price = 1000;
        console.log(price);
        break;
      case "Medium":
        price = 1200;
        console.log(price);
        break;
      case "Large":
        price = 1500;
        console.log(price);
      default:
        console.log(error);
    }
    switch (pcrust) {
      case "0":
        pizza_crust = 0;
        break;
      case "Thick-Classic":
        pizza_crust = 150;
        break;
      case "Cheese-Filled":
        pizza_crust = 180;
        break;
      case "Pescara":
        pizza_crust = 120;
        break;
      case "Deep-Dish":
        pizza_crust = 150;
        break;
      case "Gluten-Free":
        pizza_crust = 130;
        break;
      case "Cripsy":
        pizza_crust = 200;
        break;
      case "Stuffed":
        pizza_crust = 160;
        break;
      default:
        console.log("no price");
    }
    let pizza_topping = ptopping.length * 150;
    console.log("toppings value" + pizza_topping);

    if (psize == "0" && pcrust == "0") {
      console.log("nothing selected");
      $("button.proceed").show();
      $("div.yourChoice").hide();
      alert(
        "Please select your favorite pizza-type, pizza-size and pizza-crust"
      );
    } else {
      $("button.proceed").hide();
      $("#info").hide();
      $("div.yourChoice").slideDown(1000);
    }

    total = price + pizza_crust + pizza_topping;
    console.log(total);
    let checkoutTotal = 0;
    checkoutTotal = checkoutTotal + total;

    $("#pizzatype").html($("#type  option:selected").val());
    $("#pizzasize").html($("#size option:selected").val());
    $("#pizzacrust").html($("#crust option:selected").val());
    $("#pizzatopping").html(ptopping.join(", "));
    $("#yourbill").html(total);

    // Add pizza button
    $("button.qty").click(function () {
      let type = $("#type option:selected").val();
      let psize = $("#size option:selected").val();
      let pcrust = $("#crust option:selected").val();
      let ptopping = [];
      $.each($("input[name='toppings']:checked"), function () {
        ptopping.push($(this).val());
      });
      console.log(ptopping.join(", "));
      switch (psize) {
        case "0":
          price = 0;
          break;
        case "Small":
          price = 1000;
          console.log(price);
          break;
        case "Medium":
          price = 1200;
          console.log(price);
          break;
        case "Large":
          price = 1500;
          console.log(price);
        default:
          console.log(error);
      }
      switch (pcrust) {
        case "0":
          pizza_crust = 0;
          break;
        case "Thick-Classic":
          pizza_crust = 150;
          break;
        case "Cheese-Filled":
          pizza_crust = 180;
          break;
        case "Pescara":
          pizza_crust = 120;
          break;
        case "Deep-Dish":
          pizza_crust = 150;
          break;
        case "Gluten-Free":
          pizza_crust = 130;
          break;
        case "Cripsy":
          pizza_crust = 200;
          break;
        case "Stuffed":
          pizza_crust = 160;
          break;
        default:
          console.log("No Price");
      }

      let pizza_topping = ptopping.length * 150;
      console.log("toppings value" + pizza_topping);

      total = price + pizza_crust + pizza_topping;
      console.log(total);

      checkoutTotal = checkoutTotal + total;
      console.log(checkoutTotal);

      /*Users Interface Function*/

      var newOrder = new Order(type, psize, pcrust, ptopping, total);

      $("#ordersmade").append(
        '<tr><td id="pizzatype">' +
          newOrder.type +
          '</td><td id="pizzasize">' +
          newOrder.size +
          '</td><td id="pizzacrust">' +
          newOrder.crust +
          '</td><td id="pizzatopping">' +
          newOrder.topping +
          '</td><td id="yourbill">' +
          newOrder.total +
          "</td></tr>"
      );
      console.log(newOrder);
    });
    // Checkout button
    $("button#checkout").click(function () {
      $("button#checkout").hide();
      $("button.qty").hide();
      $("button.delivery").slideDown("slow");
      $("#additionalprice").slideDown("slow");
      // console.log("Your Total Bill is Ksh. " + checkoutTotal);
      console.log(
        $("#pizzatotal").append("Your Bill is Ksh. " + checkoutTotal)
      );
    });

    // On Delivery Button
    $("button.delivery").click(function () {
      $(".pizzatable").hide();
      $(".yourChoice h2").hide();
      $("#delivery").slideDown("slow");
      $("#additionalprice").hide();
      $("button.delivery").hide();
      $("#pizzatotal").hide();
      let deliveryTotal = checkoutTotal + 500;
      // console.log("You will pay sh. " + deliveryTotal + " on delivery");
      console.log(
        $("#totalbill").append(
          "Your bill plus delivery fee is: " + deliveryTotal
        )
      );
    });

    // Place Order Button
    $("button#final-order").click(function (event) {
      event.preventDefault();

      $("#pizzatotal").hide();
      $("#delivery").hide();
      $("button#final-order").hide();
      let deliveryTotal = checkoutTotal + 500;
      console.log("Your Final Bill is: Ksh. " + deliveryTotal);
      let personName = $("input#name").val();
      let phone = $("input#phone").val();
      let location = $("input#address").val();

      if (
        $("input#name").val() &&
        $("input#phone").val() &&
        $("input#address").val() != ""
      ) {
        $("#finalmessage").append(
          personName +
            ", Mustachio Pizzeria Management has recieved your order and it will be delivered to you at " +
            location +
            ". Your Final Bill Ksh. " +
            deliveryTotal
        );
        $("#totalbill").hide();
        $("#finalmessage").slideDown(1200);
      } else {
        alert("Please fill in your details for delivery!");
        $("#delivery").show();
        $("button#final-order").show();
      }
    });
    event.preventDefault();
  });
});
