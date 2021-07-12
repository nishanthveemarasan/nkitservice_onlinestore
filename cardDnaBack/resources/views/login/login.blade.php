@extends('login.layout.app')
@section('title', 'Login Page')
@section('content')
<div class="card ">
    <div class="card-header text-center"><a href="../index.html"><img class="logo-img" src="../assets/images/logo.png" alt="logo"></a><span class="splash-description">Please enter your user information.</span></div>
    <div class="card-body">
        <form>
            <div class="form-group">
                <input class="form-control form-control-lg" id="username" type="text" placeholder="Username" autocomplete="off">
            </div>
            <div class="form-group">
                <input class="form-control form-control-lg" id="password" type="password" placeholder="Password">
            </div>
            <div class="form-group">
                <label class="custom-control custom-checkbox">
                    <input class="custom-control-input" type="checkbox"><span class="custom-control-label">Remember Me</span>
                </label>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block">Sign in</button>
        </form>
    </div>
    <div class="card-footer bg-white">
        <p>Not a Member? <a href="{{ url('/registration')}}" class="text-secondary">Signup Here.</a></p>
    </div>

</div>
@endsection