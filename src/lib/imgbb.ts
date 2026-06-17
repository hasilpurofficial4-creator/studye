export async function uploadToImgBB(file: Blob): Promise<{ url: string; deleteUrl: string }> {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) throw new Error("IMGBB_API_KEY not configured");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`IMGBB upload failed: ${error}`);
  }

  const data = await response.json();
  return {
    url: data.data.url,
    deleteUrl: data.data.delete_url,
  };
}
