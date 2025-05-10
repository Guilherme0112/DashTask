<?php

namespace App\Services;

use App\Models\Topic;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TopicService {

    public function save(Request $request, ?int $id = null): Topic
    {
        try {

            $validated = $request->validate([
                "name" => "required|min:2|max:50",
                "description" => "nullable|string",
                "value" => "nullable|numeric",
                "column_id" => "required|exists:column_for_topics,id"
            ]);

            if($id != null){
                $topic = Topic::findOrFail($id);
                $topic->update($validated);
                return $topic;
            }

            return Topic::create($validated);

        } catch (Exception | ValidationException $e) {
            throw $e;
        }
    }   

    public function delete(int $id): void
    {
        try {
            $topic = Topic::findOrFail($id);
            $topic->delete();
        } catch (Exception | ModelNotFoundException $e) {
            throw $e;
        }
    }

}