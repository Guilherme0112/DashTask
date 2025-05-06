<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ColumnController;
use App\Http\Controllers\TopicController;
use App\Http\Middleware\ValidateAuthTokenFromCookie;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;

Route::get('/hello', function () {
    return response()->json([
        'mensagem' => 'Hello World'
    ]);
});

// Autenticação e usuário
Route::middleware([ValidateAuthTokenFromCookie::class])->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [UserController::class, "store"])->name("user.store");
Route::post('/login', [AuthController::class,'login'])->name('login');
Route::post("/logout", [AuthController::class,"logout"])->middleware([ValidateAuthTokenFromCookie::class])->name("logout");

// Colunas
Route::get("/column", [ColumnController::class, "index"])->middleware([ValidateAuthTokenFromCookie::class])->name("column.index");
Route::post("/column", [ColumnController::class,"store"])->middleware([ValidateAuthTokenFromCookie::class])->name("column.store");
Route::patch("/column/{id}", [ColumnController::class,"update"])->middleware([ValidateAuthTokenFromCookie::class])->name("column.update");
Route::delete("/column/{id}", [ColumnController::class,"destroy"])->middleware([ValidateAuthTokenFromCookie::class])->name("column.destroy");

// Tópicos
Route::get("/topics", [TopicController::class,"index"])->name("topic.index");
Route::post("/topics", [TopicController::class,"store"])->name("topic.store");
Route::patch("/topics/{id}", [TopicController::class,"update"])->name("topic.update");
Route::delete("/topics/{id}", [TopicController::class,"destroy"])->name("topic.destroy");


