import { addUrl, fetchUrls } from "./utils/dbOperations.js";
import { getPreview } from "./utils/fetchPreview.js";
// mov
document.addEventListener("DOMContentLoaded", async () => {
    const urlForm = document.getElementById("urlForm");
    const urlList = document.getElementById("urlList");
    const thumbnailPreview = document.getElementById("thumbnail");

    async function loadUrls() {
        urlList.innerHTML = "";
        const urls = await fetchUrls();

        const fragment = document.createDocumentFragment();
        urls.forEach(({ url, title, thumbnail_url }) => {
            const li = document.createElement("li");

            const img = document.createElement("img");
            img.src = thumbnail_url || "https://placehold.co/100x100";  // ✅ 画像URLをセット
            img.width = 100;
            img.alt = "サムネイル";

            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.innerText = title;

            li.appendChild(img);
            li.appendChild(link);
            fragment.appendChild(li);
        });

        urlList.appendChild(fragment);
    }

    urlForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const url = document.getElementById("urlInput").value.trim();
        const title = document.getElementById("titleInput").value.trim();
        const category = document.getElementById("categoryInput").value.trim();

        if (!url || !title || !category) {
            console.error("入力が不足しています");
            return;
        }

        // ✅ API から画像URLを取得
        const imageUrl = await getPreview(url);

        // ✅ Supabase に URL + 画像URL を保存
        const userId = "user_123";
        await addUrl(url, title, category, userId, imageUrl);

        thumbnailPreview.src = imageUrl;  // ✅ 画像プレビューを即時更新
        loadUrls();  // ✅ ページリストを更新
    });

    loadUrls();
});