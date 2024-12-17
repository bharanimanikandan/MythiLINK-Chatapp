import { useAppStore } from "@/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./contacts-container";
import EmptyChatContainer from "./empty-chat-container";
import ChatContainer from "./components/chat-container";

const Chat = () => {

  // Condition for the chat page 
  // User not allowed for chat untill profile setup is completed
  const { userInfo, selectedChatType,  isUploading, isDownloading, fileUploadProgress, fileDownloadProgress }=useAppStore();
  const navigate = useNavigate();

  // Use effect to manage
  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast("Please complete your profile to get started.");
      navigate("/profile");
    }
  },[userInfo, navigate]);
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      {
        isUploading && (
          <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
            <h5 className="text-5xl animate-pulse">Uploading file</h5>
            {fileUploadProgress}%
          </div>
        )}
      {
        isDownloading && (
          <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
            <h5 className="text-5xl animate-pulse">Downloading file</h5>
            {fileDownloadProgress}%
          </div>
        )}
      <ContactsContainer/>
      {
        selectedChatType === undefined ? <EmptyChatContainer/> : <ChatContainer/>
      }
    </div>
  )
}

export default Chat;