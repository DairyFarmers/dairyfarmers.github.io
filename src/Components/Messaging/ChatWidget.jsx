import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, InputGroup, Card } from 'react-bootstrap';
import { BsChatDotsFill } from 'react-icons/bs';
import './ChatWidget.scss'; // Import the SCSS

const ChatWidget = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/support/`);
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, { sender: 'them', text: data.message }]);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== '' && socket) {
      socket.send(JSON.stringify({ message: input }));
      setMessages(prev => [...prev, { sender: 'me', text: input }]);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setOpen(!open)}
        className="chat-floating-btn"
      >
        <BsChatDotsFill size={30} />
      </Button>

      {/* Chat Box */}
      {open && (
        <Card className="chat-box">
          <Card.Header className="chat-header d-flex justify-content-between align-items-center">
            <span>Chat Support</span>
            <Button
              variant="light"
              size="sm"
              className="close-btn"
              onClick={() => setOpen(false)}
            >
              ✖
            </Button>
          </Card.Header>
          <Card.Body className="chat-body">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.sender === 'me' ? 'chat-message-me' : 'chat-message-them'}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </Card.Body>
          <Card.Footer className="chat-footer">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Type message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button variant="primary" onClick={sendMessage}>Send</Button>
            </InputGroup>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;