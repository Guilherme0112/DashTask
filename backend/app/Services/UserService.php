<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class UserService
{
    public function save(Request $request, $id)
    {
        // Valida os dados
        $validated = $request->validate([
            'name' => 'required|min:2|max:40',
            'email' => 'required|email|unique:users,email,' . ($id ? $id : 'NULL') . ',id',
            'password' => 'required|min:6',
        ]);

        try {

            // Se for novo usuário, cria, se já existir, atualiza 
            $id ? $user = User::findOrFail($id) : $user = new User();

            $user->name = $validated['name'];
            $user->email = $validated['email'];

            // Criptografar senha
            $user->password = bcrypt($validated['password']); 

            // Salvar no banco
            $user->save();

            return $user;

        } catch (ValidationException $e) {

            return response()->json(['errors' => $e->errors()], 422);

        } catch (\Throwable $th) {

            throw new \Exception('Erro ao salvar o usuário: ' . $th->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            // Encontrar o usuário e excluir
            $user = User::findOrFail($id);
            $user->delete();
            
            return response()->json("Usuário excluído com sucesso", 200);

        } catch (\Throwable $th) {
            // Tratar erro caso não consiga encontrar o usuário
            throw new \Exception('Erro ao excluir o usuário: ' . $th->getMessage());
        }
    }
}
