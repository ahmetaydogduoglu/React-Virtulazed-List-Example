import Node from "./Node";

export default class LinledList {
  private head;
  private lenght;
  constructor() {
    this.head = null;
    this.lenght = 0;
  }
  public append(element) {
    const node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.lenght += 1;
  }

  public getNodes() {
    let current = this.head;
    let linkedItems: Array<Object> = [];
    while (current) {
      linkedItems.push(current);
      current = current.next;
    }
    return linkedItems;
  }

  public findNode(eventNumber: Number) {
    let current = this.head;
    let searchNode: Object = {};
    while (current) {
      if (current.eventType === eventNumber) {
        searchNode = current;
        break;
      }
      current = current.next;
    }
    return searchNode;
  }
}
