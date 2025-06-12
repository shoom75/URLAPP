import { addUrl, fetchUrls, deleteUrl } from "./utils/dbOperations.js";
import { getPreview } from "./utils/fetchPreview.js";
import { supabase } from "./utils/supabaseClient.js";

console.log("✅ main.js loaded");

document.addEventListener("DOMContentLoaded", async () => {
  // 🔹 認証ユーザー取得（仮に未ログインならテスト用ID）
  const session = supabase.auth.session; // 修正: v1では `getSession()` は不要

  const userId = session?.user?.id || "user_123";

  const urlForm = document.getElementById("urlForm");
  const urlList = document.getElementById("urlList");
  const thumbnailPreview = document.getElementById("thumbnail");

  async function loadUrls() {
    console.log("▶️ loadUrls called");
    urlList.innerHTML = "";
    const urls = await fetchUrls();

    const fragment = document.createDocumentFragment();
    urls.forEach(({ id, url, title, thumbnail_url }) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.gap = "12px";
      li.style.margin = "10px 0";

      // 画像
      const img = document.createElement("img");
      const proxiedUrl = thumbnail_url
        ? `http://localhost:3001/proxy?url=${encodeURIComponent(thumbnail_url)}`
        : "https://placehold.co/80x80";

      img.src = proxiedUrl;
      img.width = 80;
      img.height = 80;
      img.alt = "サムネイル";
      img.style.objectFit = "cover";
      img.onerror = () => { img.src = "https://placehold.co/80x80"; };

      // タイトルリンク
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.innerText = title;
      link.style.flex = "1";
      link.style.fontWeight = "bold";
      link.style.fontSize = "16px";
      link.style.color = "#E76F51";
      link.style.textDecoration = "none";

      // 削除ボタン
      const btnDelete = document.createElement("button");
      btnDelete.innerText = "削除";
      btnDelete.classList.add("btn-delete");

      btnDelete.onclick = async () => {
        if (!confirm(`「${title}」を削除しますか？`)) return;

        const { success, error } = await deleteUrl(id);
        if (success) {
          loadUrls();
        } else {
          alert("削除に失敗しました");
          console.error(error);
        }
      };

      // 並び順：画像 → タイトルリンク → 削除ボタン
      li.appendChild(img);
      li.appendChild(link);
      li.appendChild(btnDelete);
      fragment.appendChild(li);
    });

    urlList.appendChild(fragment);
  }

  urlForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const url = urlForm.urlInput.value.trim();
    const title = urlForm.titleInput.value.trim();
    const category = urlForm.categoryInput.value.trim();
    if (!url || !title || !category) return;

    const imageUrl = await getPreview(url);
    await addUrl(url, title, category, userId, imageUrl);

    // プレビュー
    const proxiedImageUrl = `http://localhost:3001/proxy?url=${encodeURIComponent(imageUrl)}`;
    thumbnailPreview.src = proxiedImageUrl;
    thumbnailPreview.onerror = () => { thumbnailPreview.src = "https://placehold.co/300x200"; };

    urlForm.reset();
    loadUrls();
  });

  loadUrls();
});