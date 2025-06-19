import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
export async function generateReceiptPdf(data: {
    receiptNumber: string;
    buyerName: string;
    buyerEmail: string;
    carModel: string;
    carYear: number;
    price: number;
    taxes: number;
    total: number;
    purchaseDate: Date;
}): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size in points (72ppi)
    const { height } = page.getSize();
    
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Header
    page.drawText("King David Auto Receipt", {
        x: 50,
        y: height - 70,
        size: 20,
        font: boldFont,
        color: rgb(0, 0, 0),
    });

    let yPosition = height - 120;

    // Receipt info
    page.drawText(`Receipt Number: ${data.receiptNumber}`, { x: 50, y: yPosition, size: 12, font });
    yPosition -= 20;
    page.drawText(`Purchase Date: ${data.purchaseDate.toLocaleDateString()}`, { x: 50, y: yPosition, size: 12, font });
    yPosition -= 30;

    // Buyer info
    page.drawText(`Buyer Name: ${data.buyerName}`, { x: 50, y: yPosition, size: 12, font });
    yPosition -= 20;
    page.drawText(`Buyer Email: ${data.buyerEmail}`, { x: 50, y: yPosition, size: 12, font });
    yPosition -= 30;

    // Car info
    page.drawText(`Car Model: ${data.carModel}`, { x: 50, y: yPosition, size: 12, font });
    yPosition -= 20;
    page.drawText(`Year: ${data.carYear}`, { x: 50, y: yPosition, size: 12, font });
    yPosition -= 30;

    // Pricing
    page.drawText(`Price: $${data.price.toFixed(2)}`, { x: 50, y: yPosition, size: 12, font });
    yPosition -= 20;
    page.drawText(`Taxes: $${data.taxes.toFixed(2)}`, { x: 50, y: yPosition, size: 12, font });
    yPosition -= 20;
    page.drawText(`Total: $${data.total.toFixed(2)}`, { 
        x: 50, 
        y: yPosition, 
        size: 14, 
        font: boldFont,
        color: rgb(0, 0, 0),
    });
    yPosition -= 40;

    // Footer
    page.drawText("Thank you for your purchase!", {
        x: 50,
        y: yPosition,
        size: 12,
        font,
        color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
}