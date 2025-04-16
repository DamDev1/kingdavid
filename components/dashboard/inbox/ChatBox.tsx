import {
  SendBirdProvider,
} from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import { RootState } from "@/store/store";

function Chatbox() {
  const APP_ID = process.env.SENDBIRD_API_ID;
  const ACCESS_TOKEN = process.env.SENDBIRD_ACCESS_TOKEN;

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [channelUrl, setChannelUrl] = useState("");
  const userId = userInfo?.user?.email?.split("@")[0] ?? "anonymous";

  return (
    <div className="w-full h-[80vh] md:h-[90vh] p-2">
      <SendBirdProvider
        appId={APP_ID ?? "B2F8EFB0-658E-4F60-A49A-EB8DDA726B9C"}
        userId={userId}
        nickname={userInfo?.user.firstName}
        profileUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRew5mgSv7MS7ddWG0M6cRRGyo4zUwXIrK7DA&s"
        allowProfileEdit={true}
        accessToken={ACCESS_TOKEN ?? "0c37477f299ef0592c9866e3bcbda99f0084379e"}
      >
        <div className="flex flex-col md:flex-row h-full border rounded-lg overflow-hidden shadow-md">
          <div className="w-full md:w-1/3 border-r h-[300px] md:h-auto overflow-y-auto">
            <GroupChannelList
              onChannelSelect={(channel) => {
                setChannelUrl(channel?.url ?? '');
              }}
              channelListQueryParams={{
                includeEmpty: true,
              }}
              isMessageReceiptStatusEnabled={true}
              onChannelCreated={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <div className="w-full md:w-2/3 h-[400px] md:h-auto overflow-y-auto">
            {channelUrl ? (
              <GroupChannel channelUrl={channelUrl} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a channel to start chatting
              </div>
            )}
          </div>
        </div>
      </SendBirdProvider>
    </div>
  );
}

export default Chatbox;
