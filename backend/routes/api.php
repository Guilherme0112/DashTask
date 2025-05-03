<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

Route::get('/', function () {
    return response()->json([
        'status' => 'teste',
        'mensagem' => 'teste mensagem'
    ]);
});


Route::post('/register', [UserController::class, "store"])->name("user.store");
Route::post('/login', [AuthController::class,'login'])->name('auth.login');
Route::post("/logout", [AuthController::class,"logout"])->middleware("auth:sanctum")->name("auth.logout");

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

