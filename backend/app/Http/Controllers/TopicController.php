<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Services\TopicService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TopicController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Topic::all());
    }

    public function store(Request $request, TopicService $topicService): JsonResponse
    {

        try {
            
            $topic = $topicService->save($request, null);
            return response()->json($topic);

        } catch (ValidationException $e) {

            return response()->json(["errors" => $e->errors()], 400);

        } catch (Exception | ModelNotFoundException  $e) {

            return response()->json(["errors" => $e->getMessage()], 500);
        }
        
    }

    public function update(Request $request, int $id, TopicService $topicService) : JsonResponse
    {

        try {

            $topic = $topicService->save($request, $id);
            return response()->json($topic);

        } catch (ValidationException $e) {

            return response()->json(["errors" => $e->errors()], 400);

        } catch (Exception | ModelNotFoundException  $e) {

            return response()->json(["errors" => $e->getMessage()], 500);
        }

        
    }

    public function destroy(int $id, TopicService $topicService): JsonResponse
    {   
        try {

            $topicService->delete($id);
            return response()->json(["success" => "Tópico deletado com sucesso"], 200);

        } catch (Exception | ModelNotFoundException $e) {

            return response()->json(["errors" => $e->getMessage()], 500);
        }   
    }

}
