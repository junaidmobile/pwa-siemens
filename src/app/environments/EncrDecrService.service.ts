import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class EncrDecrService {
 
  private Keys: any;
  public keyValuesUpdate: any;
  constructor() { }

  // keys: any = "OMS1@2020#^@El@K";
  keys: any = "ECC1@9635#^@El@K";

  set(value) {
    let _key = CryptoJS.enc.Utf8.parse(this.keys);
    let _iv = CryptoJS.enc.Utf8.parse(this.keys);
    if (value != null && value != "") {
      let encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(value), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    }
    else {
      return "";
    }
  }

  setForPE(value) {
    let _key = CryptoJS.enc.Utf8.parse("pE@K@^Le@#2087&#");
    let _iv = CryptoJS.enc.Utf8.parse("pE@K@^Le@#2087&#");
    if (value != null && value != "") {
      let encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(value), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    }
    else {
      return "";
    }
  }


  get(value) {
    let _key = CryptoJS.enc.Utf8.parse(this.keys);
    let _iv = CryptoJS.enc.Utf8.parse(this.keys);
    if (value != null && value != "") {
      var decrypted = CryptoJS.AES.decrypt(
        value, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
      return decrypted.replace(/"/g, '');
    }
    else {
      return "";
    }
  }

  // EncryptUsingRandomKey(value, userkey) {
  //   let key1 = this.keys.substr(0, this.keys.length - 2) + userkey;

  //   let _key = CryptoJS.enc.Utf8.parse(key1);
  //   let _iv = CryptoJS.enc.Utf8.parse(key1);
  //   if (value != null && value != "") {
  //     let encrypted = CryptoJS.AES.encrypt(
  //       JSON.stringify(value), _key, {
  //       keySize: 16,
  //       iv: _iv,
  //       mode: CryptoJS.mode.ECB,
  //       padding: CryptoJS.pad.Pkcs7
  //     });
  //     return encrypted.toString();
  //   }
  //   else {
  //     return "";
  //   }
  // }

  EncryptUsingRandomKey(value, userkey, EncKeysValueAssign) {

        this.Keys = atob(EncKeysValueAssign);
        //const key = new CommonServices();
        //this.Keys =  key.Variable;
       // this.Keys = this.commonService.Variable;
       // this.Keys = atob(this._userProfile.userprofile.Keys);
    
     
    
        let key1 = this.Keys.substr(0, this.Keys.length - 2) + userkey;
        let _key = CryptoJS.enc.Utf8.parse(key1);
        let _iv = CryptoJS.enc.Utf8.parse(key1);
        if (value != null && value != "") {
          let encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(value), _key, {
            keySize: 16,
            iv: _iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          });
          return encrypted.toString();
        }
        else {
          return "";
        }
      }

  DecryptUsingRandomKey(value, key1) {
    let _key = CryptoJS.enc.Utf8.parse(key1);
    let _iv = CryptoJS.enc.Utf8.parse(key1);
    if (value != null && value != "") {
      var decrypted = CryptoJS.AES.decrypt(
        value, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
      return decrypted.replace(/"/g, '');
    }
    else {
      return "";
    }
  }


  encryptData(EncKeysValueAssign:any,data: any): string {
        //this.Keys = atob(this._userProfile.userprofile.Keys);
    
        this.keyValuesUpdate = EncKeysValueAssign;
        this.keys = atob(EncKeysValueAssign);
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), this.keys).toString();
        return ciphertext;
      }

}
