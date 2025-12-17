import { useEffect, useState } from "react";
import axios from "axios";

const categories = [
  "nature","animals","travel","technology","people","city","food","business",
  "sports","beach","mountains","ocean","forest","sky","architecture","cars",
  "night","sunset","water","music","workout","aerial","drone","fashion","art",
  "education","science","multimedia","space","abstract","time lapse","slow motion","medical","cinematic"
];

export default function Video() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("nature");
  const [suggestions, setSuggestions] = useState([]);
  const [focusedVideo, setFocusedVideo] = useState(null);
  const perPage = 20;

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function loadVideos() {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get("/api/videos", {
          params: { query: search, per_page: perPage, page },
          timeout: 40000,
          signal: controller.signal
        });

        if (cancelled) return;

        const videosData = res.data.videos || [];
        setVideos(videosData);
        console.log("Videos fetched:", videosData.length);

        if (videosData.length === 0) {
          setError("No videos found. Try a different search term.");
        }
      } catch (err) {
        // ignore abort errors triggered by cleanup
        if (err?.code === 'ERR_CANCELED') return;
        if (cancelled) return;

        console.error("Video fetch error:", err.code, err.message);
        setVideos([]);

        if (err.code === 'ETIMEDOUT' || err.code === 'ECONNABORTED') {
          setError('Request timed out. The server may be slow. Please try again.');
        } else if (err.response?.status === 500) {
          setError('Server error. Please try again later.');
        } else if (err.response?.status === 504) {
          // Upstream (Pexels) timed out
          setError(err.response?.data?.error || 'Upstream API timed out. Please try again later.');
        } else if (err.response?.status) {
          // show upstream error message if present
          setError(err.response?.data?.error || 'Failed to load videos from upstream API.');
        } else if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
          setError('Cannot connect to server. Make sure the server is running on port 5000.');
        } else {
          setError('Failed to load videos. Please try again.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadVideos();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [search, page, perPage]);

  useEffect(() => {
    if (input.length > 0) {
      const filtered = categories.filter(cat =>
        cat.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const handleSearch = (value) => {
    setPage(1);
    setSearch(value);
    setSuggestions([]);
    setInput(value);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      {/* Search Bar */}
      <div style={{ position: "relative", marginBottom: 20 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search videos..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch(input)}
          style={{ padding: 10, width: "100%", borderRadius: 5, border: "1px solid #ccc" }}
        />
        {suggestions.length > 0 && (
          <ul style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "#fff", border: "1px solid #ccc", borderTop: "none",
            maxHeight: 150, overflowY: "auto", listStyle: "none", margin: 0, padding: 0, zIndex: 100
          }}>
            {suggestions.map((s, i) => (
              <li
                key={i}
                style={{ padding: 10, cursor: "pointer" ,color:'black'}}
                onClick={() => handleSearch(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginBottom: 20, color: "#555" }}>
        Page: {page} | Results: {videos.length}
      </div>

      {error && (
        <div style={{
          padding: 15,
          marginBottom: 20,
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: 5,
          color: "#856404"
        }}>
          {error}
        </div>
      )}

      {loading && <div style={{ textAlign: "center", padding: 50, color: "#777" }}>Loading videos...</div>}

      {!loading && !error && videos.length === 0 && (
        <div style={{ textAlign: "center", padding: 50, color: "#777" }}>
          No videos found. Try searching for something else.
        </div>
      )}

      {/* Video Grid */}
      {!loading && videos.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20
        }}>
          {videos.map(video => {
            if (!video.video_files || video.video_files.length === 0) {
              return null;
            }
            const videoFile = video.video_files.find(vf => vf.quality === 'hd') || 
                            video.video_files.find(vf => vf.quality === 'sd') || 
                            video.video_files[0];
            const src = videoFile?.link;
            
            if (!src) return null;

            return (
              <div
                key={video.id}
                style={{
                  borderRadius: 15,
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  background: "#000",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer"
                }}
                onClick={() => setFocusedVideo(src)}
              >
                <video 
                  src={src} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  style={{ width: "100%", height: 300, objectFit: "cover" }}
                  onError={(e) => {
                    console.error("Video load error:", src);
                    e.target.style.display = 'none';
                  }}
                />
                <div style={{ padding: 10 }}>
                  <h3 style={{ margin: 0, fontSize: "1rem", color: "#fff" }}>
                    {video.user?.name || "Unknown"}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#aaa" }}>
                    Duration: {video.duration || 'N/A'}s | {video.width || 'N/A'}×{video.height || 'N/A'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 30 }}>
        <button onClick={() => page > 1 && setPage(p => p - 1)}
          disabled={page === 1} style={{ padding: 10, borderRadius: 5, cursor: page === 1 ? "not-allowed" : "pointer" }}>Prev</button>
        <button onClick={() => setPage(p => p + 1)}
          style={{ padding: 10, borderRadius: 5, cursor: "pointer" }}>Next</button>
      </div>

      {/* Lightbox overlay */}
      {focusedVideo && (
        <div
          onClick={() => setFocusedVideo(null)}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.8)", display: "flex",
            justifyContent: "center", alignItems: "center", zIndex: 200
          }}
        >
          <video
            src={focusedVideo}
            controls
            autoPlay
            style={{
              width: "80%",
              height: "80%",
              borderRadius: 15,
              objectFit: "contain",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)"
            }}
          />
        </div>
      )}
    </div>
  );
}
