export async function getPreview(url) {
    const API_KEY = "479caf1751a010ec074397313794465c";  // LinkPreview API など
    const apiUrl = `https://api.linkpreview.net/?key=${API_KEY}&q=${encodeURIComponent(url)}`;

    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);
        const data = await res.json();
        
        return data.image || "https://placehold.co/300x200";  // ✅ 取得できない場合のデフォルト画像
    } catch (error) {
        console.error("画像URL取得エラー:", error);
        return "https://placehold.co/300x200";  // ✅ エラー時の代替画像
    }
}