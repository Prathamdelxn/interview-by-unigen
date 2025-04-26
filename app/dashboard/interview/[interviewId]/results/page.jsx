"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function InterviewResultsPage() {
  const { interviewId } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch(`/api/getinterviewresults/${interviewId}`);
        const data = await res.json();
        if (data.success) {
          setResults(data.data);
        } else {
          setError(data.message || "Failed to fetch results");
        }
      } catch (err) {
        setError("Failed to fetch results");
      } finally {
        setLoading(false);
      }
    }
    if (interviewId) fetchResults();
  }, [interviewId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!results) return <div>No results found.</div>;

  return (
    <div>
      <h1>Interview Results</h1>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
} 