const proxyUrl = `https://your-vercel-app.vercel.app/api/proxy?url=${encodeURIComponent(imageUrl)}`;

fetch(proxyUrl)
  .then(response => response.blob())
  .then(blob => {
    const imageUrl = URL.createObjectURL(blob);
    document.getElementById("image").src = imageUrl;
  })
  .catch(error => console.error("画像の取得に失敗:", error));