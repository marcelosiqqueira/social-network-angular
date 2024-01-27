export abstract class Server {

  constructor(){
  }

  static checkUrl(){
    if(window.location.hostname.includes('localhost')){
      return'http://localhost:3000';
    }
    return ''
  }

}
