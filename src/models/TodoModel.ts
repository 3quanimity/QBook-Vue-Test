export default class ToDoModel {
  id: string;
  title: string;
  requiredTime: number;
  editingText: boolean;
  editingTime: boolean;

  constructor() {
    this.id = "";
    this.title = "";
    this.requiredTime = 0;
    this.editingText = false;
    this.editingTime = false;
  }
}
