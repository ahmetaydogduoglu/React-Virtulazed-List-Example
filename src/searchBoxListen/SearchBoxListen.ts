import { Subject } from 'rxjs';

interface ISearchBox {
    sendMessage(text: String): void;
    getMessage(): any;
    clearMessage(): void;
}

class SearchBox implements ISearchBox {
    private listenSubject: any
    constructor() {
        this.listenSubject = new Subject();
    }
    sendMessage(text: String): void {
        this.listenSubject.next({ text: text })
    }
    getMessage(): any {
        return this.listenSubject.asObservable();
    }
    clearMessage(): void {
        this.listenSubject.next();
    }
}

export default SearchBox