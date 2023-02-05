export default class TweetService {
  
  constructor(http, tokenStorage){
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async getTweets(username) {
    console.log('getTweet username ', username);
    const query = username ? `?username=${username}` : '';
    console.log('getTweet ', query);
    return this.http.fetch(`/posts${query}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  async postTweet(text) {
    return this.http.fetch(`/posts`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ text, username: 'hyemin' , name: 'Hyemin'}),
    });
  }

  async deleteTweet(postId) {
    return this.http.fetch(`/posts/${postId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
  }

  async updateTweet(postId, text) {
    return this.http.fetch(`/posts/${postId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
