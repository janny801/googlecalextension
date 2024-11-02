document.getElementById("planButton").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;
  const eventData = await getEventData(userInput); // Parse user input into structured event data

  // Send message to background.js to create the event
  chrome.runtime.sendMessage({
    action: "createEvent",
    data: eventData
  }, (response) => {
    if (response && response.success) {
      console.log("Event created successfully!");
    } else {
      console.error("Error creating event:", response.error);
    }
  });
});

// This function just formats the event data
async function getEventData(userInput) {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  return {
      title: userInput || "Sample Event", // Use input as title or default if blank
      startDateTime: `${today}T19:00:00-07:00`, // 7 PM today in local timezone
      endDateTime: `${today}T21:00:00-07:00`   // 9 PM today in local timezone
  };
}
