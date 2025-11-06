-- Set the first user (oldest by created_at) as admin
UPDATE profiles SET is_admin = true WHERE id = (
  SELECT id FROM profiles ORDER BY created_at ASC LIMIT 1
);
