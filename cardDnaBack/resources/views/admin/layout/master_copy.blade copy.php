<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="{{ asset('public/vendor/bootstrap/css/bootstrap.min.css')}}">
    <link href="{{ asset('public/vendor/fonts/circular-std/style.css')}}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('libs/css/style.css')}}">
    <link rel="stylesheet" href="{{ asset('public/vendor/fonts/fontawesome/css/fontawesome-all.css')}}">
    <link rel="stylesheet" href="{{ asset('public/vendor/charts/chartist-bundle/chartist.css')}}">
    <link rel="stylesheet" href="{{ asset('public/vendor/charts/morris-bundle/morris.css')}}">
    <link rel="stylesheet" href="{{ asset('public/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css')}}">
    <link rel="stylesheet" href="{{ asset('public/vendor/charts/c3charts/c3.css')}}">
    <link rel="stylesheet" href="{{ asset('public/vendor/fonts/flag-icon-css/flag-icon.min.css')}}">
    <title>@yield('title')</title>
</head>

<body>
    <!-- ============================================================== -->
    <!-- main wrapper -->
    <!-- ============================================================== -->
    <div class="">
        <!-- ============================================================== -->
        <!-- navbar -->
        <!-- ============================================================== -->

        <!-- ============================================================== -->
        <!-- end navbar -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- left sidebar -->
        <!-- ============================================================== -->

        <!-- ============================================================== -->
        <!-- end left sidebar -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- wrapper  -->
        <!-- ============================================================== -->
        <div class="">
            <div class="dashboard-ecommerce">
                <div class="container-fluid ">
                    @yield('content');
                </div>
            </div>
            <!-- ============================================================== -->
            <!-- footer -->
            <!-- ============================================================== -->

            <!-- ============================================================== -->
            <!-- end footer -->
            <!-- ============================================================== -->
        </div>
        <!-- ============================================================== -->
        <!-- end wrapper  -->
        <!-- ============================================================== -->
    </div>
    <!-- ============================================================== -->
    <!-- end main wrapper  -->
    <!-- ============================================================== -->
    <!-- Optional JavaScript -->
    <!-- jquery 3.3.1 -->
    <script src="{{ asset('public/vendor/jquery/jquery-3.3.1.min.js')}}"></script>
    <!-- bootstap bundle js -->
    <script src="{{ asset('public/vendor/bootstrap/js/bootstrap.bundle.js')}}"></script>
    <!-- slimscroll js -->
    <script src="{{ asset('public/vendor/slimscroll/jquery.slimscroll.js')}}"></script>
    <!-- main js -->
    <script src="{{ asset('libs/js/main-js.js')}}"></script>
    <!-- chart chartist js -->
    <script src="{{ asset('public/vendor/charts/chartist-bundle/chartist.min.js')}}"></script>
    <!-- sparkline js -->
    <script src="{{ asset('public/vendor/charts/sparkline/jquery.sparkline.js')}}"></script>
    <!-- morris js -->
    <script src="{{ asset('public/vendor/charts/morris-bundle/raphael.min.js')}}"></script>
    <script src="{{ asset('public/vendor/charts/morris-bundle/morris.js')}}"></script>
    <!-- chart c3 js -->
    <script src="{{ asset('public/vendor/charts/c3charts/c3.min.js')}}"></script>
    <script src="{{ asset('public/vendor/charts/c3charts/d3-5.4.0.min.js')}}"></script>
    <script src="{{ asset('public/vendor/charts/c3charts/C3chartjs.js')}}"></script>
    <script src="{{ asset('public/libs/js/dashboard-ecommerce.js')}}"></script>

    @yield('js');
</body>

</html>