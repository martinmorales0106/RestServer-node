const { Schema, model, models, modelNames } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// para sacar valores del usuario que no quiero mostrar
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuarios } = this.toObject();
  return usuarios;
};

module.exports = model("Usuarios", UsuarioSchema);
