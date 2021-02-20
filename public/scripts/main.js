import ChatMessage from "./components/TheMessageComponent.js"

(() => {
    console.log('fired');
    const socket = io();

    function setUserId({ socketID, message }) {
        vm.socket_ID = socketID;
    }
    function appendMessage(message) {
        console.log(vm);
        vm.messages.push(message);
        vm.$refs.music.play();

    }
    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            socket_ID: "",
            message: "",
            joinchat: false
        },
        create: function() {
            console.log("its alive!!");
        },

        methods: {
            joinChat() {
                this.joinchat = true;
            },
            dispatchMessage() {

                socket.emit('chatmessage', { content: this.message, name: this.nickname || "Anonymous" })
            }
        },
        components: {
            newmessage: ChatMessage
        }

    }).$mount("#app");
    socket.addEventListener("connected", setUserId);
    socket.addEventListener("message", appendMessage);

})();