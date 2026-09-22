const CACHE_KEY = "scholarmatch_offline_cache";

export const cacheScholarMatchData = (scholarships, opportunities) => {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ scholarships, opportunities, cachedAt: new Date().toISOString() })
    );
  } catch (error) {
    console.error("Unable to cache ScholarMatch data:", error);
  }
};

export const getCachedScholarMatchData = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error("Unable to read offline cache:", error);
    return null;
  }
};
