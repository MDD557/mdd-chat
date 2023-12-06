import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Form,
  Input,
  Message,
  Divider,
} from "semantic-ui-react";
import ScrollToBotton from "react-scroll-to-bottom";

// eslint-disable-next-line react/prop-types
const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messagesList, setmessagesList] = useState([]);

  const sendMessage = async () => {
    if (username && currentMessage) {
      const info = {
        message: currentMessage,
        room,
        author: username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      // eslint-disable-next-line react/prop-types
      await socket.emit("send_message", info);
      setmessagesList((list) => [...list, info]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const messageHandle = (data) => setmessagesList((list) => [...list, data]);
    // eslint-disable-next-line react/prop-types
    socket.on("receive_message", messageHandle);
    // eslint-disable-next-line react/prop-types
    return () => socket.off("receive_message", messageHandle);
  }, [socket]);

  return (
    <Container style={{ marginTop: "15px" }}>
      <Card fluid>
        <Card.Content
          header={`MDD-Chat | Room: ${room} | Username: ${username}`}
        />
        <ScrollToBotton>
          <Card.Content style={{ height: "400px", paddingRight: "5px" }}>
            {messagesList.map((item, i) => {
              return (
                <span key={i}>
                  <Message
                    style={{
                      textAlign: username === item.author ? "right" : "left",
                      maxHeight: "300px",
                    }}
                    success={username === item.author}
                    info={username !== item.author}
                  >
                    <Message.Header>{item.message}</Message.Header>
                    <p>
                      <strong>{item.author}</strong> : <i>{item.time}</i>
                    </p>
                  </Message>
                  <Divider />
                </span>
              );
            })}
          </Card.Content>
        </ScrollToBotton>
        <Card.Content extra>
          <Form>
            <Form.Field>
              <Input
                value={currentMessage}
                action={{
                  color: "teal",
                  labelPosition: "right",
                  icon: "send",
                  content: "Send",
                  onClick: sendMessage,
                }}
                type="text"
                className="input"
                placeholder="message..."
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default Chat;
