import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Gallery = ({ businessId }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [businessId]);

  async function fetchImages() {
    // Eeldame, et pildid on Supabase Storage-s: bucket "business-images", kaustas businessId/
    const { data, error } = await supabase.storage
      .from("business-images")
      .list(`${businessId}/`, { limit: 20 });
    if (data) {
      setImages(data.map(file => ({
        url: supabase.storage.from("business-images").getPublicUrl(`${businessId}/${file.name}`).data.publicUrl,
        name: file.name
      })));
    }
  }

  if (!images.length) return <div>Galerii on tühi</div>;

  return (
    <div>
      <h3>Pildigalerii</h3>
      <div style={{display: "flex", gap: "1rem", flexWrap: "wrap"}}>
        {images.map(img => (
          <img key={img.name} src={img.url} alt={img.name} style={{width: 160, borderRadius: 8}} />
        ))}
      </div>
    </div>
  );
};

export default Gallery; 