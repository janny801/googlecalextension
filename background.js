chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "createEvent") {
      createCalendarEvent(message.data);
    }
  });
  
  async function createCalendarEvent(eventData) {
    // Initiate OAuth flow with `chrome.identity` to get the access token
    chrome.identity.getAuthToken({ interactive: true }, async (token) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
  
      // Use the access token for the Google Calendar API request
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
      console.log("Event created:", data);
    });
  }
  