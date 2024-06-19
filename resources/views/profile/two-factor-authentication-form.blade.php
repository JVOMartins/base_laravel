@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Two-Factor Authentication') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ url('/user/two-factor-authentication') }}">
                        @csrf

                        @if (session('status') == 'two-factor-authentication-enabled')
                            <div class="alert alert-success" role="alert">
                                {{ __('Two-factor authentication has been enabled.') }}
                            </div>
                        @endif

                        @if (session('status') == 'two-factor-authentication-disabled')
                            <div class="alert alert-success" role="alert">
                                {{ __('Two-factor authentication has been disabled.') }}
                            </div>
                        @endif

                        @if (auth()->user()->two_factor_secret)
                            <div class="mb-4">
                                {{ __('Two-factor authentication is currently enabled.') }}
                            </div>

                            <div class="mb-4">
                                <h4>{{ __('Recovery Codes') }}</h4>
                                <ul>
                                    @foreach (json_decode(decrypt(auth()->user()->two_factor_recovery_codes), true) as $code)
                                        <li>{{ $code }}</li>
                                    @endforeach
                                </ul>
                            </div>

                            <div class="mb-4">
                                <h4>{{ __('QR Code') }}</h4>
                                <img src="{{ $user->twoFactorQrCodeUrl() }}" alt="QR Code">
                            </div>

                            <button type="submit" class="btn btn-danger">
                                {{ __('Disable Two-Factor Authentication') }}
                            </button>
                        @else
                            <button type="submit" class="btn btn-primary">
                                {{ __('Enable Two-Factor Authentication') }}
                            </button>
                        @endif
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
