import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    messageId = uuidv4();
    constructor() {}

    getTransactionId() {
        return this.messageId;
    }

    getNewTransactionId() {
        this.messageId = uuidv4();
        return this.messageId;
    }

    getUuid() {
        return uuidv4();
    }

    getTimestamp() {
        return new Date().toISOString();
    }
}
