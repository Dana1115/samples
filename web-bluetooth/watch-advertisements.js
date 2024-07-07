function onWatchAdvertisementsButtonClick() {
  log('Requesting any Bluetooth device...');
  navigator.bluetooth.requestDevice({
// filters: [...] <- Prefer filters to save energy & show relevant devices.
    acceptAllDevices: true
  })
  .then(device => {
    log('> Requested ' + device.name);

    device.addEventListener('advertisementreceived', (event) => {
      log('  Device ID: ' + event.device.id);
       event.manufacturerData.forEach((valueDataView, key) => {
      logDataView('Manufacturer', key, valueDataView);
      });
      });

    log('Watching advertisements from "' + device.name + '"...');
    return device.watchAdvertisements();  
  })
  .catch(error => {
    log('Argh! ' + error);
  });
}

/* Utils */

const logDataView = (labelOfDataSource, key, valueDataView) => {
  const hexString = [...new Uint8Array(valueDataView.buffer)].map(b => {
    return b.toString(16).padStart(2, '0');
  }).join(' ');
  const textDecoder = new TextDecoder('ascii');
  const asciiString = textDecoder.decode(valueDataView.buffer);
  log(`  ${labelOfDataSource} Data: ` + key +
      '\n    (Hex) ' + hexString +
      '\n    (ASCII) ' + asciiString);
};
