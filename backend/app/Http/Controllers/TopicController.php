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

        } catch (Exception | ModelNotFoundException | ValidationException $e) {

            return response()->json(["errors" => $e->getMessage()]);
        }
        
    }

    public function update(Request $request, int $id): JsonResponse
    {
        return response()->json($request);
    }

    public function destroy(int $id): JsonResponse
    {   
        return response()->json($id);
    }

}
