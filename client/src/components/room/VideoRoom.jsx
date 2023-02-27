import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoRoom = () => {
    const { roomId } = useParams();

    const myMeeting = async (element) => {
        const appID = 2094775307;
        const serverSecret = "8050c53488af981535bf31f079fb86c2";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            "bharat"
        );

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showPreJoinView: false,
            preJoinViewConfig: {
                title: "", // The title of the prejoin view. Uses "enter Room" by default.
            },
            showScreenSharingButton: false,
            showTextChat: false, // Whether to display the text chat interface on the right side. Displayed by default.
            showUserList: false,
        });
    };
    return (
        <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: "100vw", height: "100vh" }}
        ></div>
    );
};
export default VideoRoom;
