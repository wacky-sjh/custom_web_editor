import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabaseStorageUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;

const supabase = createClient(supabaseUrl!, supabaseKey!);

export const uploadImage = async (file: File) => {
  const filePath = `images/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage.from("uploads").upload(filePath, file);

  if (error) {
    console.error("이미지 업로드 실패:", error);
    return null;
  }

  return `${supabaseStorageUrl}/${filePath}`;
};
