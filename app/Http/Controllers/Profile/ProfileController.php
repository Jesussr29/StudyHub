<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\Stadistic;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
	public function index(){
        $userId = Auth::user()->id;

        $stadistics = Stadistic::all()->where('user_id', $userId);

        return inertia('profile/Index', [
            'stadistics' => $stadistics,
            'user' => Auth::user()->name,
        ]);

    }
}