import { App as SendbirdApp, SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import { useSelector } from "react-redux";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import { useState } from "react";

function Chatbox() {
  const APP_ID = process.env.SENDBIRD_API_ID;
  const ACCESS_TOKEN = process.env.SENDBIRD_ACCESS_TOKEN;

  const userInfo = useSelector((state: any) => state.auth.userInfo);
  const [channelUrl, setChannelUrl] = useState("");
  const userId = userInfo.user?.email?.split("@")[0] ?? "anonymous";

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <SendBirdProvider
        appId="B2F8EFB0-658E-4F60-A49A-EB8DDA726B9C"
        userId={userId}
        nickname={userInfo?.user.firstName}
        profileUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRew5mgSv7MS7ddWG0M6cRRGyo4zUwXIrK7DA&s"
        allowProfileEdit={true}
        accessToken="0c37477f299ef0592c9866e3bcbda99f0084379e"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          <div>
            <GroupChannelList
              onChannelSelect={(channel: any) => {
                setChannelUrl(channel?.url);
              }}
              channelListQueryParams={{
                includeEmpty: true,
              }}
              isMessageReceiptStatusEnabled={true}
              onChannelCreated={function (channel: any): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <div className="md:col-span-2">
            <GroupChannel channelUrl={channelUrl} />
          </div>
        </div>
      </SendBirdProvider>
    </div>
  );
}

export default Chatbox;
