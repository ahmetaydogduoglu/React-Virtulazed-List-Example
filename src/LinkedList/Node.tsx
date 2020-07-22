interface INode<T>{
    element:T
    next:INode<T>
}
export default class Node {
    private element;
    private next;

    constructor(element) {
        this.element = element;
        this.next = null;
    }
}