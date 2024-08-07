const packageService = require("../../service/package/package.service");
const PackageValidate = require("../../models/package/validate/index");

class PACKAGE {
  createPackage = async (req, res) => {
    const payload = req.body;
    const { error, value } = PackageValidate.packageCreate.validate(payload, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { LEVEL, DISCOUNT } = value;

    try {
      const existingLevel = await packageService.checkLevelExists(LEVEL);
      if (existingLevel) {
        return res
          .status(400)
          .json({ success: false, message: "Level already exists" });
      }

      const result = await packageService.createPackage(payload);
      return res.status(201).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the package",
        error: error.message,
      });
    }
  };

  // updatePackage = async (req, res) => {
  //   const payload = req.body;
  //   const { error, value } = PackageValidate.updatePackage.validate(payload);

  //   if (error) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Invalid data",
  //       errors: error.details.map((detail) => detail.message),
  //     });
  //   }

  //   const { LEVEL, DISCOUNT } = value;

  //   try {
  //     const existingLevel = await packageService.checkLevelExists(LEVEL);
  //     if (existingLevel) {
  //       return res.status(400).json({ success: false, message: "Level already exists" });
  //     }

  //     const level = req.params.level;
  //     const updatedPackage = await packageService.updatePackage(level, payload);
  //     return res.status(200).json({ success: true, data: updatedPackage });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: "An error occurred while updating the package",
  //       error: error.message,
  //     });
  //   }
  // };

  async updatePackage(req, res) {
    const payload = req.body;
    delete payload.__v;
    const { error, value } = PackageValidate.updatePackage.validate(payload);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const packageId = req.params.id; // Lấy id từ tham số đường dẫn

    try {
      const updatedPackage = await packageService.updatePackage(
        packageId,
        payload
      );

      if (!updatedPackage) {
        return res
          .status(404)
          .json({ success: false, message: "Package not found" });
      }

      return res.status(200).json({ success: true, data: updatedPackage });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the package",
        error: error.message,
      });
    }
  }

  async deletePackage (req, res) {
    try {
        const packageId = req.params.id;
        const deletedPackage = await packageService.deletePackage(packageId);

        if (!deletedPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Package deleted successfully",
        });
    } catch (error) {
        if (error.message === "Package does not exist") {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }
        
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the package",
            error: error.message,
        });
    }
};


  getPackage = async (req, res) => {
    try {
      const packages = await packageService.getPackage();
      return res.status(200).json({ success: true, data: packages });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while retrieving packages",
        error: error.message,
      });
    }
  };

  DiscountedCost(cost, discount) {
    const discountAmount = cost * (discount / 100);
    return cost - discountAmount;
  }
}

module.exports = new PACKAGE();
