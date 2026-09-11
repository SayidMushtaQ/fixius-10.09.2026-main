const { jsPDF } = require("jspdf");
const fs = require("fs");
const { format } = require("date-fns");

export default function generatePDFPayReceipt({ client, subscription }) {
	const pageWidth = 210; // Width in mm (A4 size)
	const pageHeight = 260; // Height in mm (A4 size)
	const marginTop = 10; // Top margin in mm
	const doc = new jsPDF({
		orientation: "portrait",
		unit: "mm",
		format: [pageWidth, pageHeight],
	});

	// Title and company details
	doc.setFontSize(18);
	doc.text("Payment Receipt", 110, marginTop + 10, null, null, "center");
	doc.setFontSize(14);
	doc.text("Company Name", 20, marginTop + 20);
	doc.setFontSize(11);
	doc.text("Owner Name", 20, marginTop + 27);
	doc.text("Company Address", 20, marginTop + 34);
	doc.text("City, State, ZIP", 20, marginTop + 41);
	doc.text("Country", 20, marginTop + 48);

	// Client details
	doc.setFontSize(12);
	doc.text("Bill To:", 20, marginTop + 60);
	doc.setFontSize(11);
	doc.text(client?.name, 20, marginTop + 67);
	doc.text(client?.streetAddress, 20, marginTop + 74);
	doc.text(
		`${client?.address?.Admin_Name2}, ${client?.address?.Postal_Code}`,
		20,
		marginTop + 81
	);
	doc.text("France", 20, marginTop + 88);

	// Payment details
	doc.setFontSize(11);
	const rightX = 190;
	const gap = 10; // Adjust this value for desired spacing

	const paymentMethod = subscription?.payment_details?.payment_method; // Get payment method

	const paymentMethodWidth = doc.getTextWidth(paymentMethod); // Calculate width (only if method exists)
	doc.text(
		"PaymentId: ",
		rightX - doc.getTextWidth(subscription?.paymentId),
		marginTop + 60,
		null,
		null,
		"right"
	);
	doc.text(
		subscription?.paymentId,
		rightX,
		marginTop + 60,
		null,
		null,
		"right"
	);
	doc.text(
		"Method: ",
		rightX - paymentMethodWidth,
		marginTop + 67,
		null,
		null,
		"right"
	);
	doc.text(paymentMethod, rightX, marginTop + 67, null, null, "right");

	doc.text(
		"Date: ",
		rightX - doc.getTextWidth(`${subscription?.createdAt ? format(new Date(subscription.createdAt), "MM/dd/yyyy") : ""}`),
		marginTop + 74,
		null,
		null,
		"right"
	);
	doc.text(`${subscription?.createdAt ? format(new Date(subscription.createdAt), "MM/dd/yyyy") : ""}`, rightX, marginTop + 74, null, null, "right");

	// Table headers
	doc.setFillColor(45, 55, 72);
	doc.setTextColor(255, 255, 255);
	doc.rect(20, marginTop + 100, 170, 10, "F");
	doc.text("Item Description", 25, marginTop + 106);
	doc.text("Qty", 110, marginTop + 106);
	doc.text("Rate", 140, marginTop + 106);
	doc.text("Amount", 170, marginTop + 106);

	// Table content
	doc.setTextColor(0, 0, 0);
	doc.setFillColor(229, 231, 235);
	doc.rect(20, marginTop + 110, 170, 10, "F");
	doc.text(subscription?.plan?.description, 25, marginTop + 116);
	doc.text("1", 110, marginTop + 116);
	doc.text(`$${String(subscription?.plan?.price)}`, 140, marginTop + 116);
	doc.text(`$${String(subscription?.plan?.price)}`, 170, marginTop + 116);

	// Sub Totals
	const padding = 8; // Adjust the padding value as needed
	const totalWidth = doc.getTextWidth(`$${String(subscription?.plan?.price)}`) + padding;
	const subTotalX = 195 - totalWidth - gap - doc.getTextWidth("Sub Total");
	doc.text("Sub Total", subTotalX, marginTop + 127, null, null, "right");
	doc.text(
		`$${String(subscription?.plan?.price)}`,
		rightX - padding,
		marginTop + 127,
		null,
		null,
		"right"
	);

	// Total
	// Rounded rectangle with radius 3
	const totalWidthAmount =
		doc.getTextWidth(`$${String(subscription?.plan?.price)}`) + padding;
	const totalX = rightX - totalWidthAmount - gap - doc.getTextWidth("TOTAL");
	const totalY = marginTop + 136; // Adjust the y-coordinate to decrease the gap
	doc.setFillColor(203, 213, 224);
	doc.roundedRect(130, marginTop + 130, 60, 10, 3, 3, "F");

	doc.text("TOTAL", totalX, totalY, null, null, "right");
	doc.text(
		`$${String(subscription?.plan?.price)}`,
		rightX - padding,
		totalY,
		null,
		null,
		"right"
	);

	// Notes
	doc.setFontSize(12);
	doc.text("Notes", 20, marginTop + 200);
	doc.setFontSize(11);
	doc.text("It was great doing business with you", 20, marginTop + 210);

	// Save PDF to a file
	const pdfBuffer = doc.output("arraybuffer");
	return pdfBuffer;
}
