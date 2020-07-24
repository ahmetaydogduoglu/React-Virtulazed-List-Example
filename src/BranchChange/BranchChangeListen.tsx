import { Subject } from "rxjs";

interface IBranchListen {
  setBranches(conent: {
    branches: Array<Object>;
    selectedBranches: Number;
  }): void;
  getBranchesContent(): any;
  clearBranches(): void;
}

class BranchChangeListen implements IBranchListen {
  private listenSubject: any;
  constructor() {
    this.listenSubject = new Subject();
  }
  setBranches(content): void {
    const { branches, selectedBranches } = content;
    this.listenSubject.next({ branches, selectedBranches });
  }
  getBranchesContent(): any {
    return this.listenSubject.asObservable();
  }
  clearBranches(): void {
    this.listenSubject.next();
  }
}

const listenBranchChange = new BranchChangeListen();

export default listenBranchChange;
