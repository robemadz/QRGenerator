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
  let pattern = url.pattern;
  if (pattern || urlValue === '') {
    let regex = new RegExp(pattern);
    if (!regex.exec(urlValue)) {
      return;
    } else {
      console.log(urlValue);
      showSpinner();

      setTimeout(() => {
        hideSpinner();

        generateQrCode(urlValue, sizeValue);
        setTimeout(() => {
          const saveUrl = qrCode.querySelector('img').src;
          addDownloadBtn(saveUrl);
        }, 50);

        form.reset();
      }, 1400);
    }
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
  const saveBtn = document.getElementById('saveQrLink');
  qrCode.innerHTML = '';
  if (saveBtn) {
    saveBtn.remove();
  }
};

const addDownloadBtn = (saveUrl) => {
  const downloadLink = document.createElement('a');
  downloadLink.id = 'saveQrLink';
  downloadLink.classList =
    'bg-lime-500 hover:bg-lime-400 text-white font-bold py-2 px-4 rounded-md w-1/2 mx-auto mt-2';
  downloadLink.href = saveUrl;
  downloadLink.download = 'qrCode';
  downloadLink.innerHTML = 'Descarga tu código QR';
  document.getElementById('generated').appendChild(downloadLink);
};

const showSpinner = () => {
  spinner.classList.remove('hidden');
};

const hideSpinner = () => {
  spinner.classList.add('hidden');
};

document.addEventListener('keyup', (e) => {
  if (e.target.matches('#qrForm [required]')) {
    let input = e.target;
    let pattern = input.pattern;

    if (pattern || input.value === '') {
      let regex = new RegExp(pattern);
      return !regex.exec(input.value)
        ? errorMsg.classList.remove('invisible')
        : errorMsg.classList.add('invisible');
    }
  }
});

form.addEventListener('submit', onSubmit);
