// Простые тесты для логики менеджера задач.
// Запуск: подключите script.js и затем test.js в браузере, откройте DevTools -> Console.

function runTests() {
  // Очистим localStorage для детерминированности
  localStorage.removeItem('vibe:tasks')
  if (window.loadTasks) window.loadTasks()

  console.log('Тесты: старт')

  // 1) addTask добавляет задачу
  addTask('тестовая задача 1')
  let all = getTasks()
  console.assert(all.length === 1, 'addTask должен добавить одну задачу')
  console.assert(all[0].text === 'тестовая задача 1', 'Текст добавленной задачи должен совпадать')

  // 2) removeTask удаляет задачу
  const id = all[0].id
  const removed = removeTask(id)
  all = getTasks()
  console.assert(removed === true, 'removeTask должен вернуть true при успешном удалении')
  console.assert(all.length === 0, 'После удаления массив задач должен быть пустым')

  // 3) toggleCompleted меняет статус
  addTask('тестовая задача 2')
  all = getTasks()
  const id2 = all[0].id
  const toggled1 = toggleCompleted(id2)
  all = getTasks()
  console.assert(toggled1 === true, 'toggleCompleted должен вернуть true при успехе')
  console.assert(all[0].completed === true, 'Статус задачи должен переключиться на true')
  const toggled2 = toggleCompleted(id2)
  all = getTasks()
  console.assert(all[0].completed === false, 'Статус задачи должен переключиться обратно на false')

  console.log('Тесты: завершены (если нет ошибок в консоли, все прошло успешно)')
}

// Автоматический запуск при подключении (можно закомментировать при необходимости)
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => setTimeout(runTests, 50))
}
