import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // sinu failitee võib olla teine
import { useAuth } from "../AuthContext"; // kasutame oma auth hook'i

const ReviewSection = ({ businessId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line
  }, [businessId]);

  async function fetchReviews() {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false });
    setReviews(data || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from("reviews").insert([
      {
        business_id: businessId,
        user_id: user.id,
        comment,
        rating,
      },
    ]);
    if (!error) {
      setComment("");
      setRating(5);
      fetchReviews();
    }
  }

  return (
    <div>
      <h3>Arvustused</h3>
      {user && (
        <form onSubmit={handleSubmit}>
          <label>
            Hinne:
            <select value={rating} onChange={e => setRating(Number(e.target.value))}>
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <br/>
          <label>
            Kommentaar:
            <textarea value={comment} onChange={e => setComment(e.target.value)} required />
          </label>
          <br/>
          <button type="submit">Lisa arvustus</button>
        </form>
      )}
      {!user && <p>Logi sisse, et hinnata ja kommenteerida!</p>}
      <ul>
        {reviews.map(r => (
          <li key={r.id}>
            <b>{r.rating}⭐</b> — {r.comment} <span style={{color: "#999"}}>({r.created_at.slice(0,10)})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewSection; 