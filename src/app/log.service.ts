import {environment} from '../environments/environment'
import { Injectable } from '@angular/core';
@Injectable()
export class Logger{
    public log(message:string){
        if(!environment.production){
            console.log(message);
        }
    }
    public logAny(message){
        if(!environment.production){
            console.log(message);
        }
    }
}