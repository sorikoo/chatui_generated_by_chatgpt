import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        id: messages.length,
        text: inputText,
        sender: 'user'
      };
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      setInputText('');
    }
  };

  const renderMessage = ({ item }) => {
    const { sender, text } = item;
    const messageStyle = sender === 'user' ? styles.userMessage : styles.botMessage;
    return (
      <View style={[styles.messageContainer, messageStyle]}>
        <Text style={styles.messageText}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesContainer}
        inverted // Reverse the order of messages
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  messagesContainer: {
    padding: 10,
    flexGrow: 1, // Ensure messages take up available space
    justifyContent: 'flex-start' // Align messages to the top
  },
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    maxWidth: '80%'
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6'
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8E8E8'
  },
  messageText: {
    fontSize: 16
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10
  },
  sendButton: {
    backgroundColor: '#5A9EF6',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
};

export default ChatApp;