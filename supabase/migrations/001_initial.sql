-- Enum de categorías
CREATE TYPE categoria_enum AS ENUM (
  'vestidos', 'blusas', 'pantalones', 'sacos', 'accesorios'
);

-- Tabla principal
CREATE TABLE prendas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  descripcion text NOT NULL DEFAULT '',
  categoria categoria_enum NOT NULL,
  precio numeric(10,2) NOT NULL,
  talles text[] NOT NULL DEFAULT '{}',
  imagen_url text NOT NULL DEFAULT '',
  activa boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON prendas
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Habilitar RLS
ALTER TABLE prendas ENABLE ROW LEVEL SECURITY;

-- Lectura pública solo de prendas activas
CREATE POLICY "public_read_active" ON prendas
  FOR SELECT USING (activa = true);

-- Solo autenticados pueden escribir
CREATE POLICY "auth_insert" ON prendas
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "auth_update" ON prendas
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "auth_delete" ON prendas
  FOR DELETE USING (auth.role() = 'authenticated');

-- Admin puede leer todas las prendas (activas e inactivas)
CREATE POLICY "auth_read_all" ON prendas
  FOR SELECT USING (auth.role() = 'authenticated');

-- =========================================
-- Storage bucket 'imagenes' (crear manualmente en Supabase UI)
-- Luego ejecutar en SQL Editor:
-- =========================================
-- Lectura pública
-- CREATE POLICY "public_read_images" ON storage.objects
--   FOR SELECT USING (bucket_id = 'imagenes');
-- Solo autenticados pueden subir
-- CREATE POLICY "auth_upload_images" ON storage.objects
--   FOR INSERT WITH CHECK (bucket_id = 'imagenes' AND auth.role() = 'authenticated');
-- Solo autenticados pueden eliminar
-- CREATE POLICY "auth_delete_images" ON storage.objects
--   FOR DELETE USING (bucket_id = 'imagenes' AND auth.role() = 'authenticated');
