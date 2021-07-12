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
            <h5 class="card-header">Merchant Information</h5>
            <div class="card-body">
                <form class="needs-validation" method="post" action="" id="updateConfigForm">
                    @csrf @method('post')

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
                        @foreach($data['formData'] as $label => $name)
                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                            <label for="validationCustom01">{{$label}}</label>
                            <input type="text" class="form-control" id="{{$name}}" name="{{$name}}" value="{{$data['configData'][$name]}}">
                        </div>
                        @endforeach
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <button class="btn btn-primary" type="submit"><span id="configFormSubmit">Update</span></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-xl-2 col-lg-2 col-md-12"></div>
</div>
@endif

@endsection

@section('js')
<script>
    $(document).ready(function() {
        $('#updateConfigForm').submit(function(e) {
            e.preventDefault();
            var queryString = $('#updateConfigForm').serialize();
            const array = queryString.split('&');
            //console.log(queryString);
            const inputArray = array.splice(3);
            let isFormValid = true;
            inputArray.forEach((item, index) => {
                const itemvalue = item.split('=');
                if (itemvalue[1] === '') {
                    isFormValid = false;
                    $(`#${itemvalue[0]}`).addClass("inputError");
                } else {
                    $(`#${itemvalue[0]}`).removeClass("inputError");
                }
            });
            if (isFormValid) {
                console.log('hi');
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    }
                });
                const data = {
                    'config_id': $('#config_id').val(),
                    'klarna_api_key': $('#klarna_api_key').val(),
                    'klarna_api_publishable_key': $('#klarna_api_publishable_key').val(),
                    'klarna_country_code': $('#klarna_country_code').val(),
                    'klarna_lang_code': $('#klarna_lang_code').val(),
                }
                $.ajax({
                    type: 'POST',
                    url: "{{ url('api/client/update-config') }}",
                    data: data,
                    dataType: 'json',
                    beforeSend: function() {
                        $('#alertArea').hide();
                        $('#configFormSubmit').html('please wait');
                    },
                    success: function(data) {
                        $('#configFormSubmit').html('update');
                        if (data.message === 'success') {
                            $('#alertArea').show();
                            $('#showUpdateMessage').html("Config data has been updated successfully!!!");
                            $('#alertBox').addClass('alert-success');
                        }
                    }
                });
            }

            // const data = {
            //     'config_id': $('#config_id').val(),
            //     'klarna_api_key': $('#klarna_api_key').val(),
            //     'klarna_api_publishable_key': $('#klarna_api_publishable_key').val(),
            //     'klarna_country_code': $('#klarna_country_code').val(),
            //     'klarna_lang_code': $('#klarna_lang_code').val(),
            // }
            // console.log(data);

        });
    });
</script>
@endsection