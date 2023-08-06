'use strict';
// documen.querySelectorAll -> selects all of the ele's (it behaves like an array) whereas querySelector selects the first occurence.
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal'); // Works as an array holding all elements
const openModal = function () {
  // need to do this way cuz can't apply event listener to whole array
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal); // !closeModal() not calling just declaring
// function () {
// modal.classList.add('hidden');
// overlay.classList.add('hidden'); violating dry principle
// });

// keyboard events are global events.
document.addEventListener('keydown', function (e) {
  // its for js to call the func with the event object (we don't call the func we just define it here ans asking js to call the func with the event object)
  // if (e.key === 'Escape') closeModal(); why run the func unnecessarily
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
