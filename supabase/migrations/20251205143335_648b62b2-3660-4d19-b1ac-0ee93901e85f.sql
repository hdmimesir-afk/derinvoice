-- Create table for invoice templates
CREATE TABLE public.invoice_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  invoice_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public access for now since no auth)
ALTER TABLE public.invoice_templates ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Anyone can read templates"
  ON public.invoice_templates
  FOR SELECT
  USING (true);

-- Allow public insert
CREATE POLICY "Anyone can create templates"
  ON public.invoice_templates
  FOR INSERT
  WITH CHECK (true);

-- Allow public delete
CREATE POLICY "Anyone can delete templates"
  ON public.invoice_templates
  FOR DELETE
  USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_invoice_templates_updated_at
  BEFORE UPDATE ON public.invoice_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();