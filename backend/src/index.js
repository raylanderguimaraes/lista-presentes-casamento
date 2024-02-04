// configurar server
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("./db/db");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 8000;

// FUNCAO PARA CHECAR E VALIDAR TOKEN
const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Acesso negado" });
  }
  try {
    const secret = process.env.SECRET;
    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido" });
  }
};

// CONFIGURACAO PARA ARMAZENAR IMAGEM DO PRESENTE NO SERVIDOR EM PASTA DE UPLOADS
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Verifica se o usuário é um administrador antes de permitir o upload
  if (req.user && req.user.role === "admin") {
    cb(null, true); // Permite o upload
  } else {
    cb(new Error("Acesso não autorizado"), false); // Impede o upload
  }
};

const upload = multer({ storage, fileFilter });

// FUNCAO QUE GERA HASH PARA SALVAR SENHA NO BANCO DE DADOS COMO HASH
const saltRounds = 10;

const generateHash = (password) => {
  return bcrypt.hash(password, saltRounds);
};

app.use(express.json());

// PRESENT SCHEMA
const presentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  src: { type: String, required: true },
  chosenBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    firstName: String,
    lastName: String,
  },
});

// USER SCHEMA
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  chosenPresent: presentSchema,
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

// DEFINIR MODELOS (LISTA PRESENTES E USUÁRIOS)
const User = mongoose.model("User", userSchema);
const Present = mongoose.model("Present", presentSchema);

app.get("/presentes", async (req, res) => {
  try {
    const presents = await Present.find({}, { chosenBy: 0 });
    res.json(presents);
  } catch (error) {
    console.error({ message: "Erro ao listar presentes" });
    res.status(500).json({ error: "Erro ao listar presentes" });
  }
});

app.get("/presentes/escolhidos", checkToken, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(403).json({ message: "Acesso não autorizado" });
    }
    const presents = await Present.find();
    const chosenPresents = presents.filter(
      (present) => present.chosenBy && present.chosenBy.userId !== null
    );

    if (chosenPresents.length > 0) {
      res.json(chosenPresents);
    } else {
      res.status(404).json({ message: "Nenhum item escolhido ainda!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ message: "Nenhum item escolhido ainda!" });
  }
});

//TODO
// 1- Agora ja tenho a rota de login, quero fazer o seguinte agora, quando o usuario logar a depender do role dele:
// caso role == user ele verá uma página com a lista de presentes somente, dando opção para ele escolher um presente/trocar/desmacar.
// caso role == admin ele verá um pequeno formulário com opcao de inserir um novo presente na lista e logo abaixo a lista de presentes, terá acesso também a um botão que o levará para uma aba que mostra somente os presentes escolhidos com suas informacoes de quem os escolheu.

// ROTA PARA ADICIONAR PRESENTE
app.post("/presentes", checkToken, upload.single("file"), async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(403).json({ message: "Acesso não autorizado" });
    }
    const { name, description } = req.body;
    const file = req.file;

    const newPresente = new Present({
      name,
      description,
      src: file.path,
    });
    await newPresente.save();
    res.status(201).json({ message: "Presente adicionado com sucesso!" });
  } catch (error) {
    console.error("Erro ao tentar salvar novo presente", error);
    res.status(500).json(error.message, "Erro ao adicionar novo presente");
  }
});

// ROTA PARA ESCOLHER PRESENTE
app.patch("/presentes/escolher/:id", checkToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const firstName = req.user.firstName;
    const lastName = req.user.lastName;
    const presentId = req.params.id;

    // Remove a escolha anterior, caso exista
    await Present.findOneAndUpdate(
      { "chosenBy.userId": userId },
      { $unset: { chosenBy: "" } }
    );

    // Verifica se o presente já foi escolhido por outra pessoa
    const existingPresent = await Present.findById(presentId);
    if (existingPresent && existingPresent.chosenBy.userId) {
      return res
        .status(400)
        .json({ message: "Este presente já foi escolhido" });
    }

    // Escolhe o novo presente
    const chosenPresent = await Present.findByIdAndUpdate(
      presentId,
      {
        $set: {
          chosenBy: {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
          },
        },
      },
      { new: true }
    );

    if (!chosenPresent) {
      return res.status(404).json({ message: "Presente não encontrado" });
    }

    res.status(200).json({ message: "Presente escolhido" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// ROTA PARA DESMARCAR PRESENTE
app.patch("/presentes/desmarcar/:id", checkToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Remove a escolha anterior, caso exista
    const result = await Present.findOneAndUpdate(
      { "chosenBy.userId": userId },
      { $unset: { chosenBy: "" } },
      { new: true } // Retorna o documento modificado
    );

    if (!result) {
      return res
        .status(400)
        .json({ message: "Você ainda não escolheu nenhum presente" });
    }

    res.status(200).json({ message: "Escolha desmarcada com sucesso" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// ROTA PARA LISTAR TODOS OS USUÁRIOS
app.get("/usuarios", async (req, res) => {
  try {
    const users = await User.find();
    const sanitizedUsers = users.map((user) => {
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        chosenPresent: user.chosenPresent,
      };
    });
    res.json(sanitizedUsers);
  } catch (error) {
    console.error(error, "Nenhum usuario encontrado ou cadastrado");
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
});

//ROTA PARA ADICIONAR USUÁRIO
app.post("/usuarios", async (req, res) => {
  try {
    const { firstName, lastName, username, password, chosenPresent, role } =
      req.body;

    // Gerar o hash da senha
    const hashedPassword = await generateHash(password);
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      chosenPresent,
      role,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", userId: newUser._id });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// ROTA DE LOGIN DE USUÁRIO
app.post("/usuarios/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const secret = process.env.secret;
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      if (user.role === "admin") {
        return res.status(200).json({
          message: "Usuário logado como admin",
          token,
        });
      } else if (user.role === "user") {
        return res
          .status(200)
          .json({ message: "Usuário logado como convidado", token });
      }
    }
    return res.status(401).json({ message: "Usuário ou senha inválida" });
  } catch (error) {
    console.error("Erro durante o login:", error);
    return res.status(500).json({ error: "Erro ao logar" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
