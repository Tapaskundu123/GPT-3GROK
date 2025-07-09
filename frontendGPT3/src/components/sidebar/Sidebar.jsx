// src/components/Sidebar.jsx
import React ,{useState}from 'react';
import GPT3Logo from '../../assets/logo.svg';
import {
  House,
  PanelRightClose,
  MessageSquare,
  Bookmark,
  Rocket
} from 'lucide-react';
import './sidebar.css';
import { useDispatch } from 'react-redux';
import { questionFromSidebar,GoToNewChat } from '../../Redux/features/HomeSlice.js';

const Sidebar = ({ sidebar, handleSidebar }) => {
 
  const dispatch= useDispatch();

  const displayQuestion=(data)=>{

    dispatch(questionFromSidebar(data))
  }

  const handleRefresh= ()=>{
    
    dispatch(GoToNewChat(true));
  }
   
  return sidebar ? (
    <div className="sidebar-container">
      <div className="upperside-sidebar">
        <div className="GPT-3img-logo">
          <img className="gpt-3logo" src={GPT3Logo} alt="Gpt3-logo" />
          <PanelRightClose className="closeBtn" onClick={handleSidebar} />
        </div>
        <div className="upperDiv-container">
          <div onClick={handleRefresh} className="gpt3-q-1 newChatBtn">+ New Chat</div>
          <div onClick={()=>displayQuestion('What is Programming?')} className="gpt3-q-1">
            <MessageSquare />
            <p>What is Programming?</p>
          </div>
          <div  onClick={()=>displayQuestion('How to use API?')} className="gpt3-q-1">
            <MessageSquare />
            <p>How to use API?</p>
          </div>
        </div>
      </div>
      <div className="lower-sidebar">
        <div onClick={handleRefresh} className="house-div">
          <House />
          <p>House</p>
        </div>
        <div className="house-div">
          <Bookmark />
          <p>Saved</p>
        </div>
        <div className="house-div">
          <Rocket />
          <p>Upgrade to pro</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="gpt3-closeSidebar">
      <PanelRightClose className="closeBtn" onClick={handleSidebar} />
    </div>
  );
};

export default Sidebar;
