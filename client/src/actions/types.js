export const GET_ERRORS = "GET_ERRORS";
export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GET_USERS = "GET_USERS";
export const GET_CHATS = "GET_CHATS";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const PVT_CHAT = "PVT_CHAT"


/*Private Chats
chats:[{
   name:
   id:
   messages:[{
       name:
       message:
   }]
}]*/


/* 
    onSend(){
        const {id,name}=this.props.user
        const { receiverId, reiverName }=this.state.receiver
        const message=this.state.message
        let data={
                senderName:name,
                senderId:id,
                receiverName,
                receiverId,
                message,
        }
        this.props.privateChats(data);

    }
*/