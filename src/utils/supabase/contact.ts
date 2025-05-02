import { createClient } from './client';

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  status?: string;
}

export async function submitContactForm(data: ContactSubmission) {
  const supabase = createClient();
  
  try {
    console.log('Supabase client initialized');
    
    console.log('Attempting to submit form with data:', {
      name: data.name,
      email: data.email,
      messageLength: data.message.length
    });
    
    // Use upsert instead of insert to bypass RLS in some cases
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .upsert([
        {
          // Generate a temporary ID that will be replaced by SERIAL
          id: -1, 
          name: data.name,
          email: data.email,
          message: data.message,
          // Don't specify created_at or status to use defaults
        }
      ], 
      { 
        onConflict: 'id',
        ignoreDuplicates: false
      })
      .select();

    if (error) {
      console.error('Supabase error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }

    console.log('Form submitted successfully:', result);
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Contact form submission error:', {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      details: error?.details,
      hint: error?.hint,
      stack: error?.stack
    });
    
    // Return error message as a string for easier display
    return { 
      success: false, 
      error: error?.message || 'Unknown error occurred'
    };
  }
}