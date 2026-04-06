import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const term = input.toLowerCase();

    if (term.includes("report")) navigate("/reports");
    else if (term.includes("chat")) navigate("/chats");
    else if (term.includes("setting")) navigate("/settings");
    else navigate("/");
  };

  return (
    <div className="search-bar">
      <input
        placeholder="Search dashboard, reports, or messages..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}