import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translator } from '../../models/EntityDto';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor() { }

  async call(query:string,target:string){
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '26d658afa9msh2390603ead6f874p1b48fdjsn369ee6b4749f',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      body: new URLSearchParams({
        target: target,
        q: query
      })
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  //alternative key : c19b5fc326msh13c0592f3f85e79p1d62abjsn4e14621bbb92
}
