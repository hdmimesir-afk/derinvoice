-- Add user_id column to invoice_templates table
ALTER TABLE public.invoice_templates 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can create templates" ON public.invoice_templates;
DROP POLICY IF EXISTS "Anyone can delete templates" ON public.invoice_templates;
DROP POLICY IF EXISTS "Anyone can read templates" ON public.invoice_templates;

-- Create secure RLS policies for authenticated users only
CREATE POLICY "Users can read own templates" 
ON public.invoice_templates 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own templates" 
ON public.invoice_templates 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own templates" 
ON public.invoice_templates 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates" 
ON public.invoice_templates 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);