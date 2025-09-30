// Простая логика менеджера задач
const STORAGE_KEY = 'vibe:tasks'

const qs = s => document.querySelector(s)
const qsa = s => Array.from(document.querySelectorAll(s))

let tasks = []
let filter = 'all'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    tasks = raw ? JSON.parse(raw) : []
  } catch (e) {
    tasks = []
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function render() {
  const list = qs('#task-list')
  list.innerHTML = ''

  const visible = tasks.filter(t => {
    if (filter === 'all') return true
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
  })

  visible.forEach(task => {
    const li = document.createElement('li')
    li.className = 'task-item' + (task.completed ? ' completed' : '')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.completed
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked
      save()
      render()
    })

    const label = document.createElement('div')
    label.className = 'label'
    label.textContent = task.text

    const remove = document.createElement('button')
    remove.className = 'remove'
    remove.title = 'Удалить'
    remove.textContent = 'Удалить'
    remove.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id)
      save()
      render()
    })

    li.appendChild(checkbox)
    li.appendChild(label)
    li.appendChild(remove)
    list.appendChild(li)
  })

  qs('#task-count').textContent = tasks.length

  qsa('.filters button').forEach(b => b.classList.toggle('active', b.dataset.filter === filter))
}

function addTask(text) {
  const task = { id: Date.now().toString(36) + Math.random().toString(36).slice(2,6), text: text.trim(), completed: false }
  tasks.unshift(task)
  save()
  render()
}

// init
document.addEventListener('DOMContentLoaded', () => {
  load()
  render()

  qs('#task-form').addEventListener('submit', e => {
    e.preventDefault()
    const input = qs('#task-input')
    const text = input.value.trim()
    if (!text) return
    addTask(text)
    input.value = ''
    input.focus()
  })

  qsa('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      filter = btn.dataset.filter
      render()
    })
  })

  qs('#clear-completed').addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed)
    save()
    render()
  })
})
