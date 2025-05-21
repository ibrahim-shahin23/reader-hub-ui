import React from 'react';

interface Message {
  id: number | string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
}

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`d-flex mb-3 ${isUser ? 'justify-content-end' : 'justify-content-start'}`}>
      <div 
        className={isUser ? 'chat-bubble-user p-3' : 'chat-bubble-bot p-3'} 
        style={{ maxWidth: '75%' }}
      >
        <div>{message.content}</div>
        {message.model && !isUser && (
          <div className="mt-1 small" style={{ opacity: 0.7 }}>
            via {message.model}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;