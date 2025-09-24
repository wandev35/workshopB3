import ChattApp from "@/components/ChattApp";
import Header from "@/components/Header";



const ChatPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ChattApp /> 
      </main>
    </div>
  );
};

export default ChatPage;