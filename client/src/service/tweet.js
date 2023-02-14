export default class TweetService {
  constructor(http, socket){
    this.http = http;
    this.socket = socket;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/posts${query}`, {
      method: 'GET',
    });
  }

  async postTweet(text) {
    return this.http.fetch(`/posts`, {
      method: 'POST',
      body: JSON.stringify({ text, username: 'hyemin' , name: 'Hyemin'}),
    });
  }

  async deleteTweet(postId) {
    return this.http.fetch(`/posts/${postId}`, {
      method: 'DELETE',
    });
  }

  async updateTweet(postId, text) {
    return this.http.fetch(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
    });
  }

  onSync(callback){
    return this.socket.onSync('posts', callback);
  }
}
