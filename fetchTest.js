// fetchTest.js
(async () => {
  try {
    console.log("Test fetch started");
    const address = "Eiffel Tower, Paris";
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await response.json();
    console.log("Fetched data:", data[0].lat, data[0].lon);
  } catch (err) {
    console.error("Fetch error:", err);
  }
})();
