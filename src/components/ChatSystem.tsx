import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Users, Wifi, WifiOff, Circle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  local?: boolean;
}

interface User {
  id: string;
  name: string;
  isOnline: boolean;
  lastSeen: Date;
}

const ChatSystem = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Simulate network connectivity and other users
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly simulate network issues for demo
      const shouldDisconnect = Math.random() < 0.05; // 5% chance every 3 seconds
      setIsConnected(!shouldDisconnect);
      
      // Simulate other users connecting/disconnecting
      if (isUsernameSet) {
        updateConnectedUsers();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isUsernameSet]);

  // Update connected users list
  const updateConnectedUsers = () => {
    const existingUsers = JSON.parse(localStorage.getItem('wasteland-users') || '[]');
    const currentUser = existingUsers.find((u: User) => u.id === currentUserId);
    
    if (currentUser) {
      currentUser.lastSeen = new Date();
      currentUser.isOnline = isConnected;
    }

    // Simulate other users
    const simulatedUsers = [
      { id: 'agent1', name: 'Agent Phoenix', isOnline: Math.random() > 0.3, lastSeen: new Date() },
      { id: 'agent2', name: 'Survivant Echo', isOnline: Math.random() > 0.4, lastSeen: new Date() },
      { id: 'agent3', name: 'Résistant Alpha', isOnline: Math.random() > 0.5, lastSeen: new Date() },
      { id: 'agent4', name: 'Scout Delta', isOnline: Math.random() > 0.6, lastSeen: new Date() },
    ];

    const allUsers = [...existingUsers.filter((u: User) => u.id !== currentUserId), ...simulatedUsers];
    if (currentUser) allUsers.unshift(currentUser);
    
    localStorage.setItem('wasteland-users', JSON.stringify(allUsers));
    setConnectedUsers(allUsers);
  };

  // Load messages and users from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('wasteland-messages');
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(parsed);
    }

    const savedUsername = localStorage.getItem('wasteland-username');
    const savedUserId = localStorage.getItem('wasteland-user-id');
    
    if (savedUsername && savedUserId) {
      setUsername(savedUsername);
      setCurrentUserId(savedUserId);
      setIsUsernameSet(true);
    }

    // Add welcome message if no messages exist
    if (!savedMessages) {
      const welcomeMessage: Message = {
        id: '1',
        text: "Bienvenue sur WasteLAN. Réseau de communication post-apocalyptique activé. D'autres survivants se connectent...",
        sender: "Système WasteLAN",
        timestamp: new Date(),
        local: true
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Simulate receiving messages from other users
  useEffect(() => {
    if (!isUsernameSet) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.15 && isConnected) { // 15% chance every 8 seconds when online
        const otherUsers = ['Agent Phoenix', 'Survivant Echo', 'Résistant Alpha', 'Scout Delta'];
        const sender = otherUsers[Math.floor(Math.random() * otherUsers.length)];
        
        const messagesToSend = [
          "Zone sécurisée confirmée, section 7-Alpha.",
          "Ressources disponibles, coordonnées partagées.",
          "Signal ennemi détecté, restez vigilants.",
          "Nouvelle fréquence radio établie.",
          "Point de rendez-vous modifié, stand by.",
          "Communication cryptée activée.",
          "Survivants repérés dans le secteur Est.",
          "Provisions partagées au point de ralliement.",
          "Réseau mesh local opérationnel.",
          "Protocole d'urgence en attente."
        ];
        
        const randomMessage = messagesToSend[Math.floor(Math.random() * messagesToSend.length)];
        
        const incomingMessage: Message = {
          id: (Date.now() + Math.random()).toString(),
          text: randomMessage,
          sender: sender,
          timestamp: new Date(),
          local: false
        };
        
        setMessages(prev => [...prev, incomingMessage]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isUsernameSet, isConnected]);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('wasteland-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSetUsername = () => {
    if (username.trim()) {
      const userId = 'user_' + Date.now();
      setCurrentUserId(userId);
      localStorage.setItem('wasteland-username', username);
      localStorage.setItem('wasteland-user-id', userId);
      setIsUsernameSet(true);
      
      // Add user to connected users
      const newUser: User = {
        id: userId,
        name: username,
        isOnline: true,
        lastSeen: new Date()
      };
      
      const existingUsers = JSON.parse(localStorage.getItem('wasteland-users') || '[]');
      existingUsers.unshift(newUser);
      localStorage.setItem('wasteland-users', JSON.stringify(existingUsers));
      
      toast({
        title: "Connexion établie",
        description: `Bienvenue ${username} sur le réseau WasteLAN`,
      });
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: username,
      timestamp: new Date(),
      local: !isConnected
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    if (!isConnected) {
      toast({
        title: "Message stocké localement",
        description: "Votre message sera synchronisé dès que la connexion sera rétablie",
      });
    } else {
      toast({
        title: "Message envoyé",
        description: "Votre message a été transmis sur le réseau",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isUsernameSet) {
        handleSetUsername();
      } else {
        handleSendMessage();
      }
    }
  };

  if (!isUsernameSet) {
    return (
      <section id="chat-section" className="py-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Rejoindre le Réseau</h3>
            <p className="text-muted-foreground mb-6">
              Choisissez votre nom de code pour accéder au système de communication sécurisé.
            </p>
            <div className="space-y-4">
              <Input
                placeholder="Nom de code..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-center"
              />
              <Button 
                onClick={handleSetUsername} 
                className="btn-wasteland w-full"
                disabled={!username.trim()}
              >
                Activer les Communications
              </Button>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="chat-section" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Users Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white rounded-2xl p-6 shadow-lg h-full">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">Agents Connectés</h3>
              </div>
              <div className="space-y-3">
                {connectedUsers.slice(0, 8).map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">
                          {user.name} {user.id === currentUserId && '(Vous)'}
                        </span>
                        <Circle 
                          className={`w-2 h-2 fill-current ${
                            user.isOnline ? 'text-green-500' : 'text-gray-400'
                          }`} 
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {user.isOnline ? 'En ligne' : 'Hors ligne'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="bg-white rounded-2xl p-6 shadow-lg">
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div>
                  <h3 className="text-2xl font-bold">Communications WasteLAN</h3>
                  <p className="text-muted-foreground">Agent: {username}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={isConnected ? "default" : "secondary"} className="gap-2">
                    {isConnected ? (
                      <><Wifi className="w-4 h-4" /> En ligne</>
                    ) : (
                      <><WifiOff className="w-4 h-4" /> Mode local</>
                    )}
                  </Badge>
                  <Badge variant="outline" className="gap-2">
                    <Users className="w-4 h-4" />
                    {connectedUsers.filter(u => u.isOnline).length} connectés
                  </Badge>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto mb-6 space-y-4 pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === username ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-start gap-3 max-w-xs lg:max-w-md">
                      {message.sender !== username && (
                        <Avatar className="w-8 h-8 mt-1">
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                            {message.sender.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`px-4 py-2 rounded-xl ${
                          message.sender === username
                            ? 'bg-primary text-primary-foreground'
                            : message.sender.includes('Système')
                            ? 'bg-blue-100 text-blue-900 border border-blue-200'
                            : message.local
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {message.sender !== username && (
                          <div className="text-xs font-medium mb-1">{message.sender}</div>
                        )}
                        <div className="text-sm">{message.text}</div>
                        <div className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                          {message.local && " (local)"}
                        </div>
                      </div>
                      {message.sender === username && (
                        <Avatar className="w-8 h-8 mt-1">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {username.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder={isConnected ? "Tapez votre message..." : "Message (mode local)..."}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="btn-wasteland"
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {!isConnected && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    ⚠️ Connexion réseau interrompue. Messages stockés localement et synchronisés automatiquement lors du retour de la connexion.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSystem;