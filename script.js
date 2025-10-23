const form = document.querySelector('#login-form');
const feedback = document.querySelector('.form-feedback');
const forgotLink = document.querySelector('.forgot-link');

const endpoint = '/api/login';

function setFeedback(message = '', type = 'error') {
    feedback.textContent = message;
    feedback.dataset.state = type;
}

async function submitLogin(event) {
    event.preventDefault();
    setFeedback('');

    const formData = new FormData(form);
    const payload = {
        username: formData.get('username')?.trim(),
        password: formData.get('password') || ''
    };

    if (!payload.username || !payload.password) {
        setFeedback('BITTE ALLE FELDER AUSFÜLLEN.');
        return;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            const message = data?.message || 'ANMELDUNG FEHLGESCHLAGEN.';
            setFeedback(message);
            return;
        }

        setFeedback(data?.message || 'ERFOLGREICH EINGELOGGT.', 'success');
        form.reset();
    } catch (error) {
        console.error('Login-Fehler:', error);
        setFeedback('SERVER NICHT ERREICHBAR.');
    }
}

function handleForgotClick(event) {
    event.preventDefault();
    setFeedback('BITTE EIN TICKET IM SUPPORT ERSTELLEN.');
}

form?.addEventListener('submit', submitLogin);
forgotLink?.addEventListener('click', handleForgotClick);
