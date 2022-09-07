const form = document.getElementById('qrForm');
const qrCode = document.getElementById('qrCode');
const url = document.getElementById('url');
const errorMsg = document.getElementById('errorMsg');
const spinner = document.getElementById('spinner');
const pattern =
  /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

const onSubmit = (e) => {
  e.preventDefault();

  //Clean the last QR code and download button associated
  cleanUI();

  //Bring values of the inputs
  const urlValue = document.getElementById('url').value;
  const sizeValue = document.getElementById('size').value;

  //Validation at submit
  if (pattern || urlValue === '') {
    let regex = new RegExp(pattern);
    if (!regex.exec(urlValue)) {
      return showErrorMsg('Introduce una URL válida');
    } else {
      showSpinner();

      //After 1.4sec, hideSpinner, generate QR and another setTimout nested to add download btn that needs the QR src attribute
      setTimeout(() => {
        hideSpinner();

        generateQrCode(urlValue, sizeValue);
        setTimeout(() => {
          const saveUrl = qrCode.querySelector('img').src;
          addDownloadBtn(saveUrl);
        }, 50);

        //Reset form for UX purposes
        form.reset();
      }, 1400);
    }
  }
};

//Generate QR function
const generateQrCode = (urlValue, sizeValue) => {
  const qrCode = new QRCode('qrCode', {
    text: urlValue,
    width: sizeValue,
    height: sizeValue,
  });
};

//Clean user interface function
const cleanUI = () => {
  const saveBtn = document.getElementById('saveQrLink');
  qrCode.innerHTML = '';
  if (saveBtn) {
    saveBtn.remove();
  }
  url.classList.remove('border-green-500');
};

//generate download btn function with JS
const addDownloadBtn = (saveUrl) => {
  const downloadLink = document.createElement('a');
  downloadLink.id = 'saveQrLink';
  downloadLink.classList =
    'bg-green-600 text-white font-bold py-2 px-4 rounded-md w-full md:w-1/2 mx-auto mt-8 hover:shadow-md hover:bg-green-500 hover:-translate-y-1 transition';
  downloadLink.href = saveUrl;
  downloadLink.download = 'qrCode';
  downloadLink.innerHTML = 'Descarga tu código QR';
  document.getElementById('generated').appendChild(downloadLink);
};

//Function to show spinner
const showSpinner = () => {
  spinner.classList.remove('hidden');
};

//Function to hide spinner
const hideSpinner = () => {
  spinner.classList.add('hidden');
};

//Function for errorMsg
const showErrorMsg = (msg) => {
  errorMsg.innerText = `${msg}`;
  errorMsg.classList.remove('invisible');
};

//Hide errorMsg
const hideErrorMsg = () => {
  errorMsg.classList.add('invisible');
};

//Real time validation using custom pattern with regEx
document.addEventListener('keyup', (e) => {
  if (e.target.matches('#qrForm [required]')) {
    let input = e.target;

    if (input.value === '') {
      showErrorMsg('Introduce una URl válida');
      url.classList.remove('border-green-500');
    } else if (pattern) {
      let regex = new RegExp(pattern);

      if (!regex.exec(input.value)) {
        showErrorMsg('El formato es incorrecto');
        url.classList.remove('border-green-500');
      } else {
        hideErrorMsg();
        url.classList.add('border-green-500');
      }
    }
  }
});

//submit listener
form.addEventListener('submit', onSubmit);
