@extends('admin.layout.master_copy')
@section('title', 'Configuration')
@section('content')

@if(isset($data) and isset($data['message']) and $data['message'] === 'success')
<div class="row mt-5">
    <div class="col-xl-1 col-lg-1 col-md-12"></div>
    <div class="col-xl-10 col-lg-10 col-md-12 ">
        <div class="alert alert-success" role="alert">
            You have Successfully configured the Gateway Configuration!!!! lets begin testing
        </div>
    </div>
    <div class="col-xl-1 col-lg-1 col-md-12"></div>
</div>
@elseif(isset($data) and isset($data['message']) and $data['message'] === 'failed')
<div class="row mt-5">
    <div class="col-xl-1 col-lg-1 col-md-12"></div>
    <div class="col-xl-10 col-lg-10 col-md-12 ">
        <div class="alert alert-success" role="alert">
            Something went wrong.. Please contact our support team for further assistance
        </div>
    </div>
    <div class="col-xl-1 col-lg-1 col-md-12"></div>
</div>
@elseif(isset($data) and isset($data['provider']))
<div class="row mt-5">
    <div class="col-xl-2 col-lg-2 col-md-12"></div>
    <div class="col-xl-8 col-lg-8 col-md-12 ">
        <div class="section-block" id="basicform">
            <h3 class="section-title">{{$data['provider']}} Payment Gateway IPG Configuration</h3>
            <!-- <p>Use custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.</p> -->
        </div>
        <div class="card">
            <h5 class="card-header">Merchant Information</h5>
            <div class="card-body">
                <form name="create-config-form" class="needs-validation" method="post" action="{{url('api/client/create-config')}}" id="createConfigForm">
                    @csrf @method('post')
                    @if(isset($errors))
                    <div class="text-danger">
                        {{ $errors->error->first('klarna_api_key') }}
                    </div>
                    @endif
                    <input type="hidden" class="form-control" id="validationCustom03" name="config_id" value="{{$data['config_id']}}">
                    <input type="hidden" class="form-control" id="validationCustom044" name="hostname" value="{{$data['hostname']}}">
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
                            <label for="{{$name}}">{{$label}}</label>
                            <input type="text" class="form-control" name="{{$name}}" id="{{$name}}">
                        </div>
                        @endforeach
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <button class="btn btn-primary" type="submit"><span id="submitCreateForm">Submit</span></button>
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
        $('#createConfigForm').submit(function(e) {
            e.preventDefault();
            $('#submitCreateForm').html('Submit');
            var queryString = $('#createConfigForm').serialize();
            const array = queryString.split('&');
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
                document.forms['create-config-form'].submit();
                $('#submitCreateForm').html('submtting...');
            }
        });
    });
</script>
@endsection