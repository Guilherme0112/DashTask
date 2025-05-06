<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use TopicService;

class TopicController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Topic::all());
    }

    public function store(Request $request, TopicService $topicService): JsonResponse
    {

        try {
            
            // $topicService->save($request, null);
            return response()->json($request);

        } catch (\Throwable $th) {
            //throw $th;
        }
        
        return response()->json($request);
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
