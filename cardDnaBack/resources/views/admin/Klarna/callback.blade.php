<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Redirecting...</title>

    <!-- Bootstrap core CSS     -->
    <link rel="stylesheet" href="{{ asset('public/vendor/bootstrap/css/bootstrap.min.css')}}">
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
    @if(isset($data))
    <?php

    use Illuminate\Support\Facades\Log;

    Log::info($data);

    ?>
    @endif
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
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