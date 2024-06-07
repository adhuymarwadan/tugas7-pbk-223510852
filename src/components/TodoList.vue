<template>
  <div class="todo-container">
    <h1>Job List</h1>
    <div class="input-container">
      <input type="text" v-model="newTask" placeholder="Add a new job" />
      <button @click="addTask">Add Job</button>
    </div>
    <ul class="task-list">
      <li v-for="(task, index) in tasks" :key="index" class="task-item">
        <input type="checkbox" v-model="task.completed" class="task-checkbox" />
        <span :class="{ completed: task.completed }">{{
          task.description
        }}</span>
        <button @click="removeTask(index)" class="remove-button">Remove</button>
      </li>
    </ul>
    <p class="remaining-tasks">Remaining Jobs: {{ remainingTasks }}</p>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useTodoStore } from "../stores/todo";

export default {
  setup() {
    const todoStore = useTodoStore();
    const newTask = ref("");

    const addTask = () => {
      if (newTask.value.trim() !== "") {
        todoStore.addTask({ description: newTask.value, completed: false });
        newTask.value = "";
      }
    };

    const removeTask = (index) => {
      todoStore.removeTask(index);
    };

    const remainingTasks = computed(() => todoStore.remainingTasks);

    return {
      tasks: todoStore.tasks,
      remainingTasks,
      newTask,
      addTask,
      removeTask,
    };
  },
};
</script>

<style scoped>
.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 200px auto 50px;
  padding: 20px;
  background-color: rgba(248, 249, 250, 0.8);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #343a40;
  text-align: center;
}

.input-container {
  display: flex;
  margin-bottom: 20px;
}

.input-container input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  outline: none;
}

.input-container button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.input-container button:hover {
  background-color: #0056b3;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
}

.task-checkbox {
  margin-right: 10px;
}

.completed {
  text-decoration: line-through;
  color: #6c757d;
}

.remove-button {
  padding: 8px 15px; /* Menyesuaikan ukuran tombol */
  font-size: 14px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #c82333;
}

.remaining-tasks {
  font-size: 16px;
  color: #6c757d;
  margin-top: 20px;
}
</style>
