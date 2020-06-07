export default class ToDoModel {
  id: string;
  title: string;
  requiredTime: number;
  editingText: boolean;
  editingTime: boolean;

  constructor() {
    this.id = "1";
    this.title = "Finish Test Model";
    this.requiredTime = 60;
    this.editingText = false;
    this.editingTime = false;
  }
}
