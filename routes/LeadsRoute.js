const express = require("express");
const router = express.Router();

const {
  getAllLeads,
  CreateLeadController,
  DeleteLeadController,
  UpdateLeadController,
  selectedLeadController,
} = require("../controllers/LeadsControllers");

// ==========================
router.get("/leads", getAllLeads);
router.post("/leads", CreateLeadController);
router.delete("/leads/:id", DeleteLeadController);
router.put("/leads/:id", UpdateLeadController);
router.get("/leads/:id", selectedLeadController);
// =============================
module.exports = router;
