const API_URL = "http://127.0.0.1:8000";

export async function analyzeExcuse(excuse, context) {
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      excuse,
      context,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.detail?.[0]?.msg ||
        "Unable to analyze the excuse."
    );
  }

  return response.json();
}