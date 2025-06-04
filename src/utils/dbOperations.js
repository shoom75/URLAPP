import { supabase } from "./supabaseClient";

/**
 * URLと画像URLを Supabase に保存する
 * @param {string} url - 登録するURL
 * @param {string} title - 表示用タイトル
 * @param {string} category - カテゴリ情報
 * @param {string} userId - ユーザーID
 * @param {string} imageUrl - APIから取得した画像URL
 */
export async function addUrl(url, title, category, userId, imageUrl) {
   const { data, error } = await supabase
    .from("urls")
    .select("*")
    .order("created_at", { ascending: false });

if (error) {
    console.error("Supabase fetch error:", error);
} else {
    console.log("取得成功:", data);
}
}

/**
 * Supabase の "urls" テーブルからデータを取得する関数
 */
export async function fetchUrls() {
    const { data, error } = await supabase
        .from("urls")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Supabase fetch error:", error);
        return [];
    }
    return data;
}