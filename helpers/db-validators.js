const Role = require("../models/role");
const Usuarios = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe`);
  }
};

const emailExiste = async (correo = "") => {
    // verificar si el correo existe
  const usuarioExistente = await Usuarios.findOne({ correo });
  if (usuarioExistente) {
    throw new Error(`El correo: ${correo} ya existe`);
  }
  
};

const existeUsuarioPorId = async (id) => {
  // verificar si el correo existe
const ExisteUsuarioId = await Usuarios.findById( id );
if (!ExisteUsuarioId) {
  throw new Error(`El Id: ${id} no existe`);
}

};

module.exports = { esRoleValido, emailExiste, existeUsuarioPorId };
