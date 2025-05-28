
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-application-name",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

interface PasswordResetRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Request method:", req.method);
  console.log("Request headers:", Object.fromEntries(req.headers.entries()));

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight request");
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  try {
    console.log("Processing password reset request");
    
    const { email }: PasswordResetRequest = await req.json();
    console.log("Password reset requested for email:", email);

    // Инициализируем Supabase клиент с service role для Admin API
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Инициализируем обычный клиент для проверки партнера
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Проверяем, существует ли партнер с таким email
    const { data: partnerExists, error: checkError } = await supabase.rpc('check_partner_exists', {
      p_email: email.trim().toLowerCase()
    });

    if (checkError) {
      console.error("Error checking partner existence:", checkError);
      throw new Error("Ошибка проверки партнера");
    }

    console.log("Partner exists check result:", partnerExists);

    if (!partnerExists) {
      console.log("Partner not found for email:", email);
      // Возвращаем успех даже если партнер не найден (безопасность)
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    // Генерируем токен восстановления пароля через Admin API
    console.log("Generating password reset token via Admin API");
    const originUrl = req.headers.get('origin') || 'https://partners.s3-tech.ru';
    
    const { data: resetData, error: resetError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        redirectTo: `${originUrl}/reset-password`
      }
    });

    if (resetError) {
      console.error("Error generating reset link:", resetError);
      throw new Error("Ошибка генерации ссылки восстановления");
    }

    console.log("Reset link generated successfully");
    
    // Отправляем кастомное письмо с правильной ссылкой
    console.log("Sending custom email via Resend");
    const emailResponse = await resend.emails.send({
      from: "S3 Partners <noreply@resend.dev>",
      to: [email],
      subject: "Восстановление пароля - S3 Partners",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e40af; margin: 0;">S3 Partners</h1>
          </div>
          
          <h2 style="color: #374151; margin-bottom: 20px;">Восстановление пароля</h2>
          
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
            Вы запросили восстановление пароля для вашего аккаунта в S3 Partners.
          </p>
          
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 30px;">
            Нажмите на кнопку ниже для создания нового пароля:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetData.properties.action_link}" 
               style="background: linear-gradient(to right, #1e40af, #0891b2); 
                      color: white; 
                      padding: 12px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: 600;
                      display: inline-block;">
              Восстановить пароль
            </a>
          </div>
          
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
            Если кнопка не работает, скопируйте и вставьте эту ссылку в браузер:
          </p>
          
          <p style="color: #1e40af; word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 4px; font-size: 14px;">
            ${resetData.properties.action_link}
          </p>
          
          <p style="color: #9ca3af; font-size: 14px; line-height: 1.6; margin-top: 30px;">
            Эта ссылка будет действительна в течение 24 часов.
          </p>
          
          <p style="color: #6b7280; line-height: 1.6; margin-top: 20px;">
            Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            © 2025 S3 Partners. Все права защищены.
          </p>
        </div>
      `,
    });

    console.log("Password reset email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-password-reset function:", error);
    return new Response(
      JSON.stringify({ error: "Произошла ошибка при отправке письма" }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
