import { App as SendbirdApp, SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import { useSelector } from "react-redux";

function Chatbox() {
  const APP_ID = process.env.SENDBIRD_API_ID;
  const ACCESS_TOKEN = process.env.SENDBIRD_ACCESS_TOKEN;

  const userInfo = useSelector((state: any) => state.auth.userInfo);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <SendBirdProvider
        appId="B2F8EFB0-658E-4F60-A49A-EB8DDA726B9C"
        userId={userInfo?.id}
        nickname={userInfo?.firstName}
        profileUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRew5mgSv7MS7ddWG0M6cRRGyo4zUwXIrK7DA&s"
        allowProfileEdit={true}
        accessToken="0c37477f299ef0592c9866e3bcbda99f0084379e"
      ></SendBirdProvider>
    </div>
  );
}

export default Chatbox;
