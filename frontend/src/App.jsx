import io from "socket.io-client";
import { useState } from "react";
import "./App.css";
import Chat from "./Chat";
import { Container, Card, Icon, Form, Button } from "semantic-ui-react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("username");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <Container>
      {!showChat ? (
        <Card fluid>
          <Card.Content header={`Enter MDD-Chat in Room: ${room}`} />
          <Card.Content>
            <Form>
              <Form.Field>
                <label>Nickname</label>
                <input
                  type="text"
                  placeholder="Nickname..."
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Sala</label>
                <input
                  type="text"
                  placeholder="Room..."
                  onChange={(e) => setRoom(e.target.value)}
                />
              </Form.Field>
              <Form.Field></Form.Field>
              <Button type="submit" onClick={joinRoom}>
                Join
              </Button>
            </Form>
          </Card.Content>
          <Card.Content extra>
            <Icon name="user" />
            <Icon name="user" />
            <Icon name="user" />
            <Icon name="user" />
            <Icon name="user" />
          </Card.Content>
        </Card>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </Container>
  );
}

export default App;
