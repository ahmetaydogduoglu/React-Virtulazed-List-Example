import Node from "./Node";

export default class LinledList {
  private head;
  private lenght;

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

  public toString() {
    let current = this.head;
    while (current) {
      console.log(current.element);
      current = current.next;
    }
  }
}
