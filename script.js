const input = document.getElementById('texto-tarefa');
const inputButton = document.getElementById('criar-tarefa');
const ol = document.getElementById('lista-tarefas');

window.onload = () => {
  const saved = localStorage.getItem('tarefas');
  if (saved) {
    ol.innerHTML = saved;
  }
};

function createTask() {
  const newTask = document.createElement('li');
  newTask.innerHTML = input.value;
  ol.appendChild(newTask);
  input.value = '';
}

inputButton.addEventListener('click', createTask);
ol.addEventListener('click', (event) => {
  const target1 = event.target;
  for (let i = 0; i < ol.children.length; i += 1) {
    if (target1 !== ol) {
      ol.children[i].classList.remove('selected');
      target1.classList.add('selected');
    }
  }
});

ol.addEventListener('dblclick', (event) => {
  const target1 = event.target;
  if (target1.classList.contains('completed')) {
    target1.className = '';
  } else {
    target1.classList.add('completed');
  }
});

const removeAllButton = document.getElementById('apaga-tudo');
removeAllButton.addEventListener('click', () => {
  const count = ol.children.length;
  for (let i = 0; i < count; i += 1) {
    ol.children[0].remove();
  }
  localStorage.clear();
});

const removeFinishedButton = document.getElementById('remover-finalizados');
removeFinishedButton.addEventListener('click', () => {
  const count = ol.children.length;
  for (let i = count - 1; i >= 0; i -= 1) {
    if (ol.children[i].classList.contains('completed')) {
      const oC = ol.children[i];
      oC.remove();
    }
  }
});

const saveButton = document.getElementById('salvar-tarefas');
saveButton.addEventListener('click', () => {
  console.log(typeof ol.innerHTML);
  localStorage.setItem('tarefas', ol.innerHTML);
});

const moveUpButton = document.getElementById('mover-cima');
const moveDownButton = document.getElementById('mover-baixo');

moveUpButton.addEventListener('click', () => {
  for (let i = 1; i < ol.children.length; i += 1) {
    if (ol.children[i].classList.contains('selected')) {
      ol.children[i].classList.remove('selected');
      const movingUp = ol.children[i].innerHTML;
      const movingDown = ol.children[i - 1].innerHTML;
      ol.children[i].innerHTML = movingDown;
      ol.children[i - 1].innerHTML = movingUp;
      ol.children[i - 1].classList.add('selected');
    }
  }
});

moveDownButton.addEventListener('click', () => {
  for (let i = 0; i < ol.children.length - 1; i += 1) {
    if (ol.children[i].classList.contains('selected')) {
      ol.children[i].classList.remove('selected');
      const movingUp = ol.children[i + 1].innerHTML;
      const movingDown = ol.children[i].innerHTML;
      ol.children[i + 1].innerHTML = movingDown;
      ol.children[i].innerHTML = movingUp;
      ol.children[i + 1].classList.add('selected');
      break;
    }
  }
});

const removeSelected = document.getElementById('remover-selecionado');
removeSelected.addEventListener('click', () => {
  const selectedElement = document.querySelector('.selected');
  selectedElement.remove();
});
