@extends('admin.layout.master_copy')
@section('title', 'Configuration')
@section('content')


@if(isset($data))
<div class="row">
    <div class="col-xl-2 col-lg-2 col-md-12"></div>
    <div class="col-xl-8 col-lg-8 col-md-12 ">
        <div class="section-block" id="basicform">
            <h3 class="section-title">{{$data['provider']}} Payment Gateway IPG Configuration</h3>
            <!-- <p>Use custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.</p> -->
        </div>
        <div class="card">
            <form class="needs-validation" method="post" action="" id="updateConfigForm">
                @csrf @method('post')
                <h5 class="card-header">Merchant Information</h5>
                <div class="card-body">


                    <div class="row" style="display:none" id="alertArea">
                        <div class="col-xl-2 col-lg-2 col-md-12"></div>
                        <div class="col-xl-8 col-lg-8 col-md-12 ">
                            <div class="alert" role="alert" id="alertBox">
                                <span id="showUpdateMessage"></span>
                            </div>
                        </div>
                        <div class="col-xl-2 col-lg-2 col-md-12"></div>
                    </div>
                    <input type="hidden" class="form-control" id="config_id" name="config_id" value="{{$data['config_id']}}">
                    <div class="form-row  mb-2">
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-2">
                            <label for="validationCustom03">First Name</label>
                            <input type="text" class="form-control" id="validationCustom03" value="{{$data['firt_name']}}" readonly>

                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-2">
                            <label for="validationCustom04">Last Name</label>
                            <input type="text" class="form-control" id="validationCustom04" value="{{$data['last_name']}}" readonly>
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
                            <label for="validationCustom01">IPG Provider</label>
                            <input type="text" class="form-control" id="validationCustom01" value="{{$data['provider']}}" readonly>
                        </div>
                    </div>
                    <div class="card mt-3 mb-3">
                        <h5 class="card-header">Test Credentials</h5>
                        <div class="card-body">
                            <div class="row ">
                                @foreach($data['formData'] as $label => $name)
                                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                    <label for="validationCustom01">{{$label}}</label>
                                    <input type="text" class="form-control" id="{{$name}}_test" name="{{$name}}_test" value="{{$data['configTestData'][$name]}}">
                                </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <div class="card mt-3 mb-3 klarna_live_data" style="display:none">
                        <h5 class="card-header">Live Credentials</h5>
                        <div class="card-body">
                            <div class="row ">
                                @foreach($data['formData'] as $label => $name)
                                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                    <label for="validationCustom01">{{$label}}</label>
                                    <input type="text" class="form-control" id="{{$name}}_live" name="{{$name}}_live" value="{{isset($data['configLiveData'][$name]) ? $data['configLiveData'][$name] : ''}}">
                                </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3">



                            <h5>Test Mode</h5>
                            <label class="custom-control custom-radio custom-control-inline">
                                <input type="radio" name="klarna_test_mode" @if($data['testMode']==='test' )checked="" @endif class="custom-control-input klarna_test_mode_method" value="test"><span class="custom-control-label">Test</span>
                            </label>
                            <label class="custom-control custom-radio custom-control-inline">
                                <input type="radio" name="klarna_test_mode" @if($data['testMode']==='live' )checked="" @endif class="custom-control-input klarna_test_mode_method" value="live"><span class="custom-control-label">Live</span>
                            </label>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <button class="btn btn-primary" type="submit"><span id="configFormSubmit">Update</span></button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    </div>
    <div class="col-xl-2 col-lg-2 col-md-12"></div>
</div>
@endif

@endsection

@section('js')
<script>
    $(document).ready(function() {
        var radioValue = $("input[name='klarna_test_mode']:checked").val();
        if (radioValue === 'live') {
            $('.klarna_live_data').show();
        } else {
            $('.klarna_live_data').hide();
        }
        $("input[type='radio']").change(function() {

            var radioValue = $("input[name='klarna_test_mode']:checked").val();
            if (radioValue === 'live') {
                $('.klarna_live_data').show();
            } else {
                $('.klarna_live_data').hide();
            }
        });
        $('#updateConfigForm').submit(function(e) {
            e.preventDefault();
            var queryString = $('#updateConfigForm').serialize();
            const array = queryString.split('&');
            //console.log(queryString);
            const inputArray = array.splice(2);
            let isFormValid = true;

            const testMode = $("input[name='klarna_test_mode']:checked").val();

            inputArray.forEach((item, index) => {
                const itemvalue = item.split('=');
                if (testMode === 'test' && itemvalue[0].includes('_live')) {

                } else {
                    if (itemvalue[1] === '') {
                        isFormValid = false;
                        $(`#${itemvalue[0]}`).addClass("inputError");
                    } else {
                        $(`#${itemvalue[0]}`).removeClass("inputError");
                    }
                }

            });


            if (isFormValid) {
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    }
                });
                $.ajax({
                    type: 'POST',
                    url: "{{ url('api/latestClient/update-config') }}",
                    data: queryString,
                    dataType: 'json',
                    beforeSend: function() {
                        $('#alertArea').hide();
                        $('#configFormSubmit').html('please wait');
                    },
                    success: function(data) {
                        $('#configFormSubmit').html('update');
                        if (data.type === 'success') {
                            $('#alertArea').show();
                            $('#showUpdateMessage').html(data.message);
                            $('#alertBox').addClass('alert-success');
                        }
                    }
                });
            }
        });
    });
</script>
@endsection