document.getElementById("planButton").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;
  const eventData = await getEventData(userInput); // Use your function to parse the AI response into structured data.

  try {
      const token = await getGoogleAccessToken();
      await createGoogleCalendarEvent(eventData, token);
      console.log("Event created successfully!");
  } catch (error) {
      console.error("Error creating event:", error);
  }
});

async function getGoogleAccessToken() {
  return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
          if (chrome.runtime.lastError || !token) {
              reject(chrome.runtime.lastError);
              return;
          }
          resolve(token);
      });
  });
}

async function getEventData(userInput) {
  // Parse the input using your AI API or other logic here
  return {
      title: "Sample Event", // Replace this with the parsed title
      startDateTime: "2024-11-02T10:00:00-07:00", // Replace with parsed start time
      endDateTime: "2024-11-02T12:00:00-07:00"   // Replace with parsed end time
  };
}

async function createGoogleCalendarEvent(eventData, token) {
  const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          summary: eventData.title,
          start: {
              dateTime: eventData.startDateTime
          },
          end: {
              dateTime: eventData.endDateTime
          }
      })
  });

  if (!response.ok) {
      throw new Error(`Google Calendar API error: ${response.statusText}`);
  }
  return await response.json();
}
