chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message in background.js:", message); // <-- Added log
  if (message.action === "createEvent") {
      createCalendarEvent(message.data);
  }
});

async function createCalendarEvent(eventData) {
  console.log("Creating calendar event with data:", eventData); // <-- Added log
  chrome.identity.getAuthToken({ interactive: true }, async (token) => {
      if (chrome.runtime.lastError) {
          console.error("Error getting auth token:", chrome.runtime.lastError); // <-- Added log
          return;
      }

      const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              summary: eventData.title,
              start: { dateTime: eventData.startDateTime },
              end: { dateTime: eventData.endDateTime }
          })
      });

      const data = await response.json();
      console.log("Event created:", data); // <-- Added log
  });
}
