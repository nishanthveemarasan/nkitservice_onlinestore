<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Redirecting...</title>

    <!-- Bootstrap core CSS     -->
    <link rel="stylesheet" href="{{ asset('vendor/bootstrap/css/bootstrap.min.css')}}">
    <link href="{{ asset('vendor/fonts/circular-std/style.css')}}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('libs/css/style.css')}}">
    <link rel="stylesheet" href="{{ asset('vendor/fonts/fontawesome/css/fontawesome-all.css')}}">
    <style>
        .message {
            margin-top: 30%;
            text-align: center;
        }

        .message h2 {
            padding-bottom: 5%;
            color: #5ab1f1;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <form name="send-payme-url" method="POST" action="{{$responseData['redirectUrl'] }}">
                    <input name="verify_result" type="text" value="{{$responseData['result']}}" />
                </form>

            </div>
        </div>
    </div>
    <script type="text/javascript">
        window.onload = function() {
            document.forms['send-payme-url'].submit()
        }
    </script>

</body>

</html>