const Post = require('../models/Post');

// GET /posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao recuperar postagens', error });
  }
};

// GET /posts/:id
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Postagem não encontrada' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao recuperar postagem', error });
  }
};

// POST /posts
exports.createPost = async (req, res) => {
  const { title, content, category, author } = req.body;

  if (!title || !content || !category || !author) {
    return res.status(400).json({ message: 'Campos obrigatórios não fornecidos' });
  }

  try {
    const newPost = await Post.create({ title, content, category, author });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar postagem', error });
  }
};

// PUT /posts/:id
exports.updatePost = async (req, res) => {
  const { title, content, category, author } = req.body;

  if (!title || !content || !category || !author) {
    return res.status(400).json({ message: 'Campos obrigatórios não fornecidos' });
  }

  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Postagem não encontrada' });
    }

    post.title = title;
    post.content = content;
    post.category = category;
    post.author = author;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar postagem', error });
  }
};

// DELETE /posts/:id
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Postagem não encontrada' });
    }
    await post.destroy();
    res.status(200).json({ message: 'Postagem excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir postagem', error });
  }
};
