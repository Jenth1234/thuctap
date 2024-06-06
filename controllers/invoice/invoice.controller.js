const InvoiceService = require('../../service/invoice/invoice.Service');

class InvoiceController {
    static async buyPackage(req, res) {
        const { organizationId, packageId } = req.body;

        try {
            const result = await InvoiceService.buyPackage(organizationId, packageId);
            res.status(200).json(result);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi mua gói' });
        }
    }
}

module.exports = InvoiceController;
