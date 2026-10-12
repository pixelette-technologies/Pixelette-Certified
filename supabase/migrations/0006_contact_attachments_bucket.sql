-- Private Storage bucket for optional enquiry attachments.
--
-- Kept in its own migration deliberately. This writes to the `storage` schema,
-- which needs different privileges from a table alter, and isolating it means a
-- storage permission problem cannot block the column migration in 0005.
--
-- public = false is not a default worth relying on. These are customer tender
-- documents, security questionnaires and procurement correspondence, sent to us
-- by someone who has not yet signed anything. A public bucket would make every
-- one of them world-readable to anyone who guessed a URL.
--
-- No storage.objects policies are created. Supabase enables RLS on that table
-- by default, so zero policies means only the service-role key can read or
-- write - exactly the posture used by contact_submissions and every other table
-- in this project. The browser never talks to Storage at all in this design.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'contact-attachments',
  'contact-attachments',
  false,
  4194304,  -- 4 MiB, deliberately under Vercel's ~4.5 MB request body ceiling
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
    'text/plain',
    'image/png',
    'image/jpeg'
  ]
)
on conflict (id) do nothing;

-- The bucket's own size and MIME limits are defence in depth, not the primary
-- control. The route enforces both before it uploads, and it sends its OWN
-- sniffed content type rather than the browser-supplied one, so the list above
-- can never be satisfied by simply renaming a file.
