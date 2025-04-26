import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLayout from './ChatLayout';
import { chat_send_path } from '../../api/config';
import { axiosPrivate } from '../../api/axios';

const Messaging = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]); // Load this from your backend
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const token = localStorage.getItem('token'); // Or get from context

    const fetchMessages = async (userId) => {
        try {
            const response = await axiosPrivate.get(chat_send_path, {
                headers: { Authorization: `Bearer ${token}` },
                params: { user_id: userId }
            });
            setMessages(response.data);
        } catch (error) {
            navigate("/error", { replace: true });
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        fetchMessages(user.id);
    };

    const handleSend = async () => {
        if (!input.trim() || !selectedUser) return;
        try {
        const res = await axios.post('/api/chat/send/', {
            receiver_id: selectedUser.id,
            text: input,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setMessages([...messages, res.data]);
        setInput('');
        } catch (err) {
        console.error('Error sending message:', err);
        }
    };

    useEffect(() => {
        // Load users (you can also add roles here)
        const fetchUsers = async () => {
        const res = await axios.get('/api/users/', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
        };
        fetchUsers();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="mt-6">
                <ChatLayout
                    users={users}
                    selectedUser={selectedUser}
                    messages={messages}
                    input={input}
                    setInput={setInput}
                    onSend={handleSend}
                    onUserSelect={handleUserSelect}
                />
                </div>
        </div>
    );
};

export default Messaging;