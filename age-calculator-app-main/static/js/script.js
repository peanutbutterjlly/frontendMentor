const form = document.getElementById('calendar');
// labels
const dayLabel =document.querySelector('.day')
const monthLabel =document.querySelector('.month')
const yearLabel =document.querySelector('.year')
// inputs
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
// error messages
const dayError = document.querySelector('.day span')
const monthError = document.querySelector('.month span')
const yearError = document.querySelector('.year span')
// answer elements
const years = document.querySelector('.years span');
const months = document.querySelector('.months span');
const days = document.querySelector('.days span');
// putting elements in an array to loop through em for mass removal
const errorClasses = [dayLabel, monthLabel, yearLabel, day, month, year];
const hiddenClasses = [dayError, monthError, yearError];

function removeErrors(hide=true) {
  if (hide){
    for (const element of errorClasses) {
      element.classList.remove('error');
    }
    for (const element of hiddenClasses) {
      element.classList.add('hidden')
    }
  } else {
    for (const element of errorClasses) {
      element.classList.add('error');
    }
    for (const element of hiddenClasses) {
      element.classList.remove('hidden');
    }
  }
}

function generateDate(event) {
  event.preventDefault();
  removeErrors();
  const date = new Date(year.value, month.value - 1, day.value);
  const today = new Date();
  const diff = today - date;
  const age = new Date(diff);
  if (isFutureDate(date) || isEmptyFields(day.value, month.value, year.value)) return false;
  populateAnswer(age);
}

function populateAnswer(age) {
  years.textContent = Math.abs(age.getUTCFullYear() - 1970);
  months.textContent = Math.abs(age.getUTCMonth());
  days.textContent = Math.abs(age.getUTCDate() - 1);
}

function isEmptyFields(dayVal, monthVal, yearVal) {
  const theyEmpty = !dayVal && !monthVal && !yearVal;
  if (theyEmpty) {
    removeErrors(false);
  }
  console.log(theyEmpty)
  return theyEmpty;
}

function isFutureDate(date) {
  const isFutureDate =  date > new Date();
  if (isFutureDate) {
    showYearError();
  }
  return isFutureDate;
}

function showDayError() {
  day.classList.add('error');
  dayLabel.classList.add('error');
  dayError.classList.remove('hidden');
}

function showMonthError() {
  month.classList.add('error');
  monthLabel.classList.add('error');
  monthError.classList.remove('hidden');
}

function showYearError() {
  year.classList.add('error');
  yearLabel.classList.add('error');
  yearError.classList.remove('hidden');
}

function checkIfInputsAreNumbers(element) {
  if (isNaN(element.value)) {
    element.classList.add('error');
  }
  return !isNaN(element.value);
}

// Event Listeners
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    form.reset();
  }
});

form.addEventListener('submit', generateDate);

form.addEventListener('reset', (e) => {
  years.textContent = '- -';
  months.textContent = '- -';
  days.textContent = '- -';
});
