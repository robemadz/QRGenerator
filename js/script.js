const form = document.getElementById('qrForm');
const qrCode = document.getElementById('qrCode');
const url = document.getElementById('url');
const errorMsg = document.getElementById('errorMsg');
const spinner = document.getElementById('spinner');

const onSubmit = (e) => {
  e.preventDefault();

  //Clean the last QR code
  cleanUI();

  //Bring values of the inputs
  const urlValue = document.getElementById('url').value;
  const sizeValue = document.getElementById('size').value;

  if (urlValue === '') {
    errorMsg.classList.remove('invisible');
    setTimeout(() => {
      errorMsg.classList.add('invisible');
    }, 1400);
    return;
  } else {
    url.classList.add('border-green-700');
    showSpinner();

    setTimeout(() => {
      hideSpinner();

      generateQrCode(urlValue, sizeValue);
      form.reset();
      url.classList.remove('border-green-700');
    }, 1400);
  }
};

const generateQrCode = (urlValue, sizeValue) => {
  const qrCode = new QRCode('qrCode', {
    text: urlValue,
    width: sizeValue,
    height: sizeValue,
  });
};

const cleanUI = () => {
  qrCode.innerHTML = '';
};

const showSpinner = () => {
  spinner.classList.remove('hidden');
};

const hideSpinner = () => {
  spinner.classList.add('hidden');
};

form.addEventListener('submit', onSubmit);
