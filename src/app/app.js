const loginPanel = document.getElementById('login-panel');
const dashboardPanel = document.getElementById('dashboard-panel');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const testCaseForm = document.getElementById('test-case-form');
const caseError = document.getElementById('case-error');
const caseSuccess = document.getElementById('case-success');
const caseList = document.getElementById('test-case-list');

const credentials = {
  email: 'admin@example.com',
  password: 'Password123'
};

function showPanel(panel) {
  loginPanel.classList.toggle('hidden', panel !== 'login');
  dashboardPanel.classList.toggle('hidden', panel !== 'dashboard');
}

function renderCases(cases) {
  caseList.innerHTML = '';
  if (cases.length === 0) {
    const emptyState = document.createElement('p');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No test cases created yet.';
    caseList.appendChild(emptyState);
    return;
  }

  cases.forEach((testCase) => {
    const article = document.createElement('article');
    article.innerHTML = `
      <h3>${testCase.title}</h3>
      <p>${testCase.description}</p>
      <p><strong>Priority:</strong> ${testCase.priority}</p>
    `;
    caseList.appendChild(article);
  });
}

function getSavedCases() {
  const raw = localStorage.getItem('sandbox-test-cases');
  return raw ? JSON.parse(raw) : [];
}

function saveCases(cases) {
  localStorage.setItem('sandbox-test-cases', JSON.stringify(cases));
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  loginError.textContent = '';

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;

  if (email === 'locked@example.com') {
    loginError.textContent = 'Account locked. Please contact support.';
    return;
  }

  if (email !== credentials.email || password !== credentials.password) {
    loginError.textContent = 'Invalid credentials. Please try again.';
    return;
  }

  showPanel('dashboard');
  renderCases(getSavedCases());
});

function clearCaseMessages() {
  caseError.textContent = '';
  caseSuccess.textContent = '';
}

testCaseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  clearCaseMessages();
  const title = testCaseForm.title.value.trim();
  const description = testCaseForm.description.value.trim();
  const priority = testCaseForm.priority.value;

  if (!title || !description) {
    caseError.textContent = 'Title and description are required and cannot be empty.';
    return;
  }

  if (title.length > 120) {
    caseError.textContent = 'Title must be 120 characters or fewer.';
    return;
  }

  const cases = getSavedCases();
  cases.push({ title, description, priority });
  saveCases(cases);
  renderCases(cases);
  caseSuccess.textContent = 'Test case saved successfully.';
  testCaseForm.reset();
  testCaseForm.priority.value = 'Medium';
});

showPanel('login');
