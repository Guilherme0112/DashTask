<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ColumnController;
use App\Http\Middleware\ValidateAuthTokenFromCookie;
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
Route::post("/logout", [AuthController::class,"logout"])->middleware([ValidateAuthTokenFromCookie::class])->name("logout");

Route::get("/column", [ColumnController::class, "index"])->name("column.index");
Route::post("/column", [ColumnController::class,"store"])->name("column.store");
Route::patch("/column/{id}", [ColumnController::class,"update"])->name("column.update");
Route::delete("/column/{id}", [ColumnController::class,"destroy"])->name("column.destroy");

Route::middleware([ValidateAuthTokenFromCookie::class])->get('/user', function (Request $request) {
    return $request->user();
});

