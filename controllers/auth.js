const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    // Si el usuario esta activo en mi base de datos

    if (!usuario.estado) {
      return res.status(404).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(404).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el json web tokens jwt
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error, hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
