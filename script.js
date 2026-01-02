// --- 1. Lógica del Modal de Privacidad ---
const modal = document.getElementById('privacy-modal');

[cite_start]function openModal() { [cite: 91]
    modal.style.display = 'flex';
[cite_start]} [cite: 92]

function closeModal() {
    modal.style.display = 'none';
[cite_start]} [cite: 93]

// Cerrar modal si hacen clic afuera del contenido
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    [cite_start]} [cite: 94]
}

// --- 2. Lógica para la Vista Previa de Imagen ---
const fileInput = document.querySelector('.file-input');
[cite_start]const imgPreview = document.getElementById('img-preview'); [cite: 95]
const uploadIcon = document.getElementById('upload-icon');
const fileFeedback = document.getElementById('file-feedback');

[cite_start]fileInput.addEventListener('change', function() { [cite: 96]
    const file = this.files[0];

    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert("El archivo es demasiado grande (Máx 5MB).");
            [cite_start]this.value = ""; [cite: 97]
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            [cite_start]imgPreview.src = e.target.result; [cite: 98]
            imgPreview.style.display = "block"; 
            uploadIcon.style.opacity = "0"; 
        }
        reader.readAsDataURL(file);

        fileFeedback.style.display = 'block';
        [cite_start]fileFeedback.textContent = "Listo: " + file.name; [cite: 99]
    } else {
        imgPreview.style.display = "none";
        uploadIcon.style.opacity = "1";
        fileFeedback.style.display = 'none';
    }
[cite_start]}); [cite: 100]

// --- 3. Manejo del envío (FormSubmit AJAX) ---
const form = document.getElementById('verification-form');
[cite_start]const submitBtn = document.getElementById('submit-btn'); [cite: 101]

form.addEventListener('submit', function(e) {
    e.preventDefault();

    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    const formData = new FormData(form);

    // Usando el correo especificado
    [cite_start]fetch("https://formsubmit.co/ajax/verificacionsloetgames@gmail.com", { [cite: 102]
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        [cite_start]form.style.display = 'none'; [cite: 103]
        document.getElementById('success-screen').style.display = 'block';
        window.scrollTo(0,0);
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error al conectar. Intenta nuevamente.");
        [cite_start]submitBtn.textContent = "Enviar"; [cite: 104]
        submitBtn.disabled = false;
        [cite_start]submitBtn.style.opacity = "1"; [cite: 105]
    });
});
