// hooks/useChat.ts
import { useState } from 'react';

interface Message {
  id: number | string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
}

interface ApiResponse {
  id: number;
  answer: string;
  model_used: string;
  timestamp: string;
}

interface HistoryItem {
  id: number;
  question: string;
  answer: string;
  model_used: string;
  timestamp: string;
}

interface SendMessageResult {
  success: boolean;
  data?: ApiResponse;
  error?: Error;
}

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string, model: string = 'gemini'): Promise<SendMessageResult> => {
    if (!message.trim()) return { success: false, error: new Error('Empty message') };
    
    // Add user message to chat with consistent structure
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/chat/query/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: message,
          model: model
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      // Format bot response based on the API response format
      const botMessage: Message = {
        id: data.id || Date.now() + 1, // Use server ID if available, otherwise generate one
        role: 'assistant',
        content: data.answer,
        model: data.model_used,
        timestamp: data.timestamp || new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      return { success: true, data };
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to get response from the server. Please try again.');
      return { success: false, error: error instanceof Error ? error : new Error('Unknown error') };
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = (): void => {
    setMessages([]);
    setError(null);
  };

  // Function to get chat history
  const getChatHistory = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await fetch('http://127.0.0.1:8000/chat/history/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data: HistoryItem[] = await response.json();
      
      // Convert history format to match our chat format
      const formattedHistory: Message[] = [];
      
      // Process history in pairs (question followed by answer)
      for (const item of data) {
        // Add user question
        formattedHistory.push({
          id: `user-${item.id}`,
          role: 'user',
          content: item.question,
          timestamp: item.timestamp
        });
        
        // Add bot response
        formattedHistory.push({
          id: item.id,
          role: 'assistant',
          content: item.answer,
          model: item.model_used,
          timestamp: item.timestamp
        });
      }
      
      setMessages(formattedHistory);
      return true;
    } catch (error) {
      console.error('Error fetching history:', error);
      setError('Failed to load chat history.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    getChatHistory
  };
};

export default useChat;