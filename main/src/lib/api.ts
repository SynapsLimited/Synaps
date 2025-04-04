// src/lib/api.ts
export async function getAuthors() {
    try {
      // Use the correct endpoint for authors
      const res = await fetch("https://www.synapslimited.eu/api/users/authors", { cache: "no-store" });
      if (!res.ok) {
        console.error("Failed to fetch authors with status:", res.status);
        // Return an empty array instead of throwing an error
        return [];
      }
      return res.json();
    } catch (error) {
      console.error("Error fetching authors:", error);
      // Return an empty array on error to avoid build crashes
      return [];
    }
  }
  