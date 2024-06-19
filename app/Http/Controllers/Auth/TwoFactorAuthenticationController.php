<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TwoFactorAuthenticationController extends Controller
{
    public function store(Request $request)
    {
        $request->user()->enableTwoFactorAuthentication();

        return response()->json(['message' => 'Two-factor authentication enabled.']);
    }

    public function destroy(Request $request)
    {
        $request->user()->disableTwoFactorAuthentication();

        return response()->json(['message' => 'Two-factor authentication disabled.']);
    }
}