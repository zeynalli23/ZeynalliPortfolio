<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\PortfolioContactMail;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        // 1. Gelen verileri doğrula
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        try {
            // 2. Maili gönder
            Mail::to('zeynalli0204@gmail.com')->send(new PortfolioContactMail($validatedData));

            return response()->json([
                'success' => true,
                'message' => 'Mesaj başarıyla gönderildi!'
            ], 200)->header('Access-Control-Allow-Origin', '*');
        } catch (\Exception $e) {
            // Hata detaylarını logla
            \Log::error('Mail gönderme hatası: ' . $e->getMessage(), [
                'exception' => $e,
                'data' => $validatedData
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Mail gönderilirken hata oluştu.',
                'message' => config('app.debug') ? $e->getMessage() : 'Lütfen daha sonra tekrar deneyin.'
            ], 500)->header('Access-Control-Allow-Origin', '*');
        }
    }
}