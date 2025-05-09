<?php

namespace App\Http\Controllers;

use App\Models\ColumnForTopic;
use App\Services\ColumnForTopicsService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ColumnController extends Controller
{
    public function index(): JsonResponse
    {
        $columns = ColumnForTopic::with('topics')->latest()->get();
        return response()->json($columns);
    }

    /** Método que salva uma coluna no banco de dados
     *
     * @param Request Requisição vinda do front
     * @param ColumnForTopicsService Service que valida as colunas
     * @return JsonResponse Registro da coluna no banco de dados (Quando criada)
     * 
     * @throws ValidationException Erros de validação
     * @throws Exception Erros genéricos
     */
    public function store(Request $request, ColumnForTopicsService $columnForTopicsService): JsonResponse
    {

        try {

            // Valida e tenta salvar os dados no banco de dados
            $column = $columnForTopicsService->save($request);

            // Retorna o registro salvo no banco de dados
            return response()->json($column);

        } catch (ValidationException $e) {

            // Retorna as mensagens de erro das exceptions
            return response()->json(["errors" => $e->errors()], 400);
        
        } catch (Exception $e) {

            // Retorna as mensagens de erro das exceptions
            return response()->json(["errors" => $e->getMessage()], 500);
        }
    }


    /** Método que atualiza uma coluna no banco de dados
     *
     * @param Request Requisição vinda do front
     * @param ColumnForTopicsService Service que valida as colunas
     * @param int Id da coluna que deseja atualizar
     * @return JsonResponse Registro da coluna no banco de dados (Quando criada)
     * 
     * @throws ValidationException Erros de validação
     * @throws Exception Erros genéricos
     */
    public function update(Request $request, ColumnForTopicsService $columnForTopicsService, int $id): JsonResponse
    {

        try {

            // Valida e tenta salvar os dados no banco de dados
            $column = $columnForTopicsService->save($request, $id);

            // Retorna o registro salvo no banco de dados
            return response()->json($column);

        } catch (ValidationException $e) {
            return response()->json(["errors" => $e->errors()], 400);

        } catch (Exception $e) {
            return response()->json(["errors" => $e->getMessage()], 500);
        }
    }

    /** Método que deleta uma coluna e seus tópicos
     * 
     * @param int Id da coluna
     * @param ColumnForTopicsService Service da coluna
     */
    public function destroy(int $id, ColumnForTopicsService $columnForTopicsService): JsonResponse
    {
        try {

            $columnForTopicsService->delete($id);

            return response()->json(["success" => "Coluna deletada com sucesso"], 200);

        } catch (Exception | ModelNotFoundException $e) {

            return response()->json(["errors" => "Não foi possível deletar esta coluna"], 400);
        }
    }
}
