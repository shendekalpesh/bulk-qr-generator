const QRCode = require('qrcode');



const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
const qr_codes = [];

app.get("/api", (req, res) => {
    const {batch_number,product_id,products_manufactured,product} = req.query
    const INT_product_id = parseInt(product_id);
    const INT_products_manufactured = parseInt(products_manufactured);
    for (let index = INT_product_id; index <= INT_products_manufactured+INT_product_id; index++) {
        const websiteUrl = `https://godinc.in/sample_product_page.php?product=${product}&batch_number=${batch_number}&product_id=${index}`

        // file included in resources
        
    
    QRCode.toDataURL(websiteUrl, (err, qr) => {
        if (err) {
            console.error('Error generating QR code:', err);
        } else {
            // console.log('QR code URL:', qr);
            qr_codes.push({url:websiteUrl,qr:qr})
        }
    });
    }
    res.json(qr_codes);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});