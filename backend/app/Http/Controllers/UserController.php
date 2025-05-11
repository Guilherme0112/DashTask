<?php

    namespace App\Http\Controllers;

    use App\Models\User;
    use App\Services\UserService;
    use Exception;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\Request;
    use Illuminate\Validation\ValidationException;

    class UserController extends Controller{

        public function show(): JsonResponse{
            try {

                $user = User::all();
                return response()->json($user);

            } catch (Exception $e) {

                return response()->json(['errors'=> $e->getMessage()],500);
            }

        }

        public function store(Request $request, UserService $userService): JsonResponse{

            try {

                $user = $userService->save($request, null);      
                return response()->json($user);
            } catch (ValidationException $e) {

                return response()->json(['errors' => $e->errors()], 422);
            } catch (Exception $e) {

                return response()->json(['errors'=> $e->getMessage()],500);
            }
        }
    }