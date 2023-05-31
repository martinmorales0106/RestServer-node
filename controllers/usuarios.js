const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { validationResult } = require("express-validator");

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = "No name", apikey, page = "1", limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // TODO para validar conta base de datos
  if (password) {
    // encriptar la contraseña
    const salt = await bcryptjs.genSalt(10);
    resto.password = await bcryptjs.hash(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,
  });
};
const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // encriptar la contraseña
  const salt = await bcryptjs.genSalt(10);
  usuario.password = await bcryptjs.hash(password, salt);

  // Guardar en BD
  await usuario.save();

  res.json({
    usuario,
  });
};
const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  // físicamente lo borramos
  //const usuario = await Usuario.findByIdAndDelete(id); // no es recomendado

  // cambiar el estado del usuario
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
};
const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
};
