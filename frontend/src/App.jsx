import { BrowserRouter, Routes, Route } from "react-router-dom";

import Body from "./pages/Body.jsx";
import Home from "./componets/Home.jsx";
import ChatPage from "./componets/ChatPage.jsx";
import ChatBody from "./pages/ChatBody.jsx";
import UserName from "./componets/UserName.jsx";
import CreateRoom from "./componets/CreateRoom.jsx";
import JoinRoom from "./componets/JoinRoom.jsx";

import appStore from "./utils/appStore.js";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Home />} />
            <Route path="/username" element={<UserName />} />
            <Route path="/create-room" element={<CreateRoom />} />
            <Route path="/join-room" element={<JoinRoom />} />
          </Route>
          <Route path="/chat/:id" element={<ChatBody />}>
            <Route index element={<ChatPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
