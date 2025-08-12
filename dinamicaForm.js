const button = document.getElementById('submit_button');
const form = document.getElementById('contact_form');
const errorMessages = document.querySelectorAll('.error_message');
const inputs = document.querySelectorAll('input');
const query_type_options = document.querySelectorAll('.query_type_options');
const radioButtons = document.querySelectorAll('input[name="query_type"]'); // radios por nombre
const spanErrorRadio = document.getElementsByClassName('error_message')[3]; // Asumiendo que el tercer mensaje es el de error de radio
const consent = document.getElementById('consent');
const message = document.getElementById('message');
const successMessage = document.querySelector('.success_message');

// Listener para que clic en el div seleccione el radio correspondiente (se agrega solo 1 vez)
query_type_options.forEach(div => {
    div.addEventListener('click', (event) => {
        // Si no se hizo click directamente en input, marcamos el radio
        if (event.target.tagName.toLowerCase() !== 'input') {
            const radio = div.querySelector('input[type="radio"]');
            radio.checked = true;
            radio.dispatchEvent(new Event('change')); // útil para validación en tiempo real si la implementas
        }
    });
});

consent.addEventListener('click', () => {
    if (consent.checked) {
        consent.dispatchEvent(new Event('change')); // útil para validación en tiempo real si la implementas
    }
    });

const resetForm = () => {
    inputs.forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    message.value = '';
};

button.addEventListener('click', function(event) {
    event.preventDefault();

    let validate = true;

    // Ocultamos todos los mensajes de error al inicio
    errorMessages.forEach(message => {
        message.style.display = 'none';
    });

    // Validar que al menos un radio esté seleccionado
    const radioChecked = Array.from(radioButtons).some(radio => radio.checked);
    if (!radioChecked) {
        validate = false;
        spanErrorRadio.style.display = 'block';
    }

    // Validar inputs de texto (excepto radios)
    inputs.forEach((input, index) => {
        if (input.type !== 'radio' && input.value.trim() === '') {
            validate = false;
            errorMessages[index].style.display = 'block';
        }
    });

    // Validar message textarea
    if (message.value.trim() === '') {
        validate = false;
        errorMessages[4].style.display = 'block';
    }

    // Validar checkbox de consentimiento
    if (!consent.checked) {
        validate = false;
        errorMessages[5].style.display = 'block';
    }

    if (validate) {
        successMessage.classList.add('show');
        successMessage.style.opacity = '1'; // Mostramos el mensaje de éxito
        setTimeout(() => {
            successMessage.classList.remove('show');
            successMessage.style.opacity = '0'; // Ocultamos después de 3 segundos
        }, 3000); // Ocultar después de 3 segundos
        resetForm(); // Reseteamos el formulario
    }
});
