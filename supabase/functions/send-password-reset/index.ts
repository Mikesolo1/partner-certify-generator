
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

    // Инициализируем Supabase клиент
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

    // Используем Supabase Auth для сброса пароля с корректным redirectTo
    console.log("Calling Supabase auth resetPasswordForEmail");
    const originUrl = req.headers.get('origin') || 'https://partners.s3-tech.ru';
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${originUrl}/reset-password`,
    });

    if (authError && !authError.message.includes('not found')) {
      console.error("Auth error:", authError);
      throw new Error("Ошибка отправки письма восстановления");
    }

    console.log("Password reset process completed successfully");

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
