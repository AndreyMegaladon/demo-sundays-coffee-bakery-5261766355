document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Form submission
    const form = document.getElementById('universalForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const statusDiv = document.getElementById('formStatus');
            statusDiv.style.color = 'var(--text-color)';
            statusDiv.textContent = 'Wird gesendet...';

            const formData = {
                business_name: 'Sundays Coffee & Bakery',
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                booking_details: document.getElementById('booking_details')?.value || '',
                message: document.getElementById('message')?.value || ''
            };

            try {
                const response = await fetch('https://clickform.app.n8n.cloud/webhook/universal-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    statusDiv.style.color = '#2e7d32';
                    statusDiv.textContent = 'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet.';
                    form.reset();
                } else {
                    throw new Error('Netzwerkfehler');
                }
            } catch (error) {
                statusDiv.style.color = '#c62828';
                statusDiv.textContent = 'Fehler beim Senden. Bitte versuchen Sie es telefonisch.';
            }
        });
    }
});