const notifications = document.querySelector(".notifications"),
buttons = document.querySelectorAll(".buttons .btn");


const toastDetails = {
  timer: 20000,
  success: {
    icon: "iconos/icons8-comprobado.svg",
    text: "Success: Se realizó el proceso correctamente.",
  },
  error: {
    icon: "iconos/icons8-cancelar.svg",
    text: "Error: No se logró realizar el proceso.",
  },
  warning: {
    icon: "fa-triangle-exclamation",
    text: "Warning: This is a warning toast.",
  },
  info: {
    icon: "fa-circle-info",
    text: "Info: This is a information toast.",
  }
} 

const removeToast = (toast) => {
  toast.classList.add("hide");

  //===== Clearing the timeout for the toast
  if (toast.timeoutId) clearTimeout(toast.timeoutId);

  //===== Removing the toast after 500ms
  setTimeout(() => toast.remove(), 0);
}

const createToast = (id) => {

  //===== Getting the icon and text for the toast based on the id passed
  const { icon, text } = toastDetails[id];

  //===== Creating a new 'li' element for the toast
  const toast = document.createElement("li"); 

  //===== Seeting the Glasses for the toast
  toast.className = `toast ${id}`;
  
  //===== Setting the inner HTML for the toast
  toast.innerHTML =
                `<div class="column">
                <img class="fa-solid" src= "images/${icon}"></img>
                <span>${text}</span>
                </div>
                <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
  
  //===== Append the toast to the notifications ul
  notifications.appendChild(toast);

  //===== Seeting a timeout to remove the toast after the specified duration
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);

}


//===== Addinn a click event listener to each button to create a toast when clicked
buttons.forEach(btn => {
  btn.addEventListener("click", () => createToast(btn.id));
});





const btn = document.getElementById('button');

document.getElementById('m-form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Suscribiendo...';
  
   const serviceID = 'default_service';
   const templateID = 'template_zi56dq8';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Suscribirme';
      createToast("success");
    }, (err) => {
      btn.value = 'Suscribirme';      
      createToast("error");
    });
});




document.getElementById('contactForm')
 .addEventListener('submit', function(event) {
   event.preventDefault();
   const btn1 = document.getElementById('buttonFormularioCorreo');
   btn1.textContent = 'Enviando...';
   $('.submit-loader').slideDown("slow");

   const serviceID = 'default_service';
   const templateID = 'template_3bw1sh5';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn1.textContent = 'Enviar';
      $('.submit-loader').slideUp("slow"); 
      createToast("success");
    }, (err) => {
      btn1.textContent = 'Enviar';
      createToast("error");
      $('.submit-loader').slideUp("slow"); 
     
   
    });
});


