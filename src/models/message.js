class Message {
    constructor({ author, content, channel }) {
      this.author = author;
      this.content = content;
      this.channel = channel;
    }
  
    reply(text) {
      return this.channel.send(text);
    }
  }
  
  module.exports = Message;
  