import { defineStore } from "pinia";

export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(newTask) {
      this.tasks.push(newTask);
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
  },
  getters: {
    remainingTasks() {
      return this.tasks.filter((task) => !task.completed).length;
    },
  },
});
