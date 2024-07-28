document.querySelector('.send-button').addEventListener('click', async () => {
    const chatWindow = document.querySelector('.chat-window');
    const input = document.querySelector('.input-area input');
    const message = input.value;

    if (message) {
        // Append the user's message to the chat window
        const messageElement = document.createElement('div');
        messageElement.textContent = `You: ${message}`;
        chatWindow.appendChild(messageElement);

        // Send the message to the backend for processing
        try {
            const response = await fetch('http://localhost:3000/results');
            console.log('Fetch response:', response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const results = await response.json();
            console.log('Fetch results:', results);

            // Append the results to the chat window
            const resultsElement = document.createElement('div');
            resultsElement.textContent = `Results: ${JSON.stringify(results, null, 2)}`;
            chatWindow.appendChild(resultsElement);
        } catch (error) {
            console.error('Error:', error);
            const errorElement = document.createElement('div');
            errorElement.textContent = `Error: ${error.message}`;
            chatWindow.appendChild(errorElement);
        }

        input.value = '';
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});

document.querySelector('.clear-history').addEventListener('click', () => {
    const historyList = document.querySelector('.history ul');
    historyList.innerHTML = '';
});

// Voice recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.interimResults = false;
recognition.lang = 'en-US';

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const input = document.querySelector('.input-area input');
    input.value = transcript;
};

document.querySelector('.voice-button').addEventListener('click', () => {
    recognition.start();
});
