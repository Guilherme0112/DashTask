<?php

    namespace App\Http\Controllers;

    use App\Services\UserService;
    use Illuminate\Http\Request;
    use Illuminate\Validation\ValidationException;

    class UserController extends Controller{


        public function store(Request $request, UserService $userService){

            try {

                $userService->save($request, null);
                
                return response()->json($request);

            } catch (ValidationException $e) {

                return response()->json(['errors' => $e->errors()], 422);

            } catch (\Throwable $th) {

                return response()->json(['errors'=> $th->getMessage()],500);

            }

            

        }

    }