<?php

namespace App\Services;

use App\Models\ColumnForTopic;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ColumnForTopicsService
{

    /** Método que valida e salva a coluna
     * 
     * @param Request Requisição com os dados
     * @param int Id da coluna (para update)
     * @return ColumnForTopic Registro após o salvamento
     * 
     * @throws ValidationException Erros de validação
     * @throws Exception Erros genéricos
     */
    public function save(Request $request, ?int $id = null): ColumnForTopic
    {

        try {

            // Valida os dados da requisição 
            $validated = $request->validate([
                "name" => "required|min:2|max:80",
                "dateOfFleet" => "required|date",
                "startKM" => "required|numeric",
                "endKM" => "required|numeric",
                "valueForKM"=> "required|numeric",
            ]);


            // Salva o registro no banco de dados (caso não tenha passado um id)
            if ($id === null)
                return ColumnForTopic::create($validated);

            // Busca pela coluna e atualiza o registro
            $column = ColumnForTopic::findOrFail($id);
            $column->update($validated);

            return $column;

        } catch (ValidationException | Exception $e) {
            throw $e;
        }

    }

    /** Método que deleta uma coluna
     * 
     * @param int Id da coluna
     * 
     * @throws ModelNotFoundException Erro caso não encontre o registro
     * @throws Exception Erros genéricos
     */
    public function delete(int $id): void
    {
        try {

            // Busca pela coluna no banco de dados
            $column = ColumnForTopic::findOrFail($id);

            // Deleta os tópicos relacionados e deleta a coluna
            $column->topics()->delete();
            $column->delete();

        } catch (Exception | ModelNotFoundException $e) {
            throw $e;
        }
    }
}