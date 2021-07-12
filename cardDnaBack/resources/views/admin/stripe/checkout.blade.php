<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('public/libs/css/global.css')}}">
    <script src="https://js.stripe.com/v3/"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=fetch"></script>
    <title>Checkout</title>
</head>

<body>
    <!-- Display a payment form -->
    <form id="payment-form">
        <div id="card-element">
            <!--Stripe.js injects the Card Element-->
        </div>
        <button id="submit">
            <div class="spinner hidden" id="spinner"></div>
            <span id="button-text">Pay now</span>
        </button>
        <p id="card-error" role="alert"></p>
        <p class="result-message hidden">
            Payment succeeded, see the result in your
            <a href="" target="_blank">Stripe dashboard.</a> Refresh the page to pay again.
        </p>
    </form>
    <div style="display:none">
        <form id="stripe-complete-form" action="{{ url('api/stripe/response') }}" method="post">
            <input type="hidden" id="orderNumber" name="orderNumber" value="{{$payment['orderId']}}" />
            <input type="hidden" id="payResult" name="payResult" value="" />
            <input type="hidden" id="payResultContent" name="payResultContent" value="" />
            <input type="submit" value="Submit">
        </form>
    </div>

    <script>
        // A reference to Stripe.js initialized with your real test publishable API key.
        var stripe = Stripe("{{$config['klarna_api_publishable_key']}}");

        // The items the customer wants to buy
        var purchase = {
            orderId: "{{$payment['orderId']}}",
            hostName: "{{$payment['hostName']}}",
            gatewayToken: "{{$payment['gatewayToken']}}",
            amount: "{{$payment['amount']}}",
            currency: "{{$payment['currency']}}",
            key: "{{$config['klarna_api_key']}}"

        };

        // Disable the button until we have Stripe set up on the page
        document.querySelector("button").disabled = true;
        fetch("/plugin-app/api/stripe/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(purchase)
            })
            .then(function(result) {
                return result.json();
            })
            .then(function(data) {
                var elements = stripe.elements();

                var style = {
                    base: {
                        color: "#32325d",
                        fontFamily: 'Arial, sans-serif',
                        fontSmoothing: "antialiased",
                        fontSize: "16px",
                        "::placeholder": {
                            color: "#32325d"
                        }
                    },
                    invalid: {
                        fontFamily: 'Arial, sans-serif',
                        color: "#fa755a",
                        iconColor: "#fa755a"
                    }
                };

                var card = elements.create("card", {
                    style: style
                });
                // Stripe injects an iframe into the DOM
                card.mount("#card-element");

                card.on("change", function(event) {
                    // Disable the Pay button if there are no card details in the Element
                    document.querySelector("button").disabled = event.empty;
                    document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
                });

                var form = document.getElementById("payment-form");
                form.addEventListener("submit", function(event) {
                    event.preventDefault();
                    // Complete payment when the submit button is clicked

                    payWithCard(stripe, card, data.clientSecret);
                });
            });

        // Calls stripe.confirmCardPayment
        // If the card requires authentication Stripe shows a pop-up modal to
        // prompt the user to enter authentication details without leaving your page.
        var payWithCard = function(stripe, card, clientSecret) {
            loading(true);
            stripe
                .confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: card
                    },
                    return_url: '{{ $return_url }}',
                })
                .then(function(result) {
                    if (result.error) {
                        console.log(result.error);
                        // $('#payResult').val('failed');
                        document.getElementById('payResult').value = "failed";
                        document.getElementById('payResultContent').value = result.error.message;
                        document.forms['stripe-complete-form'].submit();

                    } else {
                        // The payment succeeded!
                        document.getElementById('payResult').value = "success";
                        document.getElementById('payResultContent').value = result.paymentIntent.id;
                        document.forms['stripe-complete-form'].submit();
                        //  orderComplete(result.paymentIntent.id);
                    }
                });
        };

        /* ------- UI helpers ------- */

        // Shows a success message when the payment is complete
        var orderComplete = function(paymentIntentId) {
            loading(false);
            document
                .querySelector(".result-message a")
                .setAttribute(
                    "href",
                    "https://dashboard.stripe.com/test/payments/" + paymentIntentId
                );
            document.querySelector(".result-message").classList.remove("hidden");
            document.querySelector("button").disabled = true;
        };

        // Show the customer the error from Stripe if their card fails to charge
        var showError = function(errorMsgText) {
            loading(false);
            var errorMsg = document.querySelector("#card-error");
            errorMsg.textContent = errorMsgText;
            setTimeout(function() {
                errorMsg.textContent = "";
            }, 4000);
        };

        // Show a spinner on payment submission
        var loading = function(isLoading) {
            if (isLoading) {
                // Disable the button and show a spinner
                document.querySelector("button").disabled = true;
                document.querySelector("#spinner").classList.remove("hidden");
                document.querySelector("#button-text").classList.add("hidden");
            } else {
                document.querySelector("button").disabled = false;
                document.querySelector("#spinner").classList.add("hidden");
                document.querySelector("#button-text").classList.remove("hidden");
            }
        };
    </script>

</body>

</html>