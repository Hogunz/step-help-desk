<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminUser = User::create([
            'name' => 'admin',
            'email' => 'admin@cdd.edu.ph',
            'password' => Hash::make('wxcbdjmpy1414'),
        ]);


        Role::create(['name' => 'admin']);
        $adminUser->assignRole('admin');
    }
}
