<?php

use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TopicService {

    public function save(Request $request, ?int $id = null): Topic
    {
        try {
            
            $request->validate([
                "name" => "required|min:2|max:50",
                "description" => "nullable|string",
                "value" => "nullable|number|min:0",
            ]);


        } catch (Exception | ValidationException $e) {
            throw $e;
        }
    }   

    // public function delete(): void
    // {

    // }

}