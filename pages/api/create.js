const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);


export default async function handler(req, res) {
  const {
    query: { name, price, time }
  } = req;

  try {
    if (!name || !price || !time) {
      throw new Error('Missing params');
    };

    const newRow = {
      name: name,
      price: price,
      time: time
    };

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n')
    });

    await doc.loadInfo();
    const sheet = doc.sheetsById[0];
    await sheet.addRow(newRow);

    res.status(200).json({ message: 'saved' });
  } catch (error) {
    res.status(500).json(error);
  }
}
