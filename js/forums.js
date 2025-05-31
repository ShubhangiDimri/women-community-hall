const forumThreads = [
  { 
    id: 1,
    user: "Aarti", 
    message: "How do I register for the Yoga event?",
    likes: 5,
    dislikes: 1,
    liked: false,
    disliked: false,
    comments: [
      { user: "Community Helper", message: "You can register through the Events page or at the front desk." },
      { user: "Rahul", message: "I registered online last week, very easy process!" }
    ]
  },
  { 
    id: 2,
    user: "Sana", 
    message: "Looking for career workshop tips!",
    likes: 3,
    dislikes: 0,
    liked: false,
    disliked: false,
    comments: [
      { user: "Community Helper", message: "We have a career workshop next Tuesday at 3 PM. Bring your resume!" }
    ]
  },
];

function displayThreads() {
  const threadContainer = document.getElementById("forumThreads");
  threadContainer.innerHTML = "";
  forumThreads.forEach(thread => {
    const div = document.createElement("div");
    div.className = "forum-post";
    
    // Format comments
    let commentsHTML = '';
    if (thread.comments && thread.comments.length > 0) {
      commentsHTML = '<div class="forum-comments">';
      thread.comments.forEach(comment => {
        commentsHTML += `
          <div class="forum-comment">
            <strong>${comment.user}</strong>: ${comment.message}
          </div>
        `;
      });
      commentsHTML += '</div>';
    }
    
    div.innerHTML = `
      <h4>${thread.user}</h4>
      <p>${thread.message}</p>
      <div class="forum-post-actions">
        <button onclick="likeThread(${thread.id})">
          <i class="fas fa-thumbs-up ${thread.liked ? 'liked' : ''}"></i> ${thread.likes}
        </button>
        <button onclick="dislikeThread(${thread.id})">
          <i class="fas fa-thumbs-down ${thread.disliked ? 'disliked' : ''}"></i> ${thread.dislikes}
        </button>
        <button onclick="toggleCommentForm(${thread.id})">
          <i class="fas fa-comment"></i> Comment
        </button>
      </div>
      <div class="forum-comment-form" id="commentForm-${thread.id}" style="display: none;">
        <input type="text" id="commentInput-${thread.id}" placeholder="Add a comment...">
        <button onclick="postComment(${thread.id})">Post</button>
      </div>
      ${commentsHTML}
    `;
    threadContainer.appendChild(div);
  });
}

function postThread() {
  const newPost = document.getElementById("newPost");
  if (newPost.value.trim()) {
    const newThread = {
      id: forumThreads.length + 1,
      user: "You",
      message: newPost.value,
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false,
      comments: []
    };
    forumThreads.unshift(newThread);
    newPost.value = "";
    displayThreads();
  }
}

function likeThread(threadId) {
  const thread = forumThreads.find(t => t.id === threadId);
  if (thread) {
    if (thread.liked) {
      thread.likes--;
      thread.liked = false;
    } else {
      thread.likes++;
      thread.liked = true;
      if (thread.disliked) {
        thread.dislikes--;
        thread.disliked = false;
      }
    }
    displayThreads();
  }
}

function dislikeThread(threadId) {
  const thread = forumThreads.find(t => t.id === threadId);
  if (thread) {
    if (thread.disliked) {
      thread.dislikes--;
      thread.disliked = false;
    } else {
      thread.dislikes++;
      thread.disliked = true;
      if (thread.liked) {
        thread.likes--;
        thread.liked = false;
      }
    }
    displayThreads();
  }
}

function toggleCommentForm(threadId) {
  const form = document.getElementById(`commentForm-${threadId}`);
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function postComment(threadId) {
  const input = document.getElementById(`commentInput-${threadId}`);
  const comment = input.value.trim();
  if (comment) {
    const thread = forumThreads.find(t => t.id === threadId);
    if (thread) {
      thread.comments.push({
        user: "You",
        message: comment
      });
      input.value = "";
      displayThreads();
    }
  }
}

// Chatbot functionality
function toggleChatbot() {
  const panel = document.getElementById("chatbotPanel");
  panel.classList.toggle("active");
}

function sendChatbotMessage() {
  const input = document.getElementById("chatbotQuery");
  const message = input.value.trim();
  if (message) {
    addChatbotMessage(message, 'user');
    input.value = "";
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const response = generateChatbotResponse(message);
      addChatbotMessage(response, 'bot');
    }, 500);
  }
}

function addChatbotMessage(message, sender) {
  const messagesContainer = document.getElementById("chatbotMessages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `chatbot-message ${sender}`;
  messageDiv.innerHTML = `<p>${message}</p>`;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateChatbotResponse(query) {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('register') || lowerQuery.includes('sign up')) {
    return "You can register for events through our Events page or at the Community Hall front desk. Some events may require online registration.";
  } else if (lowerQuery.includes('event') || lowerQuery.includes('workshop')) {
    return "We host various events including yoga classes, career workshops, and community gatherings. Check the Events page for upcoming activities.";
  } else if (lowerQuery.includes('time') || lowerQuery.includes('hour')) {
    return "Community Hall is open Monday to Friday from 8 AM to 9 PM, and weekends from 9 AM to 6 PM.";
  } else if (lowerQuery.includes('contact') || lowerQuery.includes('reach')) {
    return "You can contact us at info@communityhall.org or call (555) 123-4567. Our staff is happy to help!";
  } else if (lowerQuery.includes('forum') || lowerQuery.includes('discussion')) {
    return "The forums are for community discussions. You can post questions, share ideas, or reply to existing threads. Be kind and respectful to others!";
  } else {
    return "I'm here to help with information about Community Hall. You can ask about events, registration, hours, or other services. How else can I assist you?";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayThreads();
  
  // Add event listener for Enter key in chatbot
  document.getElementById("chatbotQuery").addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
      sendChatbotMessage();
    }
  });
});