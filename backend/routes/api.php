<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;

Route::get('/hello', function () {
    return response()->json([
        'mensagem' => 'Hello World'
    ]);
});


Route::post('/register', [UserController::class, "store"])->name("user.store");
Route::post('/login', [AuthController::class,'login'])->name('login');
Route::post("/logout", [AuthController::class,"logout"])->middleware("auth:sanctum")->name("logout");

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

