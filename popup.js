document.getElementById("planButton").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    
    // Send the input to the AI API to parse it into structured event data
    const eventData = await getEventData(userInput);
  
    // Send eventData to the background script to add it to Google Calendar
    chrome.runtime.sendMessage({ action: "createEvent", data: eventData });
  });
  
  async function getEventData(userInput) {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: `Plan my day based on this input: ${userInput}`,
        model: 'text-davinci-003',
        max_tokens: 100
      })
    });
    
    const data = await response.json();
    // Here, you may need to parse the response to get event data
    return {
      title: "Sample Event", // Replace with parsed title from AI response
      startDateTime: "2024-11-02T10:00:00-07:00", // Replace with parsed start time
      endDateTime: "2024-11-02T12:00:00-07:00" // Replace with parsed end time
    };
  }
  