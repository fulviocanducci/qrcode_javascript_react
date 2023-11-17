//https://www.gerarpix.com.br/
//https://github.com/fbbergamo/gerador-pix/blob/main/index.js

import React, { useEffect, useState } from "react";
import { BrCode } from "./utils";
import QRCode from "qrcode";

const QR_CODE_SIZE = 400;

async function createAndGetPixAsync(key, amount, name, reference, key_type, city) {
  try {
    const brCode = new BrCode(key, amount, name, reference, key_type, city);
    const code = brCode.generate_qrcp();
    const qrcode = await QRCode.toDataURL(code, { width: QR_CODE_SIZE, height: QR_CODE_SIZE });
    return {
      qrcode_base64: qrcode,
      code: code,
      key_type: brCode.key_type,
      key: brCode.key,
      amount: brCode.amount,
      name: brCode.name,
      city: brCode.city,
      reference: brCode.reference,
      formated_amount: brCode.formated_amount(),
    };
  } catch (error) {
    console.log(error);
  }
}

export default function Pix() {
  const [pix, setPix] = useState(null);

  useEffect(() => {
    createAndGetPixAsync("jose", "1.000,00", "Fúlvio C. C. Dias", "ref003", "Email", "Pirapozinho").then((result) => {
      setPix(result);
      console.log(result);
    });
  }, []);

  return (
    <div>
      {pix && (
        <React.Fragment>
          <div>{pix.name}</div>
          <div>
            <img src={pix.qrcode_base64} alt="Pix" />
          </div>
          <div>{pix.code}</div>
        </React.Fragment>
      )}
    </div>
  );
}
