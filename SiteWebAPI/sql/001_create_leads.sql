CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  area TEXT NOT NULL,
  comentario TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);