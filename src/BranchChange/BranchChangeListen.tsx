import { Observable } from "rxjs";

interface IListenBranchChange {
  _selectedBranches: Number;
  _branches: Array<Object>;
  changeBranches(branch): void;
}

class ListenBranchChange implements IListenBranchChange {
  private _branches;
  private _selectedBranches;

  constructor() {
    this._branches = [];
    this._selectedBranches = 0;
  }

  public changeBranches = (branch: Number): void => {
    this._selectedBranches(branch);
  };

  public get branches(): string {
    return this._branches;
  }

  public set branches(value: string) {
    this._branches = value;
  }

  public get selectedBranches(): string {
    return this._selectedBranches;
  }
}

const listenBranchChange = new ListenBranchChange();
