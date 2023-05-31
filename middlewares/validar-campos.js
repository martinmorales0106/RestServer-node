const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
    // Verificar los resultados de las validaciones
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

module.exports = { validarCampos };
