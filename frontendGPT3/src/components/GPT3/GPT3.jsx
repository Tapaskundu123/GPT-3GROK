// src/components/GPT3.jsx
import { useRef, useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar.jsx';
import {
  SendHorizontal,
  TreePine,
  Lightbulb,
  MessageSquare,
  CodeXml,
  Ellipsis
} from 'lucide-react';

import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import './GPT3.css';
import { useDispatch, useSelector } from 'react-redux';
import { GoToNewChat } from '../../Redux/features/HomeSlice.js';

const GPT3 = () => {
  const [sidebar, setSidebar] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [suggestion, setSuggestion] = useState(true);
  const [loading, setLoading] = useState(false);

  const displayQuestion = useSelector((state) => state.Home.displayQuestion);
  const isHouseActive = useSelector((state) => state.Home.isHouseActive);
  const dispatch= useDispatch();

  const messagesToView = useRef(null);

  useEffect(() => {
    if (messagesToView.current) {
      messagesToView.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(()=>{

  if(displayQuestion){

    handleApiData(displayQuestion);
  }
 
  },[displayQuestion]);


  useEffect(()=>{

    if(isHouseActive){
     setMessages([]);
     setSuggestion(true);
     dispatch(GoToNewChat(false));
  }
  },[isHouseActive])

  const handleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  const handleSuggestion = async (data) => {
    setInput(data);
    setSuggestion(false);
    await handleApiData(data);
  };

  const handleApiData = async (data) => {

    setLoading(true);
    try {
      const res = await axios.post('https://gpt3-backend.onrender.com/api/GPT3', {
        message: data,
      });

      const response = res.data?.reply || 'No response received';

      setMessages((prev) => [...prev, { prompt: data, reply: response }]);
      setInput('');
      setSuggestion(false);
    } catch (err) {
      console.error('API Error:', err.message, err.response?.data);
      setMessages((prev) => [...prev, { prompt: data, reply: 'Something went wrong. Try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`GPT3-APP ${sidebar ? 'active-sidebar' : ''}`}>
      <Sidebar sidebar={sidebar} handleSidebar={handleSidebar} />
      <div className="Main-container">
        <div className="output-container">
          {suggestion ? (
            <div className="suggestion-container">
              <div className="suggestion-heading">
                <h1>Hello, Dev.</h1>
                <p>How can I help you today?</p>
              </div>

              <div className="box-container">
                <div onClick={() => handleSuggestion('Suggest beautiful places to see on an upcoming road trip')} className="box">
                  <p>Suggest beautiful places to see on an upcoming road trip</p>
                  <TreePine className="icon" />
                </div>

                <div onClick={() => handleSuggestion('Briefly summarize the concept: Urban Planing')} className="box">
                  <p>Briefly summarize the concept: Urban Planing</p>
                  <Lightbulb className="icon" />
                </div>

                <div onClick={() => handleSuggestion('How would you implement refresh tokens securely in a Node + JWT + MongoDB application')} className="box">
                  <p>How would you implement refresh tokens securely in a Node + JWT + MongoDB application?</p>
                  <MessageSquare className="icon" />
                </div>

                <div onClick={() => handleSuggestion('Tell me about React js and React native')} className="box">
                  <p>Tell me about React js and React native</p>
                  <CodeXml className="icon" />
                </div>
              </div>
            </div>
          ) : (
            <div className="chat-history">
              {messages.map((msg, index) => (
                <div key={index} className="chat-item">
                  <div className="input-msg-div">
                    <p>{msg.prompt}</p>
                  </div>
                  <div className="reply-msg-div">
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                      {msg.reply}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="loading">
                  <Ellipsis />
                </div>
              )}
            </div>
          )}

          <div ref={messagesToView} ></div>
        </div>

        <div className="input-chat-container">
          <textarea
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
          />
          <SendHorizontal
            color="black"
            className="sendBtn"
            onClick={() => handleApiData(input)}
          />
        </div>
      </div>
    </div>
  );
};

export default GPT3;
