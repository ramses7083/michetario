function getData(barcode) {
  const URL = `http://192.168.1.75:5000/api/organizations/1/inventory.json?ean13_barcode=${barcode}`
  return fetch(URL)
    .then(response => response.json())
    .then(data = data => {
      return {
        articulo: data.name,
        sn: data.serial_number,
        descripcion: data.notes,
        responsable: data.user.email,
      }
    })
}

export { getData }
