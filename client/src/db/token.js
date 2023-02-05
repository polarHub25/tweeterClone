const TOKEN = 'token';

export default class tokenStorage{
    saveToken(token){
        console.log('token class' , token);
        localStorage.setItem(TOKEN, token);
    }

    getToken(){
        console.log('token class2');
        return localStorage.getItem(TOKEN);
    }

    clearToken(){
        console.log('token class3');
        localStorage.clear(TOKEN);
    }
}