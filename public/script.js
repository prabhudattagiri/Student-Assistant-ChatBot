document.addEventListener("DOMContentLoaded", function () {
    // Get references to DOM elements
    const sendBtn = document.getElementById("sendBtn");
    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const navigateBtn = document.getElementById("navigateChat");
    const clearBtn = document.getElementById("clearChat");
    const backBtn = document.getElementById("backBtn");

    // Function to append a message to the chat box
    function appendMessage(message, sender) {
        if (!chatBox) return;
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", sender);
        const textSpan = document.createElement("span");
        textSpan.classList.add("text");
        textSpan.textContent = message;
        msgDiv.appendChild(textSpan);
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Function to send a message to the backend serverless function
    function sendMessage() {
        if (!userInput) return;
        const userText = userInput.value.trim();
        if (userText === "") return;

        // Append the user's message to the chat box
        appendMessage(userText, "student");

        // Send the message to the backend API (deployed as a serverless function)
        fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ message: userText })
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.bot_response) {
                    appendMessage(data.bot_response, "teacher");
                } else {
                    appendMessage("No response from server.", "teacher");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                appendMessage("Error connecting to server.", "teacher");
            });

        // Clear the input field
        userInput.value = "";
    }

    // Add event listeners
    if (sendBtn) {
        sendBtn.addEventListener("click", sendMessage);
    }
    if (userInput) {
        userInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }
    if (navigateBtn) {
        navigateBtn.addEventListener("click", function () {
            document.body.style.opacity = "0";
            setTimeout(() => {
                window.location.href = "chat.html";
            }, 500);
        });
    }
    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            if (chatBox) {
                chatBox.innerHTML = "";
            }
        });
    }
    if (backBtn) {
        backBtn.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }
});
