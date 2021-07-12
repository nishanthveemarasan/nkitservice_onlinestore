<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Redirecting...</title>

    <!-- Bootstrap core CSS     -->
    <link rel="stylesheet" href="{{ asset('public/vendor/bootstrap/css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{ asset('public/libs/css/shopify.min.css')}}">
    <style>
        .message {
            margin-top: 30%;
            text-align: center;
        }

        .message h2 {
            padding-bottom: 5%;
            color: #5ab1f1;
        }


        form {
            display: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="message">
                    <div class="full-page-overlay__content">
                        <div class="shown-if-js">
                            <svg class="full-page-overlay__icon icon icon--spinner" xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="-270 364 66 66">
                                <path d="M-237 428c-17.1 0-31-13.9-31-31s13.9-31 31-31v-2c-18.2 0-33 14.8-33 33s14.8 33 33 33 33-14.8 33-33h-2c0 17.1-13.9 31-31 31z"></path>
                            </svg>

                            <h1 class="full-page-overlay__title">Redirecting…</h1>
                            <p class="full-page-overlay__text">
                                Please wait while we redirect you.
                            </p>
                            <p class="text-warning text-center">
                                <strong>DO NOT</strong> close the browser until you get back to our website. <br>
                            </p>
                        </div>
                    </div>
                </div>

                <form name="cocoon-form" method="POST" action="{{ $data['redirectUrl'] }}">
                    <input name="order_id" type="hidden" value="{{$data['orderId']}}" />
                    <input name="order_redirect_status" type="hidden" value="{{$data['redirectStatus']}}" />
                    <input name="order_status" type="hidden" value="{{$data['status']}}" />
                    <input name="order_message" type="hidden" value="{{$data['message']}}" />
                </form>

            </div>
        </div>
    </div>
    <script type="text/javascript">
        window.onload = function() {
            document.forms['cocoon-form'].submit()
        }
    </script>

</body>

</html>